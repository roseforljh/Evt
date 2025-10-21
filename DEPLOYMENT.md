# 部署指南

## 🚀 部署选项

### 1. Vercel (推荐) ⭐

Vercel是Next.js的创建者，提供最佳的Next.js部署体验。

#### 快速部署

```bash
# 安装Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel

# 生产部署
vercel --prod
```

#### 通过GitHub部署

1. 将代码推送到GitHub
2. 访问 [vercel.com](https://vercel.com)
3. 点击 "Import Project"
4. 选择您的GitHub仓库
5. Vercel会自动检测Next.js并配置
6. 点击 "Deploy"

**优势**:
- ✅ 零配置
- ✅ 自动HTTPS
- ✅ 全球CDN
- ✅ 自动构建和部署
- ✅ 预览部署
- ✅ 免费额度充足

### 2. Netlify

#### 部署步骤

1. 安装Netlify CLI
```bash
npm i -g netlify-cli
```

2. 构建项目
```bash
npm run build
```

3. 部署
```bash
netlify deploy --prod
```

#### 配置文件

创建 `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### 3. 自托管 (VPS/云服务器)

#### 使用PM2

1. 构建项目
```bash
npm run build
```

2. 安装PM2
```bash
npm i -g pm2
```

3. 启动应用
```bash
pm2 start npm --name "ai-app-website" -- start
```

4. 配置自动重启
```bash
pm2 startup
pm2 save
```

#### Nginx配置

创建 `/etc/nginx/sites-available/ai-app`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

启用站点:
```bash
sudo ln -s /etc/nginx/sites-available/ai-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 4. Docker部署

#### Dockerfile

创建 `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### docker-compose.yml

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

#### 构建和运行

```bash
# 构建镜像
docker build -t ai-app-website .

# 运行容器
docker run -p 3000:3000 ai-app-website

# 或使用docker-compose
docker-compose up -d
```

### 5. GitHub Pages (静态导出)

**注意**: 此方法会失去一些Next.js功能。

1. 修改 `next.config.js`:
```javascript
module.exports = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}
```

2. 构建
```bash
npm run build
```

3. 部署 `out` 目录到GitHub Pages

## 🔧 环境变量

### 生产环境变量

创建 `.env.production`:

```env
# Next.js
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Analytics (可选)
NEXT_PUBLIC_GA_ID=your-ga-id

# API Keys (如需要)
# NEXT_PUBLIC_API_KEY=your-api-key
```

### Vercel环境变量设置

1. 进入项目设置
2. 选择 "Environment Variables"
3. 添加所需变量

## 📊 性能优化建议

### 1. 启用压缩

在 `next.config.js` 中:

```javascript
module.exports = {
  compress: true,
}
```

### 2. 配置CDN

使用Vercel或Netlify会自动获得全球CDN。

自托管时，建议使用:
- Cloudflare
- AWS CloudFront
- 阿里云CDN

### 3. 启用缓存

Nginx配置添加缓存:

```nginx
location /_next/static/ {
    proxy_pass http://localhost:3000;
    proxy_cache_valid 200 365d;
    add_header Cache-Control "public, immutable";
}
```

## 🔒 安全配置

### 1. HTTPS配置

#### 使用Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### 2. 安全头部

在 `next.config.js` 添加:

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}
```

## 📈 监控和分析

### 1. Vercel Analytics

在Vercel控制台中启用Analytics。

### 2. Google Analytics

在 `app/layout.tsx` 添加:

```tsx
import Script from 'next/script'

// 在body中添加
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
  strategy="afterInteractive"
/>
```

### 3. 性能监控

使用Next.js内置的性能监控:

```javascript
// pages/_app.tsx
export function reportWebVitals(metric) {
  console.log(metric)
  // 发送到分析服务
}
```

## 🐛 故障排查

### 构建失败

```bash
# 清除缓存
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### 3D效果不显示

确保服务器正确处理WebGL相关的MIME类型。

### 性能问题

1. 检查是否启用了生产模式
2. 确认启用了压缩
3. 检查CDN配置
4. 使用性能分析工具

## 📝 部署检查清单

- [ ] 代码已推送到Git
- [ ] 环境变量已配置
- [ ] 构建成功无错误
- [ ] HTTPS已配置
- [ ] 域名DNS已配置
- [ ] 性能优化已启用
- [ ] 安全头部已设置
- [ ] 监控已配置
- [ ] 备份策略已设置

## 🎯 推荐配置

**最佳实践**:

1. ✅ 使用Vercel或Netlify（最简单）
2. ✅ 配置自定义域名
3. ✅ 启用HTTPS
4. ✅ 配置CDN加速
5. ✅ 设置环境变量
6. ✅ 启用分析和监控
7. ✅ 定期备份

## 💡 提示

- Vercel提供最佳的Next.js支持
- 首次部署选择自动部署，方便后续更新
- 使用环境变量管理敏感信息
- 定期更新依赖包
- 监控性能和错误日志

---

**祝部署顺利！** 🚀

如有问题，请查看:
- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [Vercel 文档](https://vercel.com/docs)
- [Netlify 文档](https://docs.netlify.com)

