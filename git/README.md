# git

## git 普通操作

````
git add .
git commit -m [message]
git push <-f> // 强推
````



## git 分支

````
git branch
git branch -a

git branch -r

git checkout [分支名]  // 分支名尽量不要包含 特殊符号 例如：& 会导致意外bug

git branch -d [branchName] 删除分支

git branch | grep [branchFilter] | xargs git branch -d // 删除所有相关分支

// eg:git branch | grep "EAS-" | xargs git branch -d 
````

## git 拉取代码
```
git pull 拉取当前分支
git pull origin [远程分支] 拉取特定远程分支到当前本地分支
git pull origin [远程分支]:[本地分支] 拉取特定远程分支到特定本地分支
```

## git 合并代码

````
git merge branch // 合并某个分支到当前分支
git merge --no-ff branch // 合并某个分支到当前分支，保留原分支记录
````


## git 重置

````
git reset HEAD <file>
git reset --hard [commitnum] // 强制回退到commitnum信息所在地址  //注意，此处push会报错，需要 git push -f
````


## git 标签

```
git tag // 打标签
git tag -a [version] -m [message] // 打带有信息的标签
git push origin [version] // 上传到远程仓库
```


## git更换https方 式账号

```
git credential-manager remove [--path <installion_path>] [--passive] [--force] 停止使用管理工具
```


## git 更换仓库地址

```
git remote set-url origin [url]
```

## git 比较commitId代码

```
git diff --raw [commitId|branch]
```


## git ignore 忽略不生效问题

```
git rm -r --cached .
git add .
git commit -m 'update .gitignore'
```

## git 冲突
```
git rebase -X theirs  
// -X 接收合并的其中一个分支
// -X  -- pass merge-strategy-specific option to merge strategy
```

## git config 修改配置

```
git config --global user.name "Your Name" // 修改全局 名称
git config --global user.email "your email" // 修改全局 邮箱
git config --global core.editor "vim" // 设置编辑器
git config --global push.default simple // 推送默认设置


/**
  @description: 文件对比mode值变化
  diff --git a/** b/**
  old mode 100644
  new mode 100755
*/
git config --add core.filemode false


```
