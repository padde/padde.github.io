# Vim
by padde

slides: p11y.de/talks


## Not For Everyone
* steep learning curve
* complicated keystrokes
* needs lots of config
* why use it?


## The Good Parts
* few keystrokes
* speed
* good for your hands
* it's everywhere – feel at home


## Concepts
* modal editing
* only few key combos
* movements and commands



# Basic Config
Vim's default config is broken


## Vi ≠ Vim
```
set nocompatible
```


## Must ♥ utf-8
```
set encoding=utf-8
set fileencoding=utf-8
```


## Line Numbers
```
set number
```


## Remap Leader
```
let mapleader = ","
```


## Copy/Paste
```
set clipboard+=unnamed
```


## Soft Tabs
```
set expandtab
set smarttab
set tabstop=4
set shiftwidth=4
set softtabstop=4
```


## Le Wild Menu Appears!
```
set wildmenu wildmode=list:longest,full
```


## Searching
```
set hlsearch
set incsearch
set ignorecase
set smartcase
```


## Mouse
```
set mouse=a
```


## Color
```
syntax on
colorscheme railscasts
```


## Vundle for Plugins
```
set nocompatible
filetype on
filetype off
set runtimepath+=~/.vim/bundle/vundle/
call vundle#rc()
Bundle 'vundle'

Bundle 'github_user/repo'
```



# How To Learn Vim
comfortable confidence


## Arrow Keys
* use them if you like!
* do what works for you
* but start using H J K L
* if you feel hardcore, disable them

<code>
<pre>
noremap &lt;Up&gt; &lt;NOP&gt;
noremap &lt;Down&gt; &lt;NOP&gt;
noremap &lt;Left&gt; &lt;NOP&gt;
noremap &lt;Right&gt; &lt;NOP&gt;
</pre>
</code>


## One Post-It at a Time
* keep a list of new commands
* try to use them when possible
* go back, try better
* add new commands
* remove obsolete commands


## Learn All Single-Letter Commands
http://people.csail.mit.edu/vgod/vim/vim-cheat-sheet-en.pdf


## Help
* learn to use it
* follow links with Ctrl + ]
* Mac: Ctrl + Alt + 6



# Tricks


## Repetition
* prefix with count
  * `5j`
  * `4dd`
  * `10ifoobar`
* repeat last with `.`


## search
* forward `/`
* backward `?`
* star search `*`
* next match `n`
* previous match `N`
* advanced movements `f` `t` `F` `T`


## Jumplist
* backward Ctrl-O
* forward Ctrl-I
* list `:jumps`


## Auto-completion
* next Ctrl-N
* previous Ctrl-P

```
if has("autocmd") && exists("+omnifunc")
  autocmd Filetype *
        \	if &omnifunc == "" |
        \	 setlocal omnifunc=syntaxcomplete#Complete |
        \	endif
endif
```


## Visual Block Mode
* Ctrl-V
* select lines
* then
  * prepend: `I` - type - Esc
  * append: `$A` - type - Esc


## Refine Selections
* o


## Macros
* start recording `qx`
* do something
* stop recording `q`
* replay `@x`


## Create Mappings
* `map x command`
* `nmap`
* `vmap`
* `imap`
* `noremap`



# Plugins FTW
do not reinvent the wheel


## vundle/vundle
plugin management


## scrooloose/nerdtree
file tree explorer


## kien/ctrlp.vim
fuzzy filename search


## mileszs/ack.vim
project search


## tpope/surround.vim
surround (things)


## tpope/commentary.vim
`# comment things`


## scrooloose/syntastic
show compile time errors


## sjl/gundo.vim
visualize undo tree


## mhinz/vim-signify
show added/removed lines in VCS


## nelstrom/vim-visual-star-search
fix star search


## bling/vim-airline
make it fancy



# Gimme Moar!

* use built-in help
* vimtutor
* watch vimcasts.org
* play vimgolf.com
* Learn Vimscript the Hard Way
  * http://learnvimscriptthehardway.stevelosh.com/



# Toolchain

* Tmux
* Ack/Ag
* Autojump
* NeoVim



# Kthxbye
questions?
slides: p11y.de/talks
