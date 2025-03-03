# 双色球应用部署指南

本文档提供了将双色球应用部署到VPS的详细步骤。

## 方法一：使用Docker部署（推荐）

### 前提条件
- 一台安装了Docker和Docker Compose的VPS
- 基本的Linux命令行知识

### 部署步骤

1. 将项目文件上传到VPS

```bash
# 在本地打包项目
tar -czvf twocolorball.tar.gz /path/to/your/project

# 使用scp上传到VPS
scp twocolorball.tar.gz username@your-vps-ip:/path/to/destination

# 在VPS上解压
ssh username@your-vps-ip
cd /path/to/destination
tar -xzvf twocolorball.tar.gz
cd twocolorball
```

2. 使用Docker Compose构建和启动应用

```bash
# 构建并启动容器
docker-compose up -d

# 查看容器状态
docker-compose ps
```

3. 访问应用

现在您可以通过VPS的IP地址或域名访问应用：
```
http://your-vps-ip
# 或者
http://your-domain.com
```

### 更新应用

当您需要更新应用时，只需执行以下步骤：

```bash
# 拉取最新代码（如果使用Git）
git pull

# 或者重新上传更新后的文件

# 重新构建并启动容器
docker-compose up -d --build
```

## 方法二：直接部署

如果您不想使用Docker，也可以直接在VPS上部署React应用。

### 前提条件
- 一台安装了Node.js和npm的VPS
- Nginx或Apache Web服务器
- 基本的Linux命令行知识

### 部署步骤

1. 在本地构建React应用

```bash
npm run build
```

2. 将构建文件上传到VPS

```bash
# 打包构建文件
tar -czvf build.tar.gz build/

# 上传到VPS
scp build.tar.gz username@your-vps-ip:/path/to/destination

# 在VPS上解压
ssh username@your-vps-ip
cd /path/to/destination
tar -xzvf build.tar.gz
```

3. 配置Nginx

创建一个新的Nginx配置文件：

```bash
sudo nano /etc/nginx/sites-available/twocolorball
```

添加以下内容：

```nginx
server {
    listen 80;
    server_name your-domain.com;  # 替换为您的域名或IP

    root /path/to/destination/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

启用配置并重启Nginx：

```bash
sudo ln -s /etc/nginx/sites-available/twocolorball /etc/nginx/sites-enabled/
sudo nginx -t  # 测试配置
sudo systemctl restart nginx
```

4. 访问应用

现在您可以通过VPS的IP地址或域名访问应用：
```
http://your-vps-ip
# 或者
http://your-domain.com
```

## 故障排除

如果您在部署过程中遇到问题，请检查：

1. 防火墙设置是否允许80端口访问
2. Nginx/Docker服务是否正常运行
3. 日志文件中是否有错误信息

Docker日志查看：
```bash
docker-compose logs
```

Nginx日志查看：
```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
``` 