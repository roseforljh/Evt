# EveryTalk - 开源AI聊天助手官网

**EveryTalk** 的官方网站，采用 Next.js 16 + Three.js + Framer Motion 构建，展示这款高度可定制的开源 AI 聊天安卓应用。

🔗 **GitHub项目地址**: [https://github.com/roseforljh/EveryTalk](https://github.com/roseforljh/EveryTalk)

## 🤖 关于 EveryTalk

EveryTalk 是一款功能强大的开源AI聊天客户端，具有以下特点：

- 🎯 **多模型支持** - OpenAI、Gemini、Claude等主流AI模型，支持本地模型接入
- ⚡ **流式对话** - 实时流式响应，流畅的对话体验
- 🌐 **联网搜索** - 集成搜索引擎，获取实时信息
- 🎨 **图像生成** - 支持AI图像生成与编辑功能
- 📁 **多模态输入** - 支持文字、图片、音频、文档等
- 🔓 **完全开源** - MIT协议，代码透明，社区驱动

## ✨ 官网特性

- 黑白主题：默认跟随系统，支持手动浅色、深色切换。
- 品牌交互：原始企鹅 Logo 采样为三维像素，待机保持灰白，鼠标局部揭开彩色三维企鹅；拖尾逐渐恢复像素幕，点击产生扩散波纹。
- 浏览体验：品牌、六个 Dock 入口、太阳与中英文按钮合并到顶部液态玻璃栏；手机在同一个容器内分两排，底部不再占位。桌面滚轮使用 Lenis 轻量惯性，触摸、键盘和减少动画模式保留原生行为。
- 双语切换：中文与英文文案即时切换，覆盖首页、功能、下载、法律页面与导航提示；刷新、跨页保留选择。截图文字与外部版本名称保持原文。
- 像素雪背景：采用 React Bits Pixel Snow 源码，按需暂停渲染。
- 局部滚动动效：React Bits Scroll Expand 展示面板与 Scroll Reveal 标题。
- 产品展示：五张本地宣传图，可切换与查看完整原图。
- 无障碍：键盘操作、手机导航、静态 WebGL 回退和减少动画支持。
- 设计与素材说明：[BLACK_WHITE_REDESIGN.md](./BLACK_WHITE_REDESIGN.md)。

## 🛠️ 技术栈

### 核心框架
- **Next.js 16.4.0** - React 框架，采用 App Router 和 Turbopack
- **TypeScript 7.0.2** - 类型安全，使用原生 `tsc` 检查
- **React 19.3.0** - UI 库

### 样式
- **Tailwind CSS 4.3.3** - 原子化 CSS 框架，使用 `@tailwindcss/postcss`
- **自定义暗色主题** - 精心设计的配色系统

### 3D与动画
- **Three.js** - 3D渲染引擎
- **React Three Fiber** - React的Three.js封装
- **@react-three/drei** - R3F工具库
- **@react-three/postprocessing** - 后处理效果
- **Framer Motion** - React动画库
- **GSAP** - 高性能动画库
- **Lenis 1.3.26** - 桌面滚轮缓动，与 GSAP ScrollTrigger 同步

### 特效
- **react-tsparticles** - 粒子系统
- **自定义Shader** - WebGL着色器效果

### 图标与字体
- **Lucide React** - 图标库
- **Noto Sans SC、Space Grotesk** - 中文正文与英文品牌字体，通过 `next/font` 构建时下载并自托管

## 📦 安装

需要 Node.js **24.11.0 或更新版本**；本次升级使用 Node.js **26.11.1** 验证。依赖锁定在 `package-lock.json`，安装时使用 `npm ci`。

```powershell
# 安装依赖
npm ci

# 检查类型和源码
npm run typecheck
npm run lint

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

2026-10-09 已将直接依赖更新到 npm 的最新稳定版本，具体版本以 `package.json` 为准。ESLint 10 和 TypeScript 7 目前超出 `eslint-config-next` 的部分间接依赖支持范围，因此使用官方 Next.js 插件、Hooks 插件与 Babel 8 解析器；类型校验由 `tsc` 独立执行。已废弃且没有源码引用的 `react-tsparticles`、`tsparticles-engine`、`tsparticles-slim` 已移除。

生产依赖审计为 0 漏洞。完整审计仍报告 `@next/eslint-plugin-next → fast-glob → micromatch → braces` 的开发依赖告警（`GHSA-vfj7-8cjw-p6xm`），上游暂未发布修复版本；未通过强制安装或降级绕过。

## 📁 项目结构

```
Evt/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # 根布局
│   ├── page.tsx             # 首页
│   ├── features/page.tsx    # 功能页面
│   ├── download/page.tsx    # 下载页面
│   └── globals.css          # 全局样式
├── components/
│   ├── 3d/                  # 3D组件
│   │   ├── HeroScene.tsx    # 首页3D场景
│   │   ├── FloatingPhone.tsx # 3D手机模型
│   │   ├── ParticleField.tsx # 粒子场
│   │   └── ShaderBackground.tsx # 着色器背景
│   ├── layout/              # 布局组件
│   │   ├── Header.tsx       # 导航栏
│   │   ├── Footer.tsx       # 页脚
│   │   └── Navigation.tsx   # 移动端菜单
│   ├── sections/            # 页面区块
│   │   ├── Hero.tsx         # 英雄区块
│   │   ├── Features.tsx     # 功能展示
│   │   ├── Download.tsx     # 下载区块
│   │   └── Stats.tsx        # 统计数据
│   └── ui/                  # UI组件
│       ├── Button.tsx       # 按钮
│       ├── Card.tsx         # 卡片
│       ├── AnimatedText.tsx # 动画文字
│       └── CustomCursor.tsx # 自定义光标
├── lib/                     # 工具库
│   ├── animations.ts        # 动画配置
│   └── utils.ts            # 工具函数
└── public/                  # 静态资源
    └── models/             # 3D模型
```

## 🎨 设计系统

### 配色方案

```css
/* 背景色 */
--dark-bg: #0a0a0f
--dark-bg-secondary: #13131a
--dark-bg-tertiary: #1a1a24

/* 主色调 */
--primary: #6366f1 (靛蓝)
--secondary: #8b5cf6 (紫色)
--accent: #06b6d4 (青色)

/* 文字颜色 */
--text-primary: #e5e7eb
--text-secondary: #9ca3af
```

### 动画效果

- **页面过渡** - 淡入淡出 + 位移
- **滚动动画** - 元素进入视口触发
- **悬停效果** - 3D倾斜 + 发光边框
- **光标特效** - 自定义光标 + 粒子轨迹

### 3D效果

- **着色器背景** - 动态渐变噪声
- **粒子系统** - 2000+ 粒子 + 连接线
- **3D模型** - 漂浮手机 + 鼠标跟随
- **后处理** - Bloom发光 + 色差效果

## ⚡ 性能优化

- ✅ Next.js动态导入3D组件
- ✅ 图片使用Next/Image优化
- ✅ 静态生成所有页面(SSG)
- ✅ GPU性能检测自动降级
- ✅ 移动端简化3D效果
- ✅ requestAnimationFrame优化动画
- ✅ 代码分割与Tree Shaking

## 📱 响应式设计

- **移动端** (< 768px) - 简化3D效果，优先性能
- **平板** (768px - 1024px) - 适配触摸交互
- **桌面** (> 1024px) - 完整3D特效体验

## 🚀 部署

### Vercel (推荐)

```bash
# 安装Vercel CLI
npm i -g vercel

# 部署
vercel
```

### 其他平台

```bash
# 构建静态文件
npm run build

# 将 .next 目录部署到任何Node.js托管平台
```

## 📝 开发说明

### 添加新页面

1. 在 `app/` 目录下创建新文件夹和 `page.tsx`
2. 使用现有组件和样式系统
3. 添加到导航栏配置

### 自定义主题

修改 `tailwind.config.ts` 中的颜色配置：

```typescript
colors: {
  primary: { DEFAULT: '#6366f1', ... },
  // 添加更多颜色
}
```

### 添加3D效果

1. 在 `components/3d/` 创建新组件
2. 使用 React Three Fiber API
3. 在页面中使用 `<Suspense>` 包裹

## 🔗 相关链接

- **Android App GitHub**: [https://github.com/roseforljh/EveryTalk](https://github.com/roseforljh/EveryTalk)
- **后端代理项目**: backdAiTalk (见主项目说明)
- **官网仓库**: 当前仓库

## 📄 许可

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

如果您对 **EveryTalk Android App** 本身感兴趣，请访问主项目：
👉 [https://github.com/roseforljh/EveryTalk](https://github.com/roseforljh/EveryTalk)

## 📧 联系

- GitHub Issues: [提交问题](https://github.com/roseforljh/EveryTalk/issues)
- 主项目讨论区: 见 EveryTalk 仓库

---

**Made with ❤️ by Qoney**

