# 缓存

## HTTP Headers
* Cache-Control
 1. no-store  // 缓存不应存储有关客户端请求或服务器响应的任何内容，即不使用任何缓存。
 2. no-cache // 在发布缓存副本之前，强制要求缓存把请求提交给原始服务器进行验证(协商缓存验证)。
 3. max-age (秒) // 设置缓存存储的最大周期，超过这个时间缓存被认为过期(单位秒)。与Expires相反，时间是相对于请求的时间。
 4. public // 表明响应可以被任何对象（包括：发送请求的客户端，代理服务器，等等）缓存，即使是通常不可缓存的内容。（例如：1.该响应没有max-age指令或Expires消息头；2. 该响应对应的请求方法是 POST 。）
 5. private // 表明响应只能被单个用户缓存，不能作为共享缓存（即代理服务器不能缓存它）。私有缓存可以缓存响应内容，比如：对应用户的本地浏览器。

* Expires

  ````
  Expires 响应头包含日期/时间， 即在此时候之后，响应过期。
  
  无效的日期，比如 0, 代表着过去的日期，即该资源已经过期。

  如果在Cache-Control响应头设置了 "max-age" 或者 "s-max-age" 指令，那么 Expires 头会被忽略。
  ````
  ```
  Expires: <http-date>
  Expires: Wed, 21 Oct 2015 07:28:00 GMT
  ```

* Last-Modified/If-Modified-Since

  ```
  The Last-Modified  是一个响应首部，其中包含源头服务器认定的资源做出修改的日期及时间。 它通常被用作一个验证器来判断接收到的或者存储的资源是否彼此一致。由于精确度比  ETag 要低，所以这是一个备用机制。包含有  If-Modified-Since 或 If-Unmodified-Since 首部的条件请求会使用这个字段。
  ```

* Etag/If-None-Match

  ```
  ETag: W/"<etag_value>"
  ETag: "<etag_value>"
  ```
  ```
  服务器将客户端的ETag（作为If-None-Match字段的值一起发送）与其当前版本的资源的ETag进行比较，如果两个值匹配（即资源未更改），服务器将返回不带任何内容的304未修改状态，告诉客户端缓存版本可用（新鲜）。
  ```


## nginx 相关配置

> header
  ```nginx
  add_header Cache-Control no-cache;
  add_header Cache-Control no-store;
  expires      30d;
  ```
> gzip
  ```nginx
  # 开启gzip
  gzip on;

  # 启用gzip压缩的最小文件，小于设置值的文件将不会压缩
  gzip_min_length 1k;

  # gzip 压缩级别，1-9，数字越大压缩的越好，也越占用CPU时间，后面会有详细说明
  gzip_comp_level 1;

  # 进行压缩的文件类型。javascript有多种形式。其中的值可以在 mime.types 文件中找到。
  gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png application/vnd.ms-fontobject font/ttf font/opentype font/x-woff image/svg+xml;

  # 是否在http header中添加Vary: Accept-Encoding，建议开启
  gzip_vary on;

  # 禁用IE 6 gzip
  gzip_disable "MSIE [1-6]\.";

  # 设置压缩所需要的缓冲区大小     
  gzip_buffers 32 4k;

  ```