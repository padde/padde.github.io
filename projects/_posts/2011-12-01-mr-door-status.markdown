---
layout: project
title:  MR Door Status
tags: ruby sinatra javascript design
preview-image: projects/2011-12-01-mr-door-status.png
---

MR Door Status ([mrdoor.paddd.de](http://mrdoor.paddd.de)) is a web app to
check the status of the [twittering door](http://twitter.com/mr_door_status)
in the hackerspace [Maschinenraum (MR)](http://maschinenraum.tk) in Weimar.
The application can be viewed in a browser but is optimized for viewing
on mobile devices. Most of the content is cached on the client side in
order to save bandwidth and speed up the rendering. The complete source
code is available from [the official Github repo](http://github.com/padde/mrdoor).

The site receives its data from an intermediate API called MR Space API, whose
code is also available from a [Github repo](https://github.com/padde/mr-spaceapi).
The API uses Sinatra and Redis to cache requests to Twitter and is much faster
than pulling the data directly from Twitter.

![Screenshot](/assets/projects/2011-12-01-mr-door-status.png)
