# EveryTalk 官网：像素企鹅与黑白动效设计

> 更新：2026-10-09。正式版已上线 https://www.everytalk.cc/；本轮居中首屏、Depth Text、放大的左侧企鹅、镜面分类按钮、形变切图、Fluid Glass 顶栏与性能优化已在本地完成，尚未发布。
> 官网工程：`C:/Users/33039/Desktop/KunK/Evt`。
> 本文替代之前的静态黑白方案，以最新的像素交互需求为准。

## 正式上线记录

- 正式部署：`dpl_56LLWmTTReyQyT4WnTSkLnhQd6FL`，Vercel 项目 `kkkunzs-projects/evt`，状态 READY。
- 发布代码：本地提交 `a78f48a`，未推送 GitHub；云端构建通过后已执行 promote。
- 线上验收：首页、功能、下载、隐私政策、服务条款均返回 200；中英文实时切换、刷新与跨页记忆、深浅主题切换均通过。
- 320px 手机视口下两种语言均无横向溢出；顶部玻璃 Dock 正常，底部 Dock 已移除；本次浏览器检查未发现脚本错误或 HTTP 资源错误，部署错误日志查询为空。
- 下文各轮验收中“尚未部署”描述当时的本地状态，当前上线状态以本节为准。

## 设计方向

官网面向希望在 Android 上自由连接模型、使用搜索与多模态能力的用户。页面首先说明产品，再引导下载。首屏以居中的标题为重点；三维像素企鹅放在标题左侧，作为可交互的品牌标记，不改变文案中轴，也不再为它单独撑高页面。

黑色主视觉、白色信息层、灰度边框与克制留白。浅色模式反转背景与信息颜色。首屏三维像素企鹅的待机像素幕保持灰白，鼠标揭幕后显示红、橙、黄、绿、青、蓝、紫的七彩渐变；技术栈滚动区的 Logo 保留各项目官方品牌色，作为局部彩色点缀；单色标识根据主题反转。用户宣传图在页面内以灰度显示，完整原图入口保留原始颜色。

| 层级     | 深色    | 浅色    |
| -------- | ------- | ------- |
| 页面     | #000000 | #FFFFFF |
| 主要内容 | #FFFFFF | #111111 |
| 次要文字 | #A3A3A3 | #646464 |
| 展示表面 | #0C0C0C | #F6F6F6 |
| 分隔线   | #292929 | #DEDEDE |

中文展示标题改用基于「得意黑」v2.0.1 精简的窄斜几何黑体，衍生字体命名为 EveryTalk Display；英文展示标题保留 Caveat。正文使用 Noto Sans SC，英文品牌和技术标签使用 Space Grotesk，功能标签保留系统等宽字体。展示字体只保留当前需要的字形，两份 WOFF2 合计 50,592 字节，位于 `public/fonts/` 并随官网托管，许可证同时保留。旧行书字体已移除。正文与品牌字体继续由现有 `next/font` 在构建时下载并自托管，不新增项目依赖。

## 页面结构

