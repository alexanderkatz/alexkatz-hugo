+++
title = "Creating a Wordpress Child Theme"
date = "2014-05-31"
draft = true

+++

There are a lot of great WordPress themes out there, but chances are you will want to change some aspect of your theme’s design.  The easiest way to change the appearance of a WP theme is to use the available customization options found in the WP Appearance Menu.

<img class="full-img" src="/img/creating-a-wordpress-child-theme/customize-menu.png" />


Each theme supports different customization options.  If you want a lot of control over you theme’s design, but don’t want to touch the code, it is important to find a theme that is highly modifiable in this manner.

Using plugins is another code-free option for customizing your site. Plugins like Footer Text can even add a footer to a site that doesn’t otherwise have one.


My favorite way to customize a WP theme and the topic of this post is to create a child theme.

A child theme is a theme that inherits its look and functionality from another theme, its parent.  At the most basic level a child theme consists of a style.css file.  The file is like any other css file, except that it states which theme is its parent and provides a file path to the location of its parent’s stylesheet.

Here is the beginning of my style.css for the child theme I have built for this site

{{< highlight css >}}
/*
 Theme Name:     Tonal Child
 Theme URI:    
 Description:    Tonal Child Theme
 Author:         Alex Katz
 Author URI:     http://alexkatz.me
 Template:       tonal
 Version:        1.0.0
*/

/* =Imports styles from the parent theme
-------------------------------------------------------------- */
@import url('../tonal/style.css');
{{< /highlight >}}

Some of you may be thinking, if the parent theme has a stylesheet, “why can’t I just edit that?” You can, but if you update your theme to a new version, all of your edits will be overwritten. Putting your css rules in a child theme ensures that you do not lose your work when it is time to update your theme and clarifies which aspects of the code you have changed.  The child theme is included after the parent and will override conflicting rules.

Certain themes have a designated space to enter your own css rules. This is a fine option, but I find it easier and more organized to create a child theme.

Theme Name, Template, and the @import url(‘path to parent’s style.css’) are the three required components of the child style sheet. The other lines are optional. Template name is the name of your child theme and Template is the name of the parent theme’s directory.

I usually create a folder entitled [name of parent theme]-child and save my style.css in it.  To actually use your the child theme you can compress it to a zip file and upload it in the WP “Add Theme” section.  To compress a folder on a Mac, right click on the folder in finder and press compress.  If you are using Windows repeat the same steps except press “Send to” then “Compressed (zipped) Folder.”

Child themes are a great way to gain more control over your WP site.  If you know CSS or want to learn, making a child theme is usually the easiest and best way to tweak your site.
