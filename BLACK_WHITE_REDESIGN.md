# EveryTalk 官网：像素企鹅与黑白动效设计

> 更新：2026-10-09。已实现本地版本，尚未部署。
> 官网工程：`C:/Users/33039/Desktop/KunK/Evt`。
> 本文替代之前的静态黑白方案，以最新的像素交互需求为准。

## 设计方向

官网面向希望在 Android 上自由连接模型、使用搜索与多模态能力的用户。页面首先说明产品，再引导下载。视觉记忆点是一只由细小三维方块组成的企鹅：它是品牌标记，和主标题并列出现。

黑色主视觉、白色信息层、灰度边框与克制留白。浅色模式反转背景与信息颜色。首屏三维像素企鹅的待机像素幕保持灰白，鼠标揭幕后显示红、橙、黄、绿、青、蓝、紫的七彩渐变；技术栈滚动区的 Logo 保留各项目官方品牌色，作为局部彩色点缀；单色标识根据主题反转。用户宣传图在页面内以灰度显示，完整原图入口保留原始颜色。

| 层级     | 深色    | 浅色    |
| -------- | ------- | ------- |
| 页面     | #000000 | #FFFFFF |
| 主要内容 | #FFFFFF | #111111 |
| 次要文字 | #A3A3A3 | #646464 |
| 展示表面 | #0C0C0C | #F6F6F6 |
| 分隔线   | #292929 | #DEDEDE |

标题与中文正文使用 Noto Sans SC，英文品牌和技术标签使用 Space Grotesk，功能标签保留系统等宽字体。通过现有 `next/font` 在构建时下载并自托管字体，不新增字体包。

## 页面结构

```text
顶部液态玻璃：EveryTalk. / 首页 功能 技术 体验 下载 源码 / 太阳 EN
────────────────────────────────────────────────────────────────
让对话，                             三维像素企鹅
自由发生.                           局部揭幕，拖尾恢复
说明 / 下载 / 源码                   像素揭幕
────────────────────────────────────────────────────────────────
一个入口，更多可能。                模型 / 搜索 MCP / 图像 / 排版
OpenAI / Gemini / Claude → 企鹅 Logo → MCP / 搜索 / 图像生成
从对话，到创造。                    五张宣传图切换、局部滚动展开
开放的 AI，随身带走。               下载、连接模型、开始对话
────────────────────────────────────────────────────────────────
GitHub / 隐私政策 / 服务条款 / MIT
手机：同一个顶部玻璃容器内，上排品牌、太阳、EN；下排六个导航图标
```

首页使用单页锚点滚动；保留 `/features`、`/download` 与法律页面，所有页面共用主题、导航和背景。

公共产品区块采用随视口伸展的容器，去掉原来的 1280px 宽度上限。桌面两侧总间距为 `clamp(64px, 6vw, 160px)`：1920px 屏幕每侧约 58px，2560px 屏幕每侧约 77px。1050px 及以下仍保持每侧 32px，700px 及以下每侧 20px；法律正文保留适合阅读的原有宽度。页头独立为最大 1000px 的顶部玻璃 Dock，不沿用正文宽度。

宽屏更新验证：浏览器测量 320–3440px 的 11 种视口宽度，确认公共区块对齐、边距符合上述规则、页面无横向溢出且 Dock 完整可见。已核对深浅主题截图，功能页与下载页在 390px、1920px 下无溢出；无应用 JavaScript 错误。`bun run build` 与 `git diff --check` 通过。

### 悬浮胶囊导航、滚动与字体

- 顶部最初参考 Chatbox 的悬浮结构，当前按最新需求合并品牌与 Dock：完整复用原底部 GlassSurface 的折射、边缘与阴影，加入品牌、六个导航入口、太阳和语言按钮；移除原底部浮层与旧胶囊样式。
- `components/ui/SmoothScroll.tsx` 使用 Lenis 1.3.26 为桌面滚轮提供轻量惯性，并把滚动事件同步给 GSAP ScrollTrigger。触摸、键盘和 `prefers-reduced-motion` 继续使用浏览器原生路径，避免影响可访问性和移动端滑动。
- `app/layout.tsx` 将正文中文字体换为 Noto Sans SC，英文品牌与技术标签换为 Space Grotesk；字体选择服务于清晰中文阅读和像素品牌的几何感，不照搬 Chatbox 的衬线字体。
- 新增的唯一依赖为 Lenis，版本同步到 `package.json` 和现有 `package-lock.json`；标题和宣传面板继续复用已有 GSAP，分别增加 0.4 秒与 0.45 秒的滚动缓冲。
- 锚点留白由 CSS `--navigation-offset` 统一控制：桌面 104px，手机 144px。当前 Lenis 已支持读取 `scroll-padding-top`，使用 `anchors: true`，避免重复设置偏移。
- 首屏在企鹅延迟加载前预留画布和说明高度；带锚点首次加载时，等待页面与字体就绪后对齐一次，避免浏览器初始定位被动画刷新打断。后续滚轮与页面内导航不经过此校正。
- 验证：悬浮胶囊在 1440px、390px 可见且不遮挡内容；滚轮滚动保持连续，锚点可到达；减少动画时不创建 Lenis；手机无横向溢出。类型检查、Lint、生产构建和 `git diff --check` 通过。

### 顶部 Dock 与即时双语

