# Docker 部署指南

## 🎯 两种部署方案

### 方案一：Vercel 部署（推荐，无需 Docker）⭐

**最简单的方式，5分钟完成：**

1. 访问 https://vercel.com
2. 用 GitHub 登录
3. 点击 "New Project"
4. 选择 `roseforljh/Evt` 仓库
5. 点击 "Deploy"（自动检测配置）
6. 等待2-3分钟，部署完成！

**优势：**
- ✅ 零配置
- ✅ 全球 CDN
- ✅ 自动 HTTPS
- ✅ 免费
- ✅ git push 自动部署

---

### 方案二：Docker 容器部署

如果您需要使用容器平台（如您截图中的服务），按以下步骤操作：

## 📦 构建 Docker 镜像

### 1. 本地构建镜像

```bash
# 构建镜像
docker build -t everytalk-website:latest .

# 测试运行
docker run -p 3000:3000 everytalk-website:latest

# 访问 http://localhost:3000 测试
```

### 2. 推送到 Docker Hub

```bash
# 登录 Docker Hub
docker login

# 标记镜像（替换 yourusername 为您的 Docker Hub 用户名）
docker tag everytalk-website:latest yourusername/everytalk-website:latest

# 推送镜像
docker push yourusername/everytalk-website:latest
```

### 3. 推送到阿里云/腾讯云容器镜像服务

#### 阿里云容器镜像服务

```bash
# 登录阿里云
docker login --username=你的账号 registry.cn-hangzhou.aliyuncs.com

# 标记镜像
docker tag everytalk-website:latest registry.cn-hangzhou.aliyuncs.com/命名空间/everytalk-website:latest

# 推送
docker push registry.cn-hangzhou.aliyuncs.com/命名空间/everytalk-website:latest
```

#### 腾讯云容器镜像服务

```bash
# 登录腾讯云
docker login ccr.ccs.tencentyun.com

# 标记镜像
docker tag everytalk-website:latest ccr.ccs.tencentyun.com/命名空间/everytalk-website:latest

# 推送
docker push ccr.ccs.tencentyun.com/命名空间/everytalk-website:latest
```

## 🖥️ 填写容器配置（针对您的截图）

### 容器配置界面填写：

```
工作负载类型: 无状态 ✓

容器配置:
├─ 名称: everytalk-website
├─ 镜像: yourusername/everytalk-website:latest
│   (或阿里云/腾讯云的镜像地址)
└─ 端口: 3000

资源配置:
├─ 内存(MiB): 512  (可以，够用)
└─ CPU(毫核): 500  (可以，够用)

预估费用: ¥11.25/月
```

### 详细步骤：

1. **选择镜像**：
   - 如果推送到 Docker Hub: `yourusername/everytalk-website:latest`
   - 如果推送到阿里云: `registry.cn-hangzhou.aliyuncs.com/命名空间/everytalk-website:latest`

2. **端口映射**：
   - 容器端口：`3000`
   - 服务端口：`80` 或 `443`（对外访问）

3. **资源配置**（当前配置够用）：
   - 内存：512 MiB ✅
   - CPU：500 毫核 ✅

4. **环境变量**（可选）：
   ```
   NODE_ENV=production
   PORT=3000
   ```

---

## 🚀 但我强烈建议使用 Vercel！

### 为什么？

| 对比项 | 容器平台 | Vercel |
|--------|---------|--------|
| 费用 | ¥11.25/月+ | **免费** |
| 配置难度 | 需要 Docker 知识 | **一键部署** |
| CDN 加速 | 需要额外配置 | **全球 CDN** |
| HTTPS | 需要配置证书 | **自动 HTTPS** |
| 自动部署 | 需要 CI/CD | **Git Push 自动部署** |
| 性能优化 | 需要手动优化 | **自动优化** |

---

## 📝 Vercel 部署步骤（3分钟完成）

```bash
# 方式1：命令行部署
npm i -g vercel
vercel login
vercel --prod

# 方式2：网页部署（更简单）
1. 访问 vercel.com
2. GitHub 登录
3. Import Project
4. 选择 Evt 仓库
5. Deploy（点击即可）
```

部署完成后会得到：
- 🌐 免费域名：`yourproject.vercel.app`
- 🔒 自动 HTTPS
- ⚡ 全球 CDN
- 🔄 自动部署（每次 push 代码）

---

## 💡 建议

**除非您有特殊需求（如内网部署、自有服务器），否则强烈推荐使用 Vercel。**

如果您确实需要 Docker 部署，我可以帮您：
1. 完善 Dockerfile
2. 创建 docker-compose.yml
3. 提供详细的构建和推送命令

请告诉我您想使用哪种方式？😊
