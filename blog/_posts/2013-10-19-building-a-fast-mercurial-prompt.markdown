---
layout: blog
title:  "Building A Fast Mercurial Prompt"
---

I recently switched from ZSH to [FISH](http://fishshell.com) and I took this as an opportunity to clean up [my dotfiles](http://github.com/padde/dotfiles) and fix all the things that should have been fixed a long time ago. A major issue with my old configuration was that the prompt rendered really slowly (~0.5s) after I had added Mercurial information to it. In this post I will outline how I managed to dramatically increase the rendering speed. First of all, let's have a look at a screenshot of the result.

![Screenshot of my prompt](/assets/2013-10-19-screenshot.png)

The prompt to the left is pretty basic and I will not go into more detail on it
here. Instead, I will focus on the right part of the prompt throughout this
post. A right prompt like this is pretty easy to achieve in FISH, you just have
to create a function called `fish_right_prompt`. Below is an early version of what I came up with.

{% highlight bash %}
function fish_right_prompt
  # are we in a hg repo?
  if hg root > /dev/null 2>&1
    set_color black
    printf '['

    # show red dot if there are uncommited changes
    if test (count (hg status)) != 0
      set_color red
      printf '●'
    end

    set_color black
    printf 'hg:'

    # show branch name
    set_color green
    printf '%s' (hg branch)

    set_color black
    printf '@'

    # show 7 digits of commit hash (like git)
    set_color yellow
    printf '%s' (hg parents --template="{node}" | cut -c-7)

    set_color black
    printf ']'
  end

  set_color normal
end
{% endhighlight %}

While this works, it is awfully slow. There are several things here that can be
improved but most definitely the slowest parts are the calls to the `hg` binary.
Here's some measurements from my laptop, while being inside a hg repository.

{% highlight bash %}
$ time hg root
        0.15 real         0.11 user         0.03 sys

$ time hg status
        0.17 real         0.12 user         0.04 sys

$ time hg branch
        0.16 real         0.11 user         0.04 sys

$ time hg parents --template="{node}"
        0.16 real         0.12 user         0.04 sys
{% endhighlight %}


The cost of starting up the Python interpreter is just too high, and we are
doing it four times! Let's see what we can do here. Taking a closer look at
the `.hg` directory in a repository, there are two particularly interesting files – `.hg/dirstate` and `.hg/branch`. Conveniently, all the data we need (except for the information whether there are uncommited changes) can be found inside these
files. `.hg/dirstate` is present from the moment on when you issue the `hg init`
command and contains information about the state of the directory, e.g. what
revision is currently checked out. The hash of the current commit can be retrieved with the following command:

{% highlight bash %}
$ hexdump -n 20 -e '1/1 "%02x"' .hg/dirstate
5f2f1a49e0ecf849f9586cae3b5f74c4fff85397
{% endhighlight %}

However I only wanted the first seven characters of the hash so I dropped the
number of bytes read to four (`-n 4`) and piped that into `cut` to get the first
seven out of the eight resulting characters. The reason that I chose seven
characters is simply because that's the way Git presents you a short hash and I
like to keep things consistent. The improved command looks like this:

{% highlight bash %}
$ hexdump -n 4 -e '1/1 "%02x"' .hg/dirstate | cut -c-7
5f2f1a4

$ time hexdump -n 4 -e '1/1 "%02x"' .hg/dirstate | cut -c-7
      0.00 real         0.00 user         0.00 sys
{% endhighlight %}

It's fast. I don't care how fast exactly it is but it's way faster than the
`hg` binary and definitely much of an improvement. This file will also serve as an indicator whether we currently are in Mercurial repository or not. Checking for its existence in the current directory, however is not sufficient, because we may operate in a subdirectory of the repository root. In order to determine whether we are in a hg repo or not, we have to go up the directory tree using `dirname` until we finally reach a repository or `/`. I've extracted this login into a function of its own:

{% highlight bash %}
function find_hg_root
  set -l dir (pwd)
  set -e HG_ROOT

  while test $dir != "/"
    if test -f $dir'/.hg/dirstate'
      set -g HG_ROOT $dir"/.hg"
      return 0
    end

    set -l dir (dirname $dir)
  end

  return 1
end
{% endhighlight %}

This function sets the global variable `HG_ROOT` if it finds a Mercurial repo.
This global variable can later be used by the other commands. Additionally, it
returns `0` if the current directory is in a repo and `1` if not. Although this
is in shell script, it's still much faster than the Python version inside
Mercurial, because it does not hae to wait for the interpreter to start.
Next up: branch name. The branch name can be extracted out of `.hg/branch` with `cat`:

{% highlight bash %}
$ cat ".hg/branch"
default

$ time cat ".hg/branch"
      0.00 real         0.00 user         0.00 sys
{% endhighlight %}

there's a small catch to this, however. When a repository is newly created with
`hg init`, the file is not yet present. It will only be created after the first run of `hg update`. Therefore, we discard the error message and resort to the normal `hg branch` command if necessary:

{% highlight bash %}
$ rm ".hg/branch"
$ cat ".hg/branch" 2>/dev/null; or hg branch
default
{% endhighlight %}

The last command, `hg status`, is too complex to be replicated as a
shell script, therefore I will keep it. The revised code for my right
prompt now looks like this (Actually it looks a lot different, because my prompt does more stuff like showing the last exit status if there was an error. It also includes a right prompt for Git. If you are interested, you can find the actual code on [my Github page](http://github.com/padde/dotfiles)).


{% highlight bash %}
function fish_right_prompt
  function find_hg_root
    set -l dir (pwd)
    set -e HG_ROOT

    while test $dir != "/"
      if test -f $dir'/.hg/dirstate'
        set -g HG_ROOT $dir"/.hg"
        return 0
      end

      set -l dir (dirname $dir)
    end

    return 1
  end

  if find_hg_root 2>&1
    set_color black
    printf '['

    # show red dot if there are uncommited changes
    if test (count (hg status)) != 0
      set_color red
      printf '●'
    end

    set_color black
    printf 'hg:'

    # show branch name
    set_color green
    printf '%s' (cat "$HG_ROOT/branch" 2>/dev/null; or hg branch)

    set_color black
    printf '@'

    # show 7 digits of commit hash (like git)
    set_color yellow
    printf '%s' (hexdump -n 4 -e '1/1 "%02x"' "$HG_ROOT/dirstate" | cut -c-7)

    set_color black
    printf ']'
  end

  set_color normal
end
{% endhighlight %}

The end result is a prompt that renders a lot faster and feels much
snappier. There's a project called vcprompt that aims to do similar things like
I did above but in C and thus potentially even faster. It is for example
available via Homebrew on OSX. I decided against using the program because it
does not support Mercurial hashes, only revision numbers.