- 太阳右侧为语言按钮：中文时显示 `EN`，英文时显示 `中`，表示下一次切换的目标。
- 默认中文，选择以 `everytalk-language` 保存；刷新与跨页面保留选择。存储被禁用时，本次访问仍可切换。
- 首页、功能、下载、两个法律页面、导航名称、辅助标签、展示分类和日期均支持即时切换；同步页面 `lang` 与浏览器标签标题。外部版本名称和应用截图内文字保持原文。
- `components/ui/LanguageProvider.tsx` 管理共享语言状态；`lib/translations.ts` 维护英文文案；法律页面通过 `LocalizedText` 接入，继续保留服务器元数据。
- 语言变化后刷新滚动区块的位置，保留主题、展示图选择与企鹅画布，不重复创建 WebGL。未新增项目依赖。
- 浏览器验证覆盖五个页面的两种语言、刷新记忆、320–1920px 的八种视口、两种主题、减少动画和禁用存储；320px 顶栏保持两排、所有控制至少 44px、没有横向溢出。桌面与手机锚点实测分别约 104px、144px；从功能和法律页面返回首页区块定位通过。

下面的最小自检可在当前 Windows 工作机的 PowerShell 中重复运行，需要本地预览已在 43187 端口启动。复用工作机已有 Playwright，不向项目添加测试依赖：

```powershell
@'
const assert = require('node:assert/strict');
const { chromium } = require('C:/Users/33039/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ reducedMotion: 'reduce', viewport: { width: 320, height: 844 } });
    await page.route('**/api.github.com/repos/roseforljh/EveryTalk/releases?*', route => route.fulfill({ status: 403, body: '{}' }));
    await page.goto('http://127.0.0.1:43187/', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Switch to English' }).click();
    for (const path of ['/', '/features', '/download', '/privacy-policy', '/terms-of-service']) {
      await page.goto('http://127.0.0.1:43187' + path, { waitUntil: 'networkidle' });
      await page.waitForFunction(() => document.documentElement.lang === 'en');
      assert.deepEqual((await page.locator('body').innerText()).match(/[\p{Script=Han}]+/gu), ['中']);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      assert.equal(await page.locator('.floating-dock').count(), 0);
    }
    await page.getByRole('link', { name: 'Technology', exact: true }).click();
    await page.waitForURL('**/#ecosystem');
    await page.waitForFunction(() => Math.abs(document.querySelector('#ecosystem').getBoundingClientRect().top - 144) < 6);
    console.log('PASS: language persistence, translation coverage, mobile layout and cross-page anchor');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
'@ | node
```

浏览器标签图标采用圆角浅底与黑色原企鹅。`public/favicon.svg` 内嵌原始 Logo，通过 SVG 视口缩小图片留白，让企鹅主体占图标约 80% 的宽度；保留原图的眼睛、嘴、身体与对话气泡，不重新绘制品牌。`public/favicon-32.png` 为同一 SVG 的 32px 栅格版本，用于兼容回退；由项目已有 Sharp 生成，不新增依赖。`app/layout.tsx` 为全站声明这两种图标，SVG 排在后面供支持它的浏览器优先使用。浅底保证深色标签栏下轮廓可见，细灰边框保证浅色标签栏下圆角外形可见。

标签图标验证：SVG 内部图像使用像素采样，避免小尺寸下的原像素轮廓被平滑成灰色细线。浏览器实测 16px、32px 时黑色企鹅分别占 12px、24px 宽，圆角外围透明且黑白区域对比清晰；已查看深浅标签栏的 16px、32px、64px 预览。首页、功能、下载及两个法律页面均加载新图标，SVG 和 PNG 均返回 200 且媒体类型正确，无应用 JavaScript 错误。Lint、含类型检查的生产构建和 `git diff --check` 通过；尚未部署。

## 动效与来源

### Pixel Snow

