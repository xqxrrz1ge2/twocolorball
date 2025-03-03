# 双色球应用部署指南（适用于Cloudflare Zero Trust）

本文档提供了将双色球应用部署到VPS并通过Cloudflare Zero Trust访问的详细步骤。

## 使用Docker部署（无需Nginx）

### 前提条件
- 一台安装了Docker和Docker Compose的VPS
- Cloudflare Zero Trust账户
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

3. 配置Cloudflare Zero Trust

在Cloudflare Zero Trust控制面板中：

- 创建一个新的应用
- 设置应用的内部URL为 `http://localhost:3000`（或您VPS上的实际地址）
- 配置访问策略和身份验证方式
- 获取应用的公共URL（例如：`https://twocolorball.your-team.cloudflareaccess.com`）

4. 访问应用

现在您可以通过Cloudflare Zero Trust提供的公共URL访问应用：
```
https://twocolorball.your-team.cloudflareaccess.com
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

## 直接部署（无需Docker）

如果您不想使用Docker，也可以直接在VPS上部署React应用。

### 前提条件
- 一台安装了Node.js和npm的VPS
- Cloudflare Zero Trust账户
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

3. 安装并使用serve提供服务

```bash
# 安装serve工具
npm install -g serve

# 启动服务（可以使用nohup或pm2使其在后台运行）
nohup serve -s build -l 3000 > serve.log 2>&1 &

# 或者使用pm2（推荐）
npm install -g pm2
pm2 start "serve -s build -l 3000" --name twocolorball
```

4. 配置Cloudflare Zero Trust

在Cloudflare Zero Trust控制面板中：

- 创建一个新的应用
- 设置应用的内部URL为 `http://localhost:3000`（或您VPS上的实际地址）
- 配置访问策略和身份验证方式
- 获取应用的公共URL（例如：`https://twocolorball.your-team.cloudflareaccess.com`）

5. 访问应用

现在您可以通过Cloudflare Zero Trust提供的公共URL访问应用：
```
https://twocolorball.your-team.cloudflareaccess.com
```

## 故障排除

如果您在部署过程中遇到问题，请检查：

1. 确保应用在VPS上正常运行并监听在正确的端口上
2. 检查Cloudflare Zero Trust的配置是否正确
3. 查看应用日志以排查问题

Docker日志查看：
```bash
docker-compose logs
```

直接部署日志查看：
```bash
# 如果使用nohup
cat serve.log

# 如果使用pm2
pm2 logs twocolorball
```

## Cloudflare Zero Trust配置提示

1. **创建应用**：
   - 在Cloudflare Zero Trust控制面板中，导航到"Access" > "Applications"
   - 点击"Add an application"
   - 选择"Self-hosted"

2. **配置应用**：
   - 应用名称：例如"双色球号码生成器"
   - 应用域名：选择一个子域名，例如"twocolorball.your-team.cloudflareaccess.com"
   - 应用类型：选择"Web application"
   - 应用URL：输入您VPS上的应用地址，例如"http://localhost:3000"

3. **设置访问策略**：
   - 创建一个策略来控制谁可以访问您的应用
   - 可以基于电子邮件、域名、IP地址等设置访问规则

4. **高级设置**（可选）：
   - 启用或禁用浏览器隔离
   - 配置会话持续时间
   - 设置其他安全选项 