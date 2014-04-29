---
layout: blog
title:  "Turbolinks with Jekyll"
---

Despite the fact that many people curse [Turbolinks](https://github.com/rails/turbolinks)
for messing up their Javascript, I think it is a great way to improve the perceived rendering
speed of a web page. When a page contains (almost) no Javascript, the setup is really simple.

Turbolinks was built for Rails, but I was wondering whether it would be possible to use it
with [Jekyll](http://jekyllrb.com), which powers this very site. Good news: It turned out to
be incredibly simple! Here are the steps. Of course, you may need to adjust the location of
your `javascripts` folder.

### 1. Get the latest turbolinks.js

{% highlight bash %}
curl -O https://raw.githubusercontent.com/rails/turbolinks/master/lib/assets/javascripts/turbolinks.js.coffee
coffee -c turbolinks.js
mv turbolinks.js.js javascript/turbolinks.js
{% endhighlight %}

### 2. Embed the js file in your layout

Just add the following line to your page layout

{% highlight html %}
<script src="/javascript/turbolinks.js" type="text/javascript" charset="utf-8"></script>
{% endhighlight %}

### 3. Done!

Fire up jekyll locally with `jekyll serve` and watch the awesome! If you're having problems,
a more detailed [blog post by Carlos Becker](http://carlosbecker.com/posts/turbolinks/) has
further information.