- 本地采用 React Bits 原始 Pixel Snow shader。
- 来源：[PixelSnow.tsx](https://github.com/DavidHDev/react-bits/blob/main/src/ts-default/Backgrounds/PixelSnow/PixelSnow.tsx)。
- 位于 `components/3d/pixel-snow-shaders.ts`，渲染适配位于 `components/3d/PixelSnow.tsx`。
- 雪粒稀疏、慢速，深色白雪、浅色黑雪。背景不接收指针，不遮挡内容。
- 限制绘制分辨率与帧率；标签不可见时暂停。减少动画模式只绘制静态帧。

### 三维像素企鹅

- 输入是用户提供的新 Logo：`public/everytalk-logo-source.png`。
- 直接采样原始图的深色区域，过滤白色背景。未使用生成图作为形状来源，保留原 Logo 轮廓。
- 小方块分三层形成厚度，使用单个 InstancedMesh 合并绘制。
- 按实际轮廓高度，从头到脚为方块赋予红、橙、黄、绿、青、蓝、紫的连续渐变。待机阶段使用 Dither Veil 的灰度 Bayer 像素幕；鼠标揭幕后直接显示带实例颜色的真实三维画面，形成灰白到七彩的揭幕对比。浅色主题稍降低统一材质亮度，保留七彩并增强与白底的轮廓对比。
- 实例位置与七彩颜色只在加载 Logo 时上传一次；鼠标交互只修改像素幕，不改变方块位置或重传颜色。主题切换更新统一材质亮度和灰白幕亮度，不逐帧更新实例。灰度幕取原画最亮的颜色通道，避免蓝紫方块转灰后过暗而丢失轮廓。
- 使用 React Bits [Dither Veil](https://reactbits.dev/animations/dither-veil) 的原始轨迹遮罩、Bayer 抖色和揭幕着色器。鼠标局部擦开像素幕，露出真实三维光照；轨迹随时间衰减并恢复像素幕，点击产生扩散波纹。
- “像素揭幕”按钮提供手机和键盘的波纹入口；触摸不触发悬停，保留纵向滚动与双指缩放。减少动画时静态显示并禁用按钮。
- 原始静态 Logo 作为 WebGL 不可用时的回退。
- 官方来源：[DitherVeil.tsx](https://github.com/DavidHDev/react-bits/blob/main/src/ts-default/Animations/DitherVeil/DitherVeil.tsx)。复用项目现有 Three.js 承载 GPU 后处理，不新增 OGL；输入是透明三维渲染纹理，输出保留企鹅外部透明区域。
- 组件：`components/3d/PixelPenguin.tsx`；官方 shader 与透明输入适配：`components/3d/dither-veil-shaders.ts`。

灰白待机与七彩揭幕验证：读取浏览器实际 WebGL 帧，待机彩色像素为 0，悬停局部揭幕后为 8284，离开并等待轨迹恢复后再次为 0。深浅主题均保持清晰轮廓，揭幕使用七彩原画。悬停、离开恢复、鼠标点击与按钮波纹通过，交互期间未重传实例位置或颜色；减少动画时两次截图一致并停止绘制，320px 与 390px 手机无横向溢出。类型检查、Lint、生产构建和 `git diff --check` 通过，无 JavaScript 或 WebGL 错误；尚未部署。

### Scroll Expand

- 来源：[ScrollExpand.tsx](https://github.com/DavidHDev/react-bits/blob/main/src/ts-default/Animations/ScrollExpand/ScrollExpand.tsx)。
- 复用其 smoothstep 和 clip-path 展开算法，用现有 GSAP ScrollTrigger 的 0.45 秒缓冲平滑宣传图区域；由 GSAP 直接管理样式，在动画偏好变化时恢复原始状态。
- 不接管全页滚动，不引入滚动锁；桌面由较窄面板展开，手机幅度更小。
- 减少动画模式直接显示完整面板。
- 组件：`components/ui/ScrollExpand.tsx`。
- 最新浏览器验证：桌面裁剪从 14% 平滑过渡到 0%，访问中开启减少动画后内联裁剪与缩放均清除，关闭后恢复动画；桌面切换到 390px 手机后初始裁剪重新计算为 5%，切图正常且无横向溢出、无 JavaScript 错误。

### Scroll Reveal

- 来源：[ScrollReveal.tsx](https://github.com/DavidHDev/react-bits/blob/main/src/ts-default/TextAnimations/ScrollReveal/ScrollReveal.tsx)。
- 用项目现有 GSAP 和 ScrollTrigger，中文按字符渐显，仅用在区块标题；滚动缓冲为 0.4 秒，初始模糊减至 1.5px、位移减至 10px，减少生硬跳动。
- 只清理自己的动画上下文，避免影响其他区块。
- 减少动画模式、JavaScript 未执行时保持文字可读。
- 组件：`components/ui/ScrollReveal.tsx`。

### Holo Card 截图卡片

- 来源：[React Bits Holo Card](https://reactbits.dev/components/holo-card) 与[官方 TypeScript 源码](https://github.com/DavidHDev/react-bits/blob/main/src/ts-default/Components/HoloCard/HoloCard.tsx)。已核对注册表 `https://reactbits.dev/r/HoloCard-TS-CSS.json`，CLI 可通过 `bunx shadcn@latest add https://reactbits.dev/r/HoloCard-TS-CSS.json` 获取；官方组件无额外依赖，本地直接适配源码。
- 首页和功能页共用 `Showcase`，现有五张宣传图全部由 Holo Card 装载；保留分类切换、前后切换、完整原图入口和 Scroll Expand。
- 保留官方 WebGL2 光箔、闪点与弹簧倾斜算法，使用 `glitter` 预设；统一灰度为银黑色，降低光箔与眩光强度，优先保证截图文字可读。
- 鼠标移动时倾斜并改变反光，离开后归位。关闭持续漂浮；指针停住、卡片离屏或浏览器进入后台时停止空转。
- 手机触摸不触发倾斜，保留纵向滑动与双指缩放；减少动画模式立即归位并静止展示，访问中修改系统偏好也生效。
- 原图始终保留，纹理就绪后才显示画布。WebGL 不可用、纹理上传失败或 GPU 上下文丢失时继续显示图片；快速换图通过加载版本防止旧请求覆盖新选择。
- `components/ui/HoloCard.tsx`：官方交互与渲染适配，去掉本页不需要的背面翻转。
- `components/ui/holo-card-shaders.ts`：原始顶点与片元着色器，避免与 React 生命周期逻辑混在一起。
- `app/globals.css`：官方卡片容器样式、黑白适配、响应式尺寸与减少动画规则。许可沿用本文末尾的 React Bits 许可全文。
- 验证：类型检查、Lint、生产构建通过；浏览器验证了五张图切换、前后循环、倾斜与归位、深浅主题、减少动画静止与停止渲染、延迟旧图保护、WebGL2 缺失和 GPU 上下文丢失回退。手机 390×844 无横向溢出，真实触摸滑动正常，未发现应用 JavaScript 或 shader 错误。

### Elastic Mesh 下载区背景

- 来源：[React Bits Elastic Mesh](https://reactbits.dev/animations/elastic-mesh) 与[官方 TypeScript 源码](https://github.com/DavidHDev/react-bits/blob/main/src/ts-default/Animations/ElasticMesh/ElasticMesh.tsx)。已核对官方注册表 `https://reactbits.dev/r/ElasticMesh-TS-CSS.json`，CLI 可通过 `bunx shadcn@latest add https://reactbits.dev/r/ElasticMesh-TS-CSS.json` 获取。
- 官网已有 Three.js；保留原组件的网格、弹簧耦合、法线重建、透视反投影和着色器，以 Three.js 替换原来的 OGL 渲染封装，不新增依赖。
- 只放在下载区背景，首页、功能页和下载页共用。黑色主题使用深灰曲面与银色网格，浅色主题反转为浅灰曲面。左侧渐隐，文字、安装步骤和下载链接保持静止，不受形变影响。
- 鼠标经过时局部隆起，离开后阻尼回弹。事件监听父区块，背景不遮挡按钮；手机触摸不驱动物理效果，也不拦截滑动或缩放。
- 首次进入视口才创建 GPU 资源；达到平衡、回弹结束、离屏或切到后台时停止渲染。减少动画时清零位移并只画静态帧，访问中修改系统偏好也生效；主题切换会更新静态画面。
- WebGL 不可用或上下文丢失时显示 CSS 静态网格，保留下载入口和全部内容。
- `components/3d/ElasticMesh.tsx`：Three.js 渲染、鼠标投影、主题和生命周期管理。
- `components/3d/elastic-mesh-physics.ts`：沿用官方弹簧、邻接耦合与法线算法。
- `components/3d/elastic-mesh-shaders.ts`：官方顶点与片元着色器，去掉 Three.js 已声明的 `uv` 属性。
- `components/3d/elastic-mesh-physics.test.ts`：无框架物理自检；在官网目录运行 `bun components/3d/elastic-mesh-physics.test.ts`，检查受力、归位、静止、法线、索引和重置。
- `components/sections/Download.tsx` 与 `app/globals.css`：局部背景位置、黑白样式、渐隐与静态回退。许可沿用本文末尾的 React Bits 许可全文。
- 验证：Bun 物理自检、类型检查、Lint、生产构建通过。桌面浏览器确认了延迟创建、鼠标隆起与回弹、静止/离屏停止渲染、减少动画归零且两次截图一致、恢复交互、静止时主题更新和下载链接。手机 390×844 无横向溢出，真实触摸滑动正常；WebGL 不可用及 GPU 上下文丢失均回退为静态网格，未发现应用 JavaScript 或 shader 错误。

### Magic UI Animated Beam 图标关系图

在功能区标题之后、四组能力说明之前加入完整关系图，首页与 `/features` 共用。左侧是 OpenAI、Gemini、Claude 的标识，中心为 EveryTalk 企鹅 Logo，右侧为 MCP 官方标识、搜索与图像生成图标。所有节点都有可见名称；流动光束表达模型与应用能力的连接，不代表实时接口调用状态。

- 已核对官方安装命令 `bunx shadcn@latest add @magicui/animated-beam`、[组件源码](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/animated-beam.tsx)、[完整图标示例](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/example/animated-beam-demo.tsx)及[组件注册表](https://magicui.design/r/animated-beam.json)。基础组件绘制连线与脉冲，圆形节点和图标来自示例布局，已一起实现。
- `components/ui/AnimatedBeam.tsx`：沿用官方二次贝塞尔路径、SVG 移动线性渐变及四个透明渐变节点，复用现有 Framer Motion；调成 3 秒匀速流动和错开启动，使用黑白主题变量，不新增 Motion 或 Radix 依赖。
- `components/sections/ModelConnections.tsx`：七个节点与六条连接、中心品牌、真实模型和能力名称、暂停/继续入口。离屏及后台停止渐变，减少动画时只保留静态连线与图标。
- `components/sections/Features.tsx`：在公共功能区接入关系图。`app/globals.css`：节点/连线分层、深浅主题与手机布局；ResizeObserver 跟随节点及容器尺寸重新测量端点。
- `public/tech-logos/openai.svg`：来自 Magic UI 官方完整示例中的 OpenAI 路径，许可沿用本文的 Magic UI MIT 许可全文。
- `public/tech-logos/gemini.png`：来自 [Google 官方 Gemini 图标](https://www.gstatic.com/lamda/images/gemini_favicon_f069958c85030456e93de685481c559f160ea06b.png)。
- `public/tech-logos/claude.png`：来自 [Claude 官网图标](https://assets.claude.com/95a868946ac8a31e5ff832e2899f294aa368b836.png?w=128&h=128)。MCP 与企鹅使用已有本地素材，搜索与图像图标使用项目已有 Lucide。
- 关系图提供完整读屏描述；SVG 连线与重复图标不重复读出。手机保持七个节点及六条连接，不改成仅文字列表。

本轮验证：七个图标加载成功，六个渐变实际移动；六条曲线起点与各图标中心、终点与企鹅中心完全对齐，调整窗口后仍对齐。暂停后渐变坐标保持不变，继续后恢复；离屏停止移动，深浅主题均可读。减少动画时保留所有图标与静态连线，访问中关闭该偏好后恢复脉冲。首页及功能页均通过；390px、320px 手机没有横向溢出，触摸暂停正常。类型检查、Lint、生产构建与 `git diff --check` 通过，无应用或素材加载错误。

### Magic UI Marquee 技术与开源滚动带

放在首页功能区之后、宣传图之前，展示三条方向交错的滚动带：

- App 技术栈：Kotlin、Jetpack Compose、Room、Ktor、Coil、Koin；依据 Android 依赖配置。
- 官网技术栈：Next.js、React、TypeScript、Tailwind CSS、Three.js、GSAP；依据官网已使用代码。
- 开源与参考：React Bits、Magic UI、MikePenz Markdown、MathJax、MCP Kotlin SDK；说明各自在网站或 App 中的实际用途，不宣称未经证实的项目借鉴关系。

采用 [Magic UI Marquee 源码](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/marquee.tsx)的重复副本与匀速 CSS 平移机制。已核对官方安装命令 `bunx shadcn@latest add @magicui/marquee` 和注册表源码；直接接入现有 `cn`、React 与 CSS，不新增依赖。

- `components/ui/Marquee.tsx`：本地循环滚动组件，保留反向与悬停暂停。
- `components/sections/TechEcosystem.tsx`：三组实际技术、官方链接及总暂停按钮。
- `public/tech-logos/`：17 个本地官方标识素材；卡片左侧统一 40px，右侧为名称与说明。彩色标识保留官方原色，不加灰度滤镜；只有黑色单色标识在深色主题反转。React 独立 SVG 明确使用官网 `text-brand` 色值 `#087EA4`，Tailwind 使用官网 `fill-sky-400` 的青色 `#00BCFF`，GSAP 使用官网品牌绿 `#0AE448`；不新增图标依赖，不请求外部图片服务。
- `app/page.tsx`：把该区块放到功能区和宣传图区之间。
- `app/globals.css`：无缝循环、两侧渐隐、深浅主题、键盘聚焦暂停和手机布局。
- 关系图复用同一套 Logo 样式，Gemini 与 Claude 也恢复素材原色；官方单色标识仍保留主题反转。
- 正常模式下支持总暂停、悬停暂停、键盘聚焦暂停；重复副本不进入 Tab 或读屏顺序，但仍可鼠标点击。
- 减少动画模式停用滚动、隐藏重复副本，原始卡片换行显示，避免项目被截断。

Marquee 本轮验证：类型检查、Lint、构建通过；浏览器验证了滚动方向、悬停/聚焦/按钮暂停、17 个原始项目的键盘访问、手机无溢出、浅色主题与减少动画静态换行。

#### 官方标识来源（2026-10-09）

Room 使用 Android 官方 Jetpack 标识；MikePenz Markdown 使用该项目官方示例应用图标，MCP Kotlin SDK 使用 MCP 官方协议标识。其余素材为项目官网或官方仓库的品牌图标。GSAP 官网页首将 G 与 SAP 拆开播放动画，本地合并其四条原始路径为可独立加载的 SVG。

| 本地文件（位于 `public/tech-logos/`） | 官方来源 |
| --- | --- |
| kotlin.svg | [Kotlin 官网](https://kotlinlang.org/images/favicon/favicon.svg) |
| compose.svg | [Android 官方 Compose 标识](https://developer.android.google.cn/static/images/spot-icons/jetpack-compose.svg) |
| room.svg | [Android 官方 Jetpack 标识](https://developer.android.google.cn/static/images/spot-icons/jetpack.svg) |
| ktor.png | [Ktor 官网](https://ktor.io/icons/icon-192x192.png) |
| coil.svg | [Coil 官方仓库](https://github.com/coil-kt/coil/blob/main/docs/images/coil_logo_black.svg) |
| koin.png | [Koin 官网](https://insert-koin.io/img/koin_new_logo.png) |
| nextjs.ico | [Next.js 官网](https://nextjs.org/favicon.ico) |
| react.svg | [React 官网导航内嵌 SVG](https://react.dev/) |
| typescript.png | [TypeScript 官网](https://www.typescriptlang.org/icons/icon-192x192.png) |
| tailwind.svg | [Tailwind CSS 官网](https://tailwindcss.com/favicons/safari-pinned-tab.svg?v=4) |
| threejs.ico | [Three.js 官网](https://threejs.org/files/favicon.ico) |
| gsap.svg | [GSAP 官网页首内嵌 SVG](https://gsap.com/) |
| react-bits.svg | [React Bits 官方仓库](https://github.com/DavidHDev/react-bits/blob/main/src/assets/logos/react-bits-logo-small-black.svg) |
| magic-ui.svg | [Magic UI 官方仓库](https://github.com/magicuidesign/magicui/blob/main/apps/www/app/icon.svg) |
| markdown.png | [MikePenz Markdown 官方示例应用](https://github.com/mikepenz/multiplatform-markdown-renderer/blob/develop/sample/ios/iosApp/Assets.xcassets/AppIcon.appiconset/app-icon-1024.png) |
| mathjax.png | [MathJax 官方 GitHub 组织标识](https://github.com/mathjax) |
| mcp.svg | [MCP 官方仓库](https://github.com/modelcontextprotocol/docs/blob/main/favicon.svg) |

Logo 更新验证：17 个原始条目及 68 个循环图标全部加载成功，尺寸统一且文字没有溢出；深浅主题、滚动暂停与恢复、副本键盘访问规则、390px 手机布局和减少动画静态换行通过。类型检查、Lint、生产构建与 `git diff --check` 通过；未出现应用或图片资源错误。

彩色更新验证：浏览器读取 17 种 Logo 的实际图片像素，确认 11 种主要彩色品牌素材保留颜色且没有改色滤镜；GSAP 正常加载。深浅主题切换、滚动暂停与恢复、390px 手机布局和减少动画模式通过，无应用 JavaScript 错误。`bun run typecheck`、`bun run lint`、`bun run build` 通过；生产构建仍保留原有 Tailwind 配置模块格式提示，不影响产物。该次技术栈图标更新未涉及首屏企鹅，后续七彩更新见“三维像素企鹅”小节，尚未部署。

### Magic UI Dock 浮动导航

桌面和手机统一使用顶部液态玻璃 Dock，包含品牌、首页、功能、技术、体验、下载和源码六个入口，以及太阳与中英文按钮。桌面为单排；700px 及以下在同一个玻璃容器内分两排，上排品牌与设置，下排六个图标，保持 44px 点击区域。320px 屏幕也能完整显示；原底部导航和页脚额外占位已移除。

来源：[Magic UI Dock 源码](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/dock.tsx)。沿用原组件的鼠标距离映射和弹簧放大算法，把 `motion/react` 改为项目已有的 `framer-motion`；原组件的静态样式直接使用现有 CSS，不额外引入 Motion 或 class-variance-authority。

- `components/ui/Dock.tsx`：将共享鼠标位置传给图标，并按距离平滑放大。
- `components/layout/Header.tsx`：合并品牌、真实区块入口、标签提示、GitHub 源码、主题和语言按钮；已删除旧 `FloatingDock.tsx`。
- `app/layout.tsx`：全站加载顶部导航和语言状态，子页面也可以返回首页指定区块。
- `app/globals.css`：顶部玻璃浮层、向下显示的悬停/键盘提示、手机两排与固定尺寸。
- 键盘可以直接操作链接，聚焦时显示名称与焦点边框。
- 减少动画时停止图标放大，保持 44px 的固定点击区域。
- 使用视口坐标 `clientX`，与图标的 `getBoundingClientRect()` 坐标一致。
- 许可沿用本文的 Magic UI MIT 许可全文。
- 区块入口使用原生锚点，修复子页面返回首页时路由更新地址但没有定位的问题；首次从法律页返回展示区已验证定位到顶部导航下方。
- Dock 原有验证：桌面图标距离放大、离开复原、键盘提示、六个入口、子页面跳转、页脚留白、浅色主题及访问中切换减少动画均通过。手机导航更新的结果见下方。
- 新增组件与布局修改已通过类型检查、Lint 和生产构建。

### Glass Surface 液态玻璃

- 来源：[React Bits Glass Surface](https://reactbits.dev/components/glass-surface) 与[官方 TypeScript 源码](https://github.com/DavidHDev/react-bits/blob/main/src/ts-default/Components/GlassSurface/GlassSurface.tsx)。已核对注册表 `https://reactbits.dev/r/GlassSurface-TS-CSS.json`，CLI 可通过 `bunx shadcn@latest add https://reactbits.dev/r/GlassSurface-TS-CSS.json` 获取；无额外依赖，本地直接适配源码。
- 桌面和手机的顶部 Dock 使用液态玻璃外壳；玻璃单独放在底层，品牌、图标、链接和键盘提示位于外层，不受折射或圆角裁剪影响。手机使用同一个玻璃容器内的两排布局。
- 保留官方 SVG 位移图、RGB 分通道折射和合成算法，三通道使用相同位移，关闭彩色边缘，沿用黑白主题。
- Dock 放大时由 ResizeObserver 更新位移图尺寸，每帧最多一次；使用最新参数，卸载时断开监听并取消待执行回调。各实例使用独立滤镜 ID，不发生重复引用。
- 沿用官方支持判断：支持 SVG 背景滤镜时显示折射；Safari / Firefox 进入 CSS 磨砂回退。回退颜色读取网站实际主题；完全不支持背景滤镜时使用实色底，保留内容和导航。
- `components/ui/GlassSurface.tsx`：官方 SVG 玻璃效果、尺寸更新、实例 ID 和浏览器回退。
- `components/layout/Header.tsx`：桌面与手机共用的装饰玻璃外壳。
- `app/globals.css`：银黑色边缘、阴影、内容层级、文字对比度与兼容样式。源码许可沿用本文末尾的 React Bits 许可全文。
- 验证：类型检查、Lint、生产构建通过。Chromium 下以开启/关闭滤镜的截图差异确认实际折射生效；Dock 放大后的映射尺寸、鼠标/键盘标签、导航和跨页面锚点均通过。深浅主题和实例 ID 唯一性通过，无横向溢出或 JavaScript 错误。Safari UA 模拟验证了磨砂回退与手动主题；此项是兼容分支模拟，并非 Safari 引擎测试。生产 CSS 已检查保留标准模糊回退属性。

## 主题交互

初次进入跟随 `prefers-color-scheme`，未手动选择时继续响应系统主题变动。顶部主题入口为一个太阳图标，旁边是独立语言按钮；通过当前语言的 `aria-label` 与提示文字说明将切换的主题。新主题从按钮中心圆形扩散，默认持续 400ms。手动选择保存在本地。首次绘制前读取主题，减少闪屏。浏览器禁止本地存储时，本次访问仍可切换主题。

采用 [Magic UI Animated Theme Toggler 源码](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/animated-theme-toggler.tsx)的圆形揭示算法，已读取官方注册表 `https://magicui.design/r/animated-theme-toggler.json`。复用现有 React、React DOM、Lucide 和 `cn`，不新增依赖；MIT 许可全文见本文末尾。

- `components/ui/AnimatedThemeToggler.tsx`：从按钮中心计算覆盖视口的圆，使用百分比坐标适配 Windows 显示缩放；通过 View Transitions 和 `flushSync` 在快照回调内同步切换主题。
- `components/ui/ThemeProvider.tsx`：统一管理实际主题、系统监听与本地记忆，并在快照回调内更新 DOM 和 React 状态。
- `app/globals.css`：只在主题过渡期间关闭默认淡入淡出，控制快照层级和圆形裁剪；动画结束或失败后清理临时状态。

动画期间忽略重复点击，避免过渡竞争。浏览器不支持 View Transitions，或开启“减少动画”时，直接切换主题；快照或动画失败时结束过渡，保留已应用的主题。

原有浏览器验证涵盖双向圆形扩散、圆心与按钮位置一致、百分比关键帧、连续点击保护、过渡状态清理、刷新记忆、系统跟随、减少动画及 API 缺失回退。单太阳按钮与全屏幕 Dock 的最新结果见下方。

单太阳更新验收：桌面顶部只有一个无文字的太阳按钮，双向主题切换动画、系统自动识别、键盘操作和刷新记忆通过；减少动画和 View Transition API 缺失时可以直接切换。390px 与 320px 手机上的六个底部玻璃入口完整显示，点击区域均为 44px，主题切换、区块定位和页脚留白通过，无横向溢出。修正手机页脚留白被后续通用 `padding` 覆盖的问题。类型检查、Lint、生产构建和 `git diff --check` 通过，未发现 JavaScript 或 shader 错误。

## 已接入素材

素材来自 `C:/Users/33039/Desktop/ET宣传图`，原文件未修改，复制到官网公开资源目录。

| 原文件                                | 网站文件                       | 内容            |
| ------------------------------------- | ------------------------------ | --------------- |
| Codex 图像 2026年8月10日 22_53_27.png | /showcase/models.png           | 模型切换与参数  |
| Codex 图像 2026年8月10日 22_53_54.png | /showcase/conversations.png    | 会话管理        |
| Codex 图像 2026年8月10日 22_54_13.png | /showcase/markdown.png         | Markdown 与公式 |
| Codex 图像 2026年8月10日 22_54_21.png | /showcase/tools.png            | 附件、联网、MCP |
| EveryTalk*03*图像生成\_1080x1920.png  | /showcase/image-generation.png | 图像生成        |

导航、页脚、网页图标和三维采样均已使用新 Logo 本地文件，不依赖用户提供的远程图片服务。透明生成版本作为现有素材保留，当前页面不使用它。

## 下一轮需要你补充的素材

现有宣传图足以完成这一版，但真实 App 画面更能说明产品。按优先级准备：

1. **聊天界面**：一个完整问题及回答，含代码或公式；深色、浅色各一张。
2. **模型配置**：模型选择及参数界面，隐去 API 密钥、私有服务地址。
3. **联网搜索 / MCP**：工具调用中与完成后的界面，保留引用或工具结果。
4. **图像生成**：输入提示词与生成结果，最好是一套完整过程。
5. **会话管理**：分组、置顶或切换会话的实际界面。

最有用的录屏（每段 8–15 秒）：

- 输入问题 → 流式回答 → 代码 / 公式完成排版。
- 发出查询 → 联网搜索或 MCP 调用 → 展示结果。
- 输入描述 → 图像生成 → 查看大图。

优先原始竖屏 PNG、MP4，尽量保持 1080 像素宽度，无需再套宣传边框。GIF 可用，但 MP4 体积和清晰度通常更合适。所有私人会话、密钥、账号和个人资料先遮盖。没有录屏不阻塞本轮。

## 内容与维护

- Android 最低版本标注为 **8.1+**，依据 App 的 `minSdk = 27`。
- 未展示写死的用户评分、Stars、Forks，也未保留“军事级加密”等无证据表述。
- 模型、工具及生成能力依赖用户配置的服务；第三方服务费用不等于客户端费用。
- GitHub 下载指向真实 Releases 入口；下载页版本接口有超时、异常与空列表回退。
- 旧手机场景、自定义光标与旧背景已从活动页面移除；未为本次视觉改造清理无关依赖或用户的历史改动。
- 开发：在官网目录运行 `bun run dev -- --hostname 127.0.0.1 --port 43187`。
- 检查：`npm run typecheck`、`npm run lint`、`npm run build`。
- 本地预览：[http://127.0.0.1:43187](http://127.0.0.1:43187)。

## 文件职责

以下路径均相对于官网工程 `C:/Users/33039/Desktop/KunK/Evt`。

| 文件                                                             | 职责                                         |
| ---------------------------------------------------------------- | -------------------------------------------- |
| app/page.tsx                                                     | 串联单页的首屏、能力、宣传图与下载区         |
| app/layout.tsx                                                   | 全站主题入口、背景、导航、元信息与新 Logo    |
| app/globals.css                                                  | 黑白样式、响应式布局与减少动画规则           |
| app/features/page.tsx                                            | 复用能力与产品展示，保留功能页地址           |
| app/download/page.tsx                                            | 复用下载区并显示版本记录                     |
| app/privacy-policy/page.tsx、app/terms-of-service/page.tsx       | 接入法律页主题样式，正文不变                 |
| components/layout/Header.tsx                                     | 品牌、六个入口、主题与语言的顶部玻璃 Dock   |
| components/layout/Footer.tsx                                     | 真实项目链接、法律页面与开源协议入口         |
| components/sections/Hero.tsx                                     | 首屏标题、下载入口与品牌视觉布局             |
| components/sections/Features.tsx                                 | 四组有依据的能力说明                         |
| components/sections/ModelConnections.tsx                         | 模型、企鹅与应用能力的七节点关系图           |
| components/ui/AnimatedBeam.tsx                                  | Magic UI 曲线、流动脉冲与暂停控制            |
| components/sections/Showcase.tsx                                 | 五张宣传图切换与展开展示                     |
| components/sections/Download.tsx                                 | 下载入口、安装与首次使用步骤                 |
| components/sections/VersionHistory.tsx                           | GitHub 版本加载、超时与异常回退              |
| components/3d/Atmosphere.tsx                                     | 延迟加载背景，避免服务端执行 WebGL           |
| components/3d/PixelSnow.tsx、components/3d/pixel-snow-shaders.ts | Pixel Snow 渲染适配与原始 shader             |
| components/3d/PixelPenguin.tsx                                   | 原始 Logo 的固定三维采样、揭幕轨迹与波纹     |
| components/3d/dither-veil-shaders.ts                             | Dither Veil 官方遮罩、Bayer 抖色与透明输入适配 |
| components/ui/ThemeProvider.tsx                                  | 主题管理、系统监听、选择记忆与切换按钮       |
| components/ui/LanguageProvider.tsx、lib/translations.ts           | 双语状态、记忆、页面标题、服务器页面文案桥接与英文词典 |
| components/ui/AnimatedThemeToggler.tsx                           | Magic UI 圆形扩散主题切换与兼容回退         |
| components/ui/GlassSurface.tsx                                  | Dock 的 SVG 玻璃折射和磨砂回退              |
| components/ui/HoloCard.tsx、components/ui/holo-card-shaders.ts    | React Bits 截图光箔卡片、倾斜与图片回退     |
| components/3d/ElasticMesh.tsx、components/3d/elastic-mesh-physics.ts、components/3d/elastic-mesh-shaders.ts | 下载区弹性网格、物理计算和主题渲染 |
| components/3d/elastic-mesh-physics.test.ts                        | Bun 可运行的网格物理自检                   |
| components/ui/ScrollExpand.tsx、components/ui/ScrollReveal.tsx   | 宣传区展开与标题滚动显现                     |
| components/ui/SmoothScroll.tsx                                  | Lenis 桌面滚轮缓动、锚点偏移和减少动画清理   |
| package.json、package-lock.json                                  | Lenis 依赖版本与现有依赖锁定                 |
| public/showcase/\*.png、public/everytalk-logo-source.png         | 本地宣传素材与新 Logo                        |
| next.config.js                                                   | 禁用预览时自动生成额外 AGENTS 文件           |
| README.md、BLACK_WHITE_REDESIGN.md                               | 更新官网特性、设计、源码来源、验收与素材要求 |

## 本轮验收结果

- 类型检查、ESLint、生产构建通过。
- 桌面 1440×960、手机 390×844 的页面和导航通过浏览器验证，未发现横向溢出。
- 系统深浅主题切换、手动选择与刷新后记忆通过；右上角现仅保留太阳按钮。
- 宣传图五项切换已验证；企鹅更新为 Dither Veil 局部揭幕和点击波纹，验证结果见下方。
- Dither Veil 更新已通过实际 WebGL 帧读取与浏览器交互检查：深浅主题下悬停露出三维原画，离开后轨迹消退，鼠标点击与键盘按钮产生扩散波纹；交互期间没有重新上传实例位置，未出现 shader 或 JavaScript 错误。
- 动态切换减少动画偏好后，按钮禁用且两次截图一致；恢复偏好后重新启用。离屏期间绘制帧数不增长；WebGL 不可用与上下文丢失均恢复静态 Logo。
- 手机 390×844 下无横向溢出，触摸纵向滑动和揭幕按钮通过；保留双指缩放。
- 减少动画模式下，企鹅两次像素截图一致；标题完整可见、展开面板没有裁剪。
- 首页、功能、下载、隐私政策、服务条款均可访问；模拟 GitHub 403 后正确出现版本备用入口。
- 未发现应用 JavaScript 或 WebGL shader 错误；故意注入的 403 资源报错为回退测试预期。
- `git diff --check` 通过。生产构建保留原有 Tailwind 配置的模块格式提示，不影响构建产物。
- 尚未部署、提交或推送；后续真实截图和录屏清单见上文。

## React Bits 许可全文

以下文本随本地采用或改编的 React Bits 代码保留。来源：[LICENSE.md](https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md)，于 2026-10-09 核对。

MIT + Commons Clause License Condition v1.0

Copyright (c) 2026 David Haz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, and distribute the Software **as part of an application, website, or product**, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

### Commons Clause Restriction

You may use this Software, including for any commercial purpose, **so long as you do not sell, sublicense, or redistribute the components themselves-whether alone, in a bundle, or as a ported version.**

### No Warranty

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Magic UI 许可全文

来源：https://github.com/magicuidesign/magicui/blob/main/LICENSE.md

MIT License

Copyright (c) Magic UI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
