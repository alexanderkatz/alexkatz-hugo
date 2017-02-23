+++
date = "2017-02-22"
title = "Using SVG in an Interface"
description = "SVG isn't just an export option for Illustr, it is a powerful tool that can be leveraged to create more engaging UIs."
+++

Even though I have been working with SVG in Illustrator for years, it wasn't until last week that I began exploring its application in web development. To start my learning I completed a few video tutorials and researched how SVG is manipulated with CSS and JavaScript. 

I found a myriad of beautiful SVG animations and visual experiments, but it was not clear how to leverage SVG to enhance UIs. That was until I overheard two of my coworkers discussing how to implement a radial meter to track memory usage in Bluemix. One of them suggested using strokedash-offset and I immediately jumped into the conversation eager to share my new found knowledge.

I was thrilled because this was the perfect opportunity to use SVG in an interface. 

Using stroke-dasharray and strokedash-offset, we were able to quickly implement a meter for memory usage.

stroke-dasharray - is used to turn the stroke of an SVG element/path into a dashed pattern.

strokedash-offset - specifies the distance into the pattern to start the dash.

By setting stroke-dasharray equal to the length of a shape's perimeter, stroke-dashoffset can be used to control the amount of visible stroke. Animating or transitioning the offset gives the appearance that the shape is being drawn. 

Here is an example of how to use the properties to create a radial meter. 

<p data-height="470" data-theme-id="5580" data-slug-hash="BpXGzK" data-default-tab="result" data-user="katzkode" data-embed-version="2" data-pen-title="Radial Meter" class="codepen">See the Pen <a href="http://codepen.io/katzkode/pen/BpXGzK/">Radial Meter</a> by Alex Katz (<a href="http://codepen.io/katzkode">@katzkode</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script> 

Sources:

[stroke-dasharray](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray)

[stroke-dashoffset](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dashoffset)