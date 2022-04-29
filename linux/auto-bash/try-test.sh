#!/usr/bin/env bash

# abort on errors
set -e

get_branch=`git symbolic-ref --short -q HEAD`

get_commit=`git log -1 --pretty=tformat:%s`

npm run build

cd dist



# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m "${get_commit}"


git push -f git@git.xxx.io:zd-build.git master:auto-${get_branch}
# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

#LatestTag=$(git describe --tags `git rev-list --tags --max-count=1`)



# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
#git push -f git@git.xxx.io:zd-build.git master:deploy111

#git push -f git@git.xxx.io:zd-build.git release/device-module:deploy111
cd -
