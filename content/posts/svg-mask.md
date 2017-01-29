+++
date = "2017-01-29"
title = "SVG Mask"
+++

Although this technique is not new, I still wanted to share it.

In the past if I wanted to change the color of an icon on hover I would have changed the background of the element to a differently colored icon. The CSS would have looked something like this.

{{< highlight css >}}
.icon{
    background:('path/to/icon.png');
}
.icon:hover{
    background:('path/to/different-icon.png');
}
{{< /highlight >}}

This doesn't seem too cumbersome, but for each icon you need two files with differently colored icons. To make a change to the color, a new file needs to be created.

The beauty of using the `mask` and `background-color` properties, is that an SVG can be changed to any color. This limits the number of files you have to keep track of, but more importantly grants more flexibility and can lead to more organized code.

To use this technique, set the value of `mask` to the correct file and set the `background-color` as desired. The SVG will act as mask and the `background-color` will only be visible where the icon is. Define a different `background-color` for `:hover` to switch between colors on hover.  

{{< highlight css >}}
.icon{
  background-color:#005397;
  mask: url('http://alexkatz.me/img/logo.svg') no-repeat 50% 50%;
  mask-size: cover;
}
icon:hover{
  background-color:#01FFC7;
  transition:background-color .5s;
}
{{< /highlight >}}

Feel free to experiment with this pen.
<p data-height="300" data-theme-id="5580" data-slug-hash="PWJEjK" data-default-tab="css,result" data-user="katzkode" data-embed-version="2" data-pen-title="SVG Mask" class="codepen">See the Pen <a href="https://codepen.io/katzkode/pen/PWJEjK/">SVG Mask</a> by Alex Katz (<a href="http://codepen.io/katzkode">@katzkode</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
