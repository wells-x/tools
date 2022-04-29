# linux 部分操作

## 基础

  ls,cd,vi,vim

## 查看目录内文件夹大小

```
du -h --max-depth=1 | sort -rh
```

## 文件夹内容寻找

```
$ find / -name '*' | xargs grep -r 'timersub'
```
## 权限

  chmod [who] [+ | - | =] [mode] 文件名

  命令中各选项的含义为

  u 表示“用户（user）”，即文件或目录的所有者。
  g 表示“同组（group）用户”，即与文件属主有相同组ID的所有用户。
  o 表示“其他（others）用户”。
  a 表示“所有（all）用户”。它是系统默认值。
  操作符号可以是：
  + 添加某个权限。
  - 取消某个权限。
  = 赋予给定权限并取消其他所有权限（如果有的话）。
  设置mode所表示的权限可用下述字母的任意组合：
  r 可读。
  w 可写。
  x 可执行。
  X 只有目标文件对某些用户是可执行的或该目标文件是目录时才追加x 属性。
  s 在文件执行时把进程的属主或组ID置为该文件的文件属主。方式“u＋s”设置文件的用户ID位，“g＋s”设置组ID位。
  t 保存程序的文本到交换设备上。
  u 与文件属主拥有一样的权限。
  g 与和文件属主同组的用户拥有一样的权限。
  o 与其他用户拥有一样的权限。
  sudo // 禁止访问时可以尝试加入
  //
  chmod -R  777  /home/mypackage
  //
  chmod  // 修改权限
  -R  // 目标路径下的所有文件
  777 // 是读、写、执行权限...

## 端口绑定问题

[Windows10内置Linux子系统初体验](http://www.jianshu.com/p/bc38ed12da1d)

# auto bash
## 自动部署
> 项目中需要 编译后到新仓库部署 手动打标签过慢，过于麻烦

 [自动部署分支](./auto-bash/try-test.sh)
 [自动部署标签](./auto-bash/try-tag.sh)

## 执行结果输出到文件

```
echo "日志内容"  > 文件
git log > index.md
```


## wsl Ubuntu mysql8 修改密码
```
alter user 'root'@'%' identified by '123456'; // 修改root登录密码
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456'; // 修改可视化连接密码
```

## xargs

> 给命令传递参数的一个过滤器，也是组合多个命令的一个工具。
## [Linux xargs 命令 | 菜鸟教程 ](https://www.runoob.com/linux/linux-comm-xargs.html)
```linux

# cat test.txt

a b c d e f g
h i j k l m n
o p q
r s t
u v w x y z

# cat test.txt | xargs

a b c d e f g h i j k l m n o p q r s t u v w x y z

# cat test.txt | xargs -n3

a b c
d e f
g h i
j k l
m n o
p q r
s t u
v w x
y z

git branch -a | grep EAS | xargs git branch -d

git branch -a | grep EAS | xargs -n1 git branch -d
```