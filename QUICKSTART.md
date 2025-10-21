# 快速开始指南

## 🚀 快速启动

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 3. 构建生产版本

```bash
npm run build
npm start
```

## 📝 开发指南

### 自定义配置

#### 修改颜色主题

编辑 `tailwind.config.ts`:

```typescript
colors: {
  primary: { DEFAULT: '#6366f1', ... },
  secondary: { DEFAULT: '#8b5cf6', ... },
  // 修改为您喜欢的颜色
}
```

#### 调整性能设置

编辑 `lib/performance.ts` 中的 `getPerformanceSettings()` 函数来调整3D效果和粒子数量。

#### 添加新页面

1. 在 `app/` 目录创建新文件夹
2. 添加 `page.tsx` 文件
3. 在 `components/layout/Header.tsx` 添加导航链接

### 项目结构说明

```
app/              # Next.js页面
components/       # React组件
  ├── 3d/        # Three.js 3D组件
  ├── layout/    # 布局组件（Header, Footer）
  ├── sections/  # 页面区块组件
  └── ui/        # 通用UI组件
lib/             # 工具函数和配置
public/          # 静态资源
```

## 🎨 自定义内容

### 修改首页内容

编辑 `components/sections/Hero.tsx` 修改首页标题和描述。

### 修改功能介绍

编辑 `components/sections/Features.tsx` 或 `app/features/page.tsx`。

### 修改下载页面

编辑 `app/download/page.tsx`。

## 🔧 常见问题

### 3D效果不显示？

- 确保浏览器支持WebGL
- 检查GPU驱动是否是最新版本
- 移动端会自动降级到简化版本

### 动画卡顿？

- 系统会自动检测设备性能并降级
- 可以在 `lib/performance.ts` 中调整性能阈值

### 如何部署？

推荐使用 Vercel:

```bash
npm i -g vercel
vercel
```

或部署到任何支持Node.js的平台。

## 📦 依赖说明

- **Next.js 14**: React框架
- **Three.js**: 3D渲染
- **Framer Motion**: 动画库
- **Tailwind CSS**: CSS框架

## 🎯 性能优化建议

1. 使用 `next/image` 优化图片
2. 3D组件已配置动态导入
3. 移动端自动简化效果
4. 启用了代码分割

## 📱 响应式设计

- 移动端 (< 768px): 简化3D，优化触摸
- 平板 (768-1024px): 中等效果
- 桌面 (> 1024px): 完整特效

## 🔐 环境变量

暂时不需要配置环境变量。未来如需要添加API等功能，请创建 `.env.local` 文件。

## 🤝 获取帮助

- 查看 README.md 了解详细文档
- 查看代码注释了解实现细节
- 参考 Next.js 官方文档

---

**祝开发愉快！**