```text
顶部液态玻璃：EveryTalk. / 首页 功能 技术 体验 下载 源码 / 太阳 EN
────────────────────────────────────────────────────────────────
左侧像素企鹅      让对话，自由发生.（几何黑体、Depth Text、一行居中）
                  说明 / 胶囊下载与源码按钮 / 产品信息
像素揭幕
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

### 本轮首屏与流畅度优化

- `components/sections/Hero.tsx`、`app/globals.css`、`lib/translations.ts`：取消标题和说明的强制换行；文案始终居中。首屏下载与源码按钮使用同高度圆角胶囊、白色主按钮与描边次按钮，仅用已有 Lucide 图标和 CSS，不影响下载区的按钮。企鹅现位于实际标题左侧，画布中心与标题中心对齐；桌面画布最大 320×248，相比上一轮 260×200 再放大约 23%，平板随可用空间缩小。手机画布为 128×114，位于标题上方的左侧，与右侧眉题共享区域。位置依靠现有 CSS，延迟加载不改变文案中轴；同步 `PixelPenguin.tsx` 的回退图尺寸声明。1440×960 首屏仍为 760px，320px 手机约 633px，不再在文案下方留整排企鹅空间。
- `components/3d/PixelPenguin.tsx`：取消待机持续旋转，缓存真实三维纹理，只有模型、尺寸与主题变化时重画模型；鼠标笔刷与波纹复用纹理。静止时不绘制，轨迹完全恢复后停止循环。
- `components/3d/PixelSnow.tsx`：保持原组件的着色器，绘制尺寸限制在 480×320 以内；1440×960 视口实测由 936×624 降为 480×320，绘制像素量降低约 74%。这是绘制工作量的变化，不等同于真实设备帧率提升比例。
- `components/sections/Showcase.tsx`、`public/showcase/*.webp`：展示改用 800px 宽 WebP，五张预览分别约 31–60 KB，比原 PNG 缩小约 96–98%；查看完整图仍打开原 PNG。原图未覆盖。`components/ui/HoloCard.tsx` 将光箔画布像素倍率限制为 1.5。
- `components/ui/GlassSurface.tsx`、`components/ui/SmoothScroll.tsx`：触摸设备复用已有磨砂玻璃回退、使用原生滚动；桌面保留折射和 Lenis。系统偏好变化时及时切换并清理监听。
- `components/ui/ScrollReveal.tsx`：英文按词渐显，保留词内手写字形连接；去掉逐字模糊动画，继续使用透明度、位移和滚动缓动。
- 字体来源：[得意黑 v2.0.1](https://github.com/atelier-anchor/smiley-sans/releases/tag/v2.0.1) 与 Google Fonts 的 [Caveat](https://fonts.google.com/specimen/Caveat)。`public/fonts/everytalk-display.woff2` 仅 10,808 字节；精简通过临时 FontTools 工具环境完成，没有向项目添加依赖。衍生字体的内部家族与 PostScript 名称已改为 EveryTalk Display，避免使用原字体保留名称。对应 `*-OFL.txt` 保留各自的 SIL Open Font License 1.1 全文。新增标题需要同步精简字体的字形集合。
- 验证：Lint、类型检查、生产构建、diff 检查通过；生产预览实测企鹅待机每秒 0 次绘制，悬停出现彩色、离开恢复灰白。中英文展示字体正常加载；两种语言各检查 320、390、700、768、1024、1440、1920px 七种宽度，页面无溢出、文案中轴居中、按钮文字单行且同高度、企鹅与标题和按钮无重叠。两种主题、触摸设备玻璃回退和原生滚动、减少动画、五张预览图和原图入口、跨页锚点均通过。下载锚点在桌面页面末尾按最大可滚动距离定位，保持下载区可见且不被顶栏遮挡；手机对齐 144px。未发现应用脚本或本站 HTTP 资源错误。
- 左侧放大调整单独验收：Lint、类型检查、diff 检查与下方自检通过。开发预览检查两种语言各七种宽度，标题保持居中、企鹅位于左侧、画布中心与桌面标题中心对齐，未遮挡标题或按钮；手机眉题位于企鹅右侧。深浅主题截图已核对。企鹅截图彩色像素计数为待机 0、悬停 1594、离开恢复后 0，待机仍停止绘制。本次仅调整布局，未重新发布。

下面的 PowerShell 自检复用已有 Playwright，可在 43187 本地预览运行，检查本次绘制边界和待机停绘，不创建测试文件：

```powershell
@'
const assert = require('node:assert/strict');
const { chromium } = require('C:/Users/33039/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({ headless: true, args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
    await page.addInitScript(() => {
      const proto = WebGL2RenderingContext.prototype;
      for (const name of ['drawArrays', 'drawElements', 'drawArraysInstanced', 'drawElementsInstanced']) {
        const original = proto[name];
        proto[name] = function (...args) {
          this.canvas.dataset.draws = String(Number(this.canvas.dataset.draws || 0) + 1);
          return original.apply(this, args);
        };
      }
    });
    await page.goto('http://127.0.0.1:43187/', { waitUntil: 'networkidle' });
    await page.waitForFunction(() => document.querySelector('.penguin-canvas')?.dataset.ready === 'true');
    assert.equal(await page.locator('#hero-title br').count(), 0);
    await page.evaluate(() => document.fonts.ready);
    assert(await page.evaluate(() => document.fonts.check('400 100px "EveryTalk Display"')));
    assert(await page.evaluate(() => {
      const copy = document.querySelector('.hero-copy').getBoundingClientRect();
      const title = document.querySelector('#hero-title').getBoundingClientRect();
      const mark = document.querySelector('.hero-visual').getBoundingClientRect();
      const penguin = document.querySelector('.penguin-canvas').getBoundingClientRect();
      const buttons = [...document.querySelectorAll('.hero-cta')].map(button => button.getBoundingClientRect());
      return Math.abs(copy.left + copy.width / 2 - innerWidth / 2) < 1 &&
        mark.right <= title.left - 12 && mark.left >= 0 &&
        Math.abs(penguin.top + penguin.height / 2 - title.top - title.height / 2) < 1 &&
        buttons.every(button => button.height >= 44) &&
        Math.abs(buttons[0].height - buttons[1].height) < 1;
    }));
    const size = await page.locator('.pixel-snow canvas').evaluate(canvas => [canvas.width, canvas.height]);
    assert(size[0] <= 480 && size[1] <= 320);
    const canvas = page.locator('.penguin-canvas canvas');
    // 初始排版可能经过浏览器默认指针位置；移出画布并等待轨迹收敛后检查待机。
    await page.mouse.move(1, 1);
    await page.waitForTimeout(2200);
    const before = await canvas.getAttribute('data-draws');
    await page.waitForTimeout(1000);
    assert.equal(await canvas.getAttribute('data-draws'), before);
    assert.equal((await page.request.get('http://127.0.0.1:43187/showcase/models.webp')).status(), 200);
    console.log('PASS: centered heading, snow pixel budget, idle penguin and compressed preview');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
'@ | node
```

公共产品区块采用随视口伸展的容器，去掉原来的 1280px 宽度上限。桌面两侧总间距为 `clamp(64px, 6vw, 160px)`：1920px 屏幕每侧约 58px，2560px 屏幕每侧约 77px。1050px 及以下仍保持每侧 32px，700px 及以下每侧 20px；法律正文保留适合阅读的原有宽度。页头独立为最大 1000px 的顶部玻璃 Dock，不沿用正文宽度。

宽屏更新验证：浏览器测量 320–3440px 的 11 种视口宽度，确认公共区块对齐、边距符合上述规则、页面无横向溢出且 Dock 完整可见。已核对深浅主题截图，功能页与下载页在 390px、1920px 下无溢出；无应用 JavaScript 错误。`bun run build` 与 `git diff --check` 通过。

### 镜面分类按钮、形变切图与首屏厚度文字

- 已读取官方 [Specular Button 注册表](https://reactbits.dev/r/SpecularButton-TS-CSS.json)、[Morph Slider 注册表](https://reactbits.dev/r/MorphSlider-TS-CSS.json)、[Depth Text 注册表](https://reactbits.dev/r/DepthText-TS-CSS.json)及完整源码。官方 CLI 可通过 `bunx shadcn@latest add https://reactbits.dev/r/SpecularButton-TS-CSS.json` 获取按钮，其它两项使用对应注册表地址；按钮和滑块原版依赖 OGL，滑块还依赖 GSAP。本站已具备 Three.js 与 GSAP，因此直接适配原 GLSL 和算法，没有新增依赖，也没有自动安装 CLI 或生成无关文件。
- `components/ui/SpecularButton.tsx`：沿用 [Specular Button](https://reactbits.dev/components/specular-button) 的圆角 SDF、对称边缘高光、指针角度与指数缓动。只替换圈出的五个分类按钮。按悬停或键盘焦点创建画布，鼠标移开并收敛后停绘；静态边框、选中状态、44px 以上触摸区域与键盘焦点始终保留。颜色跟随黑白主题。
- `components/ui/MorphSlider.tsx`、`components/ui/morph-slider-shaders.ts`：使用 [Morph Slider](https://reactbits.dev/components/morph-slider) 的官方 melt 形变算法，0.85 秒缓入缓出。分类、前后箭头、键盘左右键和横向滑动共用当前索引；支持直接跳到五项中的任意一项。连续选择时保留最后一次目标并等待当前形变完成。只在切换期间绘制；五张压缩纹理接近视口时加载，像素倍率上限 1.25，关闭自动播放、待机漂移与彩色色散。
- `components/sections/Showcase.tsx`：形变层在过渡期间覆盖已有 HoloCard，结束后恢复光箔卡片；原 PNG 完整图入口保留。文字使用已有 Framer Motion 淡入和短距离位移。减少动画、纹理加载失败或 WebGL 不可用时依然能查看和切换静态图片；手机纵向手势继续滚动页面。
- `components/ui/DepthText.tsx`、`components/sections/Hero.tsx`：[Depth Text](https://reactbits.dev/text-animations/depth-text) 只用于首屏主标题。沿用官方多层挤出、二次颜色混合与指针倾斜，用 20 层黑白灰形成厚度；中文几何字体与英文 Caveat 保留。关闭自动环绕，已有 GSAP 在指针停止后结束缓动；触摸设备保持静态角度，减少动画时取消倾斜。装饰层对读屏隐藏，标题不会被重复朗读。
- `app/globals.css`、`components/3d/PixelPenguin.tsx`：企鹅继续位于标题左侧，桌面最大 320×248、手机 128×114；同步回退图尺寸。待机灰白、悬停七彩、离开恢复与停绘逻辑保持。
- 验证：Lint、类型检查、生产构建与 diff 检查通过。中英文各检查 320、390、700、768、1024、1051、1200、1440、1920px，无横向溢出、企鹅与标题及操作按钮无重叠。实际浏览器已验证形变着色器绘制、直接跳转、连续选择、键盘循环、文案与原图链接同步、动态减少动画以及按钮和滑块闲置停绘；模拟真实触摸序列验证了横向滑动切图与纵向原生滚动。WebGL 上下文丢失后静态图片仍可切换。深色中文桌面和手机、浅色英文桌面截图已核对；未出现应用脚本或着色器错误。尚未提交、推送或部署。

下面的自检复用工作机已有 Playwright，检查真实形变与连续切换，不创建测试文件：

```powershell
@'
const assert = require('node:assert/strict');
const { chromium } = require('C:/Users/33039/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({ headless: true, args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 960 }, colorScheme: 'dark' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    await page.addInitScript(() => {
      const proto = WebGL2RenderingContext.prototype;
      for (const name of ['drawArrays', 'drawElements', 'drawArraysInstanced', 'drawElementsInstanced']) {
        const original = proto[name];
        proto[name] = function (...args) {
          this.canvas.dataset.draws = String(Number(this.canvas.dataset.draws || 0) + 1);
          return original.apply(this, args);
        };
      }
    });
    await page.goto('http://127.0.0.1:43187/', { waitUntil: 'networkidle' });
    assert.equal(await page.locator('.depth-text__layer').count(), 20);
    assert.equal(await page.getByRole('heading', { name: '让对话，自由发生.', exact: true }).count(), 1);
    const stage = page.locator('.depth-text__stage');
    const beforeTilt = await stage.evaluate(element => getComputedStyle(element).transform);
    await page.locator('.depth-text').hover({ position: { x: 30, y: 30 } });
    await page.waitForTimeout(600);
    assert.notEqual(await stage.evaluate(element => getComputedStyle(element).transform), beforeTilt);
    await page.locator('.showcase-panel').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1400);
    const tabs = page.locator('.showcase-tabs button');
    await tabs.nth(1).click();
    await page.waitForTimeout(250);
    assert.equal(await page.locator('.morph-slider').getAttribute('data-transitioning'), 'true');
    await page.waitForTimeout(1000);
    await tabs.nth(4).click();
    await tabs.nth(2).click();
    await tabs.nth(3).click();
    await page.waitForTimeout(2000);
    assert.equal(await tabs.nth(3).getAttribute('aria-pressed'), 'true');
    assert.match(await page.locator('.showcase-story').innerText(), /工具能力/);
    assert.match(await page.locator('.morph-slider img').getAttribute('src'), /tools/);
    assert.equal(await page.locator('.morph-slider').getAttribute('data-transitioning'), null);
    await page.mouse.move(1, 1);
    await page.waitForTimeout(1700);
    const counts = () => page.locator('.specular-button canvas, .morph-slider-canvas').evaluateAll(canvases => canvases.map(canvas => canvas.dataset.draws || '0'));
    const before = await counts();
    await page.waitForTimeout(600);
    assert.deepEqual(await counts(), before);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await tabs.nth(2).click();
    await page.waitForTimeout(400);
    assert.equal(await page.locator('.morph-slider').getAttribute('data-transitioning'), null);
    assert.match(await page.locator('.showcase-story a').getAttribute('href'), /markdown.png/);
    assert.deepEqual(errors, []);
    console.log('PASS: accessible depth text, pointer tilt, melt transition, rapid selection, idle stop and reduced motion');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
'@ | node
```

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

### Fluid Glass 顶栏曲面

- 来源：[React Bits Fluid Glass](https://reactbits.dev/components/fluid-glass) 与[官方注册表](https://reactbits.dev/r/FluidGlass-TS-CSS.json)。官方示例使用 `three`、`@react-three/fiber`、`@react-three/drei` 和 `maath`；本站已有 Three.js、Fiber 和 Drei，直接复用现有依赖，没有增加新包。
- `components/ui/FluidGlass.tsx`：采用官方 Bar 模型、`MeshTransmissionMaterial` 透射材质、FBO 离屏缓冲、折射率、厚度和环境反射思路；演示页的远程图片、3D 导航文字和整页 ScrollControls 没有带入官网。棚灯环境在本地生成黑白 DataTexture，模型文件保存为 `public/fluid-glass-bar.glb`，不依赖外部资源。
- `components/layout/Header.tsx`：Fluid Glass 作为顶部 Dock 的三维曲面层，品牌、导航、太阳和语言按钮继续留在清晰的 HTML 层。`components/ui/GlassSurface.tsx` 继续折射真实页面背景，并改用镜片法线生成 R/G 位移图；原来的 Dock 隔离层和负 z-index 已移除，否则背景滤镜只能采样空容器，视觉上会退化成普通透明。
- `app/globals.css`：增加三维曲面容器、厚边高光、内侧反射和兼容回退；黑白主题不使用蓝紫或金色。桌面与手机均显示曲面轮廓；鼠标移动时反射方向缓动，离开后收敛停绘。减少动画、触摸设备、WebGL 不可用或上下文丢失时保留 SVG 液态玻璃和完整导航。
- 验证：桌面 1440px、手机 390px 实测模型 Canvas 和 SVG 折射层均存在；用高对比底纹对比开启/关闭滤镜，记录到 829 个像素变化，确认是实际背景折射，不是单纯透明底。指针反光能触发并停绘，深浅主题、导航焦点、锚点、语言切换、减少动画、手机触摸与 WebGL 上下文丢失回退通过。Lint、类型检查、生产构建和 diff 检查通过。尚未提交、推送或部署。

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
| components/layout/Header.tsx                                     | 品牌、六个入口、主题与语言的顶部玻璃 Dock；滚动时隐藏中间入口 |
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
| components/ui/SpecularButton.tsx                               | 展示分类的镜面边缘高光，交互结束停绘       |
| components/ui/MorphSlider.tsx、components/ui/morph-slider-shaders.ts | 官方形变切图、索引同步、键盘与触摸、静态回退 |
| components/ui/DepthText.tsx                                    | 首屏标题的黑白厚度层和按需指针倾斜         |
| components/3d/ElasticMesh.tsx、components/3d/elastic-mesh-physics.ts、components/3d/elastic-mesh-shaders.ts | 下载区弹性网格、物理计算和主题渲染 |
| components/3d/elastic-mesh-physics.test.ts                        | Bun 可运行的网格物理自检                   |
| components/ui/ScrollExpand.tsx、components/ui/ScrollReveal.tsx   | 宣传区展开与标题滚动显现                     |
| components/ui/SmoothScroll.tsx                                  | Lenis 桌面滚轮缓动、锚点偏移和减少动画清理   |
| lib/feature-details.ts                                           | 四项功能对应的真实 Android 源码片段与双语讲解 |
| components/ui/CodeBlock.tsx                                     | 行号、轻量语法高亮、复制按钮和源码可访问性   |
| components/sections/FeatureDetail.tsx、app/features/[slug]/page.tsx | 四个功能详情路由、顶部进入、历史位置返回与双语内容 |
| app/features/[slug]/loading.tsx                                  | 详情路由的源码加载动画                       |
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

## 功能源码详情页

功能区四张卡现在分别跳转到以下详情路由：

- `/features/multi-model`
- `/features/search-mcp`
- `/features/image-generation`
- `/features/read-organize`

详情页引用 Android 工程中的模型配置、MCP 配置、图像直连和会话持久化片段，提供行号、Kotlin 语法高亮、复制按钮和中英文讲解。源码块只展示必要片段，不包含 API 密钥或无关实现。

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
