+++

date = "2015-08-25T21:54:59-06:00"
title = "Multiple HTML5 Audio Players"
aliases = ["/html5-audio/multiple-html5-audio-players/"]
+++

This is a follow up to my original article, Building a Custom HTML5 Audio Player With Javascript.

A number of people have asked me how to make multiple audio players on one page, so I decided to figure it out. I am posting the code before writing a tutorial so it can be used for your projects.

In brief I created an object called AudioObject for each track and store each object in an array. By storing all the tracks I am able to access each players audio and the components of their interface. I also created a lookup table that maps components like a playbutton or playhead to the array index of the correct AudioObject. The code is well commented, but still needs to be refined and further tested.

<!--more-->

Enjoy and as always if you have any questions just let me know!

<p data-height="553" data-theme-id="5580" data-slug-hash="ZbxYYG" data-default-tab="result" data-user="katzkode" class='codepen'>See the Pen <a href='http://codepen.io/katzkode/pen/ZbxYYG/'>Multiple HTML5 Audio Players</a> by Alex Katz (<a href='http://codepen.io/katzkode'>@katzkode</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
