# GitHub Actions 工作流说明

## 📦 自动 Docker 镜像构建

本项目包含两个 Docker 镜像构建工作流：

### 1. GitHub Container Registry（默认启用）✅

**文件**: `docker-build.yml`

**功能**:
- 自动构建 Docker 镜像
- 推送到 GitHub Container Registry (ghcr.io)
- 每次推送到 main 分支时触发
- 无需额外配置，自动使用 GITHUB_TOKEN

**镜像地址**:
```
ghcr.io/roseforljh/evt:latest
ghcr.io/roseforljh/evt:main
ghcr.io/roseforljh/evt:main-<commit-sha>
```

**使用方式**:
```bash
# 拉取镜像
docker pull ghcr.io/roseforljh/evt:latest

# 运行容器
docker run -p 3000:3000 ghcr.io/roseforljh/evt:latest
```

---

### 2. Docker Hub（可选，需配置）

**文件**: `docker-hub.yml`（默认禁用）

**启用步骤**:

#### 第一步：在 Docker Hub 创建访问令牌

1. 登录 https://hub.docker.com
2. 点击右上角头像 → Account Settings
3. Security → New Access Token
4. 复制生成的 Token

#### 第二步：在 GitHub 添加 Secrets

1. 进入您的仓库 https://github.com/roseforljh/Evt
2. Settings → Secrets and variables → Actions
3. 点击 "New repository secret"
4. 添加以下两个 Secrets:
   - Name: `DOCKERHUB_USERNAME`  Value: 您的 Docker Hub 用户名
   - Name: `DOCKERHUB_TOKEN`     Value: 刚才复制的 Token

#### 第三步：重命名工作流文件

将 `docker-hub.yml` 重命名或在文件中取消禁用即可。

**镜像地址**:
```
yourusername/everytalk-website:latest
```

---

## 🔧 工作流配置说明

### 触发条件

```yaml
on:
  push:
    branches:
      - main           # 推送到 main 分支时触发
    paths-ignore:
      - '**.md'        # 忽略 Markdown 文件更改
      - '.gitignore'   # 忽略 .gitignore 更改
  workflow_dispatch:   # 允许手动触发
```

### 构建特性

- ✅ 多平台支持: linux/amd64, linux/arm64
- ✅ 缓存优化: GitHub Actions cache
- ✅ 自动标签: latest, main, commit-sha
- ✅ 并行构建: Docker Buildx

---

## 📊 工作流状态查看

### 查看构建状态

1. 进入 GitHub 仓库
2. 点击 "Actions" 标签
3. 查看工作流运行状态

### 构建完成后

- ✅ 自动创建 Docker 镜像
- ✅ 推送到容器注册表
- ✅ 可在 Packages 页面查看

---

## 🚀 使用构建的镜像

### 从 GitHub Container Registry 拉取

```bash
# 拉取镜像
docker pull ghcr.io/roseforljh/evt:latest

# 运行容器
docker run -d -p 3000:3000 --name everytalk ghcr.io/roseforljh/evt:latest

# 访问
# http://localhost:3000
```

### 使用 docker-compose

创建 `docker-compose.yml`:

```yaml
version: '3.8'

services:
  web:
    image: ghcr.io/roseforljh/evt:latest
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

运行:
```bash
docker-compose up -d
```

---

## 🔐 镜像权限设置

### GitHub Container Registry 默认是私有的

如果需要公开访问：

1. 进入 https://github.com/roseforljh?tab=packages
2. 找到 `evt` 镜像
3. Package settings → Change visibility → Public

---

## 💡 自动化流程

```
代码推送 (git push)
    ↓
GitHub Actions 触发
    ↓
构建 Docker 镜像
    ↓
推送到容器注册表
    ↓
容器平台自动拉取新镜像
    ↓
自动更新部署 ✅
```

---

## 🎯 容器平台填写

现在您可以在容器平台填写：

```
镜像地址: ghcr.io/roseforljh/evt:latest

或者等待第一次构建完成后，查看实际的镜像地址
```

---

## ⚠️ 注意事项

1. **首次构建需要时间** - 大约 5-10 分钟
2. **需要等工作流完成** - 再填写镜像地址
3. **镜像权限** - 确保设置为 Public（如果容器平台在外部）

---

## 🔍 检查构建状态

推送代码后，访问：
https://github.com/roseforljh/Evt/actions

查看构建进度和日志。

