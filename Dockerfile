FROM node:18-alpine as build

WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制所有文件
COPY . .

# 构建应用
RUN npm run build

# 安装serve工具
RUN npm install -g serve

# 暴露端口（可以根据需要修改）
EXPOSE 3000

# 使用serve提供静态文件服务
CMD ["serve", "-s", "build", "-l", "3000"] 