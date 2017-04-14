#!/bin/bash

echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"

# Build the project.
hugo -t curlew # if using a theme, replace by `hugo -t <yourtheme>`

# Go To Public folder
cd public

# Remove all files and folders except for CNAME and .git
find . -not -path "./.git/*" -not -name ".git" -not -name "CNAME" -not -name ".*" -print0 | xargs -0 rm -r  --

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
