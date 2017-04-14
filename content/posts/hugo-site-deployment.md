+++
title = "Hugo Site Deployment"
date = "2017-04-14"
+++

I built my site with Hugo and am hosting in on GitHub Pages. 

My Hugo site is contained within a directory named `alexkatz-hugo`. Running `hugo` on the command line generates the static site in the `public` directory. The public directory is a submodule.

To deploy my site I use the following script. 

https://gohugo.io/overview/usage/#a-note-about-deployment

Running hugo does not remove generated files before building. This means that you should delete your public/ directory (or the directory you specified with -d/--destination) before running the hugo command, or you run the risk of the wrong files (e.g. drafts and/or future posts) being left in the generated site.