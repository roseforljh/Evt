# EveryTalk - 开源AI聊天助手官网

**EveryTalk** 的官方网站，采用Next.js 14 + Three.js + Framer Motion构建，展示这款高度可定制的开源AI聊天安卓应用。

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

- 🎨 **暗色主题设计** - 精心打磨的暗色系配色方案
- 🚀 **极致性能** - Next.js 14 App Router + SSG静态生成
- 🎭 **3D视觉效果** - Three.js + React Three Fiber 打造的WebGL场景
- ✨ **流畅动画** - Framer Motion + GSAP 高性能动画系统
- 🎯 **粒子特效** - 动态粒子背景 + 自定义着色器
- 📱 **完全响应式** - 移动端、平板、桌面端完美适配
- 🎪 **自定义光标** - 跟随光标的粒子轨迹效果
- ⚡ **性能优化** - 懒加载、代码分割、GPU检测降级

## 🛠️ 技术栈

### 核心框架
- **Next.js 14** - React框架，采用App Router
- **TypeScript** - 类型安全
- **React 18** - UI库

### 样式
- **Tailwind CSS** - 原子化CSS框架
- **自定义暗色主题** - 精心设计的配色系统

### 3D与动画
- **Three.js** - 3D渲染引擎
- **React Three Fiber** - React的Three.js封装
- **@react-three/drei** - R3F工具库
- **@react-three/postprocessing** - 后处理效果
- **Framer Motion** - React动画库
- **GSAP** - 高性能动画库

### 特效
- **react-tsparticles** - 粒子系统
- **自定义Shader** - WebGL着色器效果

### 图标与字体
- **Lucide React** - 图标库
- **Google Fonts (Inter, Poppins)** - 字体

## 📦 安装

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

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

**Made with ❤️ by EveryTalk Team**

