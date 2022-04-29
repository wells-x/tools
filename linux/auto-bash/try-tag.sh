#!/usr/bin/env bash

# abort on errors
set -e

get_branch=`git symbolic-ref --short -q HEAD`
get_commit=`git log -1 --pretty=tformat:%s`


npm run build

cd dist

git init
#git checkout -b ${get_branch}
git add -A
git commit -m "auto-${get_commit}"

url="git@git.xxx.io:zd-build.git"

git remote add origin ${url}

git push -f origin master:${get_branch}
git fetch --all --tags

#LatestTag=$(git describe --tags `git rev-list --tags=dev* --max-count=1`)

LatestTag=$(git tag  --list 'dev-*' | tail -n 1)
#LatestTag=dev-1.1.4
echo "LatestTag: $LatestTag";
#LatestTag=$(git tag | grep dev  --max-count=1)
# 标签最后一个数值
Last1=${LatestTag##*.}

End1=${LatestTag%.*}
Last2=${End1##*.}

End2=${End1%.*}
Last3=${End2##*-}

newLast1=${Last1}
newLast2=${Last2}
newLast3=${Last3}
echo "---------$newLast3"


# 最大值
Max=9
if [[ ${Last1} -lt ${Max} ]]
then
    carry1=0
else
    carry1=1
fi

if [[ ${Last2} -lt ${Max} ]]
then
    carry2=0
else
    carry2=1
fi


if [[ ${carry1} -gt 0 ]]; then
    newLast1=0
    if [[ ${carry2} -gt 0 ]]; then
        newLast2=0
        newLast3=`expr ${Last3} + 1`
    else
        newLast2=`expr ${Last2} + 1`
    fi
else
    newLast1=`expr ${Last1} + 1`
fi



newTag="dev-${newLast3}.${newLast2}.${newLast1}"
echo "git tag -a ${newTag} -m 'auto-${get_commit}'"

git tag -a ${newTag} -m "auto-${get_commit}"
git push origin ${newTag}

cd -
