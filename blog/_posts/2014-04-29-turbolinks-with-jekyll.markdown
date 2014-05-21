---
layout: blog
title:  "Turbolinks with Jekyll"
---

[Turbolinks](https://github.com/rails/turbolinks) is a great way to improve the perceived rendering
speed of a web page. It was built for Rails, but I was wondering whether it would be possible to use it
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

### 3. Fix your Javascript

When you use Javascript on your site, you need to make sure that everything is still working.
A common pattern is to use the `ready` event on `document` to make sure code gets run every
time a page has finished loading like so:

{% highlight javascript %}
$(document).ready(function() {
  // do stuff
});
{% endhighlight %}

This will however only trigger an event on the first page load now, not as subsequent links are
clicked on your site. Luckily, Turbolinks provides an event that you can listen to instead:
`page:load`. In order to get back the same behavior as before, you can extract the code into a
function and add it to both events:

{% highlight javascript %}
var ready = function() {
  // do stuff
}

$(document).ready(ready);
$(document).on('page:load', ready);
{% endhighlight %}

### 4. Done!

Fire up jekyll locally with `jekyll serve` and watch the awesome! If you're having problems,
a more detailed [blog post by Carlos Becker](http://carlosbecker.com/posts/turbolinks/) has
further information.
