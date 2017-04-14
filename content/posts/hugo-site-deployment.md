+++
title = "Hugo Site Deployment"
date = "2017-04-14"
+++

I built my site with Hugo and am hosting in on GitHub Pages. 

My site is in a directory named `alexkatz-hugo`. I run `hugo` on the command line to generate the site into the `public` directory. The public directory is a submodule.

To deploy my site I run a shell script that clears my public folder, generates the site with Hugo, and commits and pushes my changes. 

Before generating the site, my script removes all files and directories from the public folder, except for the .git directory and CNAME file. It is important to clear the public directory because running `hugo` does not remove previously generated files. If you don't clear the public directory you may end up deploying drafts or deleted content.

See the <a href="https://gohugo.io/overview/usage/#a-note-about-deployment" target="_blank">documentation</a> for more details.

Here is my deployment script.

<!--more-->

{{< highlight bash>}}

#!/bin/bash

echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"

# Go To Public folder
cd public

# Remove all files and folders except for CNAME and .git
find . -not -path "./.git/*" -not -name ".git" -not -name "CNAME" -not -name ".*" -print0 | xargs -0 rm -r  --

# Go to site root
cd ..

# Build the project.
hugo -t curlew

# Go To Public folder
cd public


# Add changes to git.
git add -A

# Commit changes.
msg="rebuilding site `date`"
if [ $# -eq 1 ]
   then msg="$1"
fi
git commit -m "$msg"
 
# Push source and build repos.
git push origin master
 
# Come Back
cd ..

{{< highlight >}}

