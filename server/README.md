# 服务器相关

## apache 

### 基础命令
```shell
./apachectl start/stop/restart
```

### 配置

#### etag

静态资源目录新建 .htaccess
> FileEtagINode Mtime Size



## nginx

### 基础命令

```shell
service nginx start/stop/restart

./nginx -t  # 测试配置

./nginx -s start/stop/restart
```

### 配置

#### etag

nginx.conf

新增 etag on;

etag 与 gzip冲突
nginx 在开启了 gzip 之后，如果有 ETAG 则会调用 ngx_http_clear_etag 将其清除。
从 nginx 1.7.3 这个版本之后，nginx 不再强硬地清除 ETAG 了，而是换了一种 weak ETAG 的策略。
ETag: "834a1-abb1-5aadb74cf14ca"
ETag: W/"14818aa-abb6-5ab2d6ff69cf3"
