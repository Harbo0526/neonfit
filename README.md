# HarboFit · 运动打卡（可托管版）

纯静态单页应用，赛博朋克霓虹风格，数据存于浏览器 localStorage，支持 PWA 离线安装。

## 文件说明
- `index.html` —— 主程序（HTML/CSS/JS 全内联，单文件离线可用）
- `sw.js` —— Service Worker，负责离线缓存（PWA 安装后生效）
- `404.html` —— GitHub Pages 兜底页，避免刷新子路径 404

## 部署到 GitHub Pages（傻瓜式）

### 第一步：注册 GitHub 账号
1. 打开 https://github.com/signup 注册（免费）。
2. 验证邮箱。

### 第二步：新建仓库
1. 登录后点右上角 **+ → New repository**。
2. Repository name 填：`neonfit`（或任意英文名，将决定网址）。
3. 选 **Public**（私有仓库的 Pages 旧版收费，公开免费）。
4. 不要勾选 "Add a README"（我们已经有了），直接 **Create repository**。

### 第三步：上传文件
**方式 A（最简单，网页拖拽）：**
1. 进入刚建的仓库，点 **Add file → Upload files**。
2. 把本文件夹里的 `index.html`、`sw.js`、`404.html` 三个文件拖进去。
3. 页面底部填提交说明如 `init`，点 **Commit changes**。

> 注意：只传这三个文件即可，`sw.js` 和 `index.html` 必须在同一目录（仓库根目录）。

### 第四步：开启 Pages
1. 仓库顶部进入 **Settings → Pages**（左侧边栏）。
2. Source 选 **Deploy from a branch**。
3. Branch 选 **main**（或 master，看你上传后默认分支名），目录选 **/ (root)**。
4. 点 **Save**。

### 第五步：访问
等待约 1 分钟，访问：
```
https://<你的用户名>.github.io/neonfit/
```
（把 `<你的用户名>` 换成你的 GitHub 账号名）

第一次可能显示 "404" 或需刷新一次，等一两分钟再开即可。

## 手机使用建议
1. 手机浏览器打开上面的网址 → 菜单 → **"添加到主屏幕"**，获得类 App 图标入口。
2. **数据存于手机浏览器 localStorage**，清缓存会丢 → 养成「导出 JSON」备份习惯（历史记录页有按钮）。
3. 部署到 HTTPS 后，PWA 安装横幅会自动出现，可离线打开。

## 本地预览（电脑）
无需服务器也可直接双击 `index.html` 用浏览器打开（`file://` 下 PWA 不生效，但功能正常）。

## 重新部署 / 更新
改完文件后，回到仓库 **Add file → Upload files** 覆盖同名文件并 Commit，GitHub Pages 会自动更新（约 1 分钟生效）。

---

### 从 GitHub 一键部署到 Vercel / Netlify（海外，国内一般可直连）
若你已推到 GitHub，可免重复上传：
- **Vercel**：用 GitHub 登录 https://vercel.com → New Project → 选你的 `neonfit` 仓库 → Deploy。网址 `https://neonfit-xxx.vercel.app`，国内通常可直连。
- **Netlify**：https://app.netlify.com → Add new site → Import from GitHub → 选仓库 → Deploy。网址 `https://xxx.netlify.app`。

两者都自动从 GitHub 拉取，后续 push 即自动更新。

## 平台选择小结
| 平台 | 国内手机直连 | 自动更新 | 备注 |
|---|---|---|---|
| GitHub Pages | ⚠️ 有时慢/需代理 | ✅ | 前端托管 + 云端存储后端（本方案） |
| Gitee Pages | ❌ 已实质暂停 | — | 不推荐，新仓库基本无法开启 |
| Vercel / Netlify | ⚠️ 一般可直连 | ✅ | 仅作前端托管，数据仍写 GitHub 仓库 |

---

## 多用户 + GitHub 云端存储（≤20 人熟人圈方案）

本版已内置「账号密码登录 / 注册」，**每个用户在你的 GitHub 仓库里自动生成独立文件 `data/<用户名>.json`**，数据彼此隔离、不怕清缓存丢失。GitHub API 国内一般可直连，无需额外翻墙。

### 工作原理
- 用户首次输入用户名+密码 → 自动在仓库 `data/` 下建 `<用户名>.json`（含哈希密码+打卡/体重/类型/目标）
- 之后登录 → 从云端拉取自己的数据；每次打卡 → 本地缓存 + 异步写回云端
- 离线也能用（本地缓存），联网自动同步

### 部署前必做：填写 CONFIG
打开 `index.html`，找到顶部 `CONFIG` 对象：
```js
const CONFIG={
  owner:'Harbo0526',       // 你的 GitHub 账号名
  repo:'neonfit',          // 仓库名
  branch:'main'            // 若仓库默认分支是 master，改成 'master'
};
```
> **重要：仓库令牌不再写进代码。** 改为用户登录时在「仓库令牌」框里填写自己的 GitHub 私人令牌（classic 或 fine-grained 均可，权限需勾 `repo` 完整仓库读写）。令牌只存在用户浏览器 localStorage，不会进代码、也不会进公开仓库，因此不会被 GitHub 密钥扫描拦截。
>
> 这样设计的好处：代码可自由提交到公开仓库，无需担心令牌泄露；谁用谁填自己的令牌即可。

### 仓库准备
1. 仓库需含 `index.html`、`sw.js`、`404.html`（根目录）。
2. 首次有人注册后，代码会自动创建 `data/` 目录和对应文件，**你无需手动建**。
3. 前端页面用 **GitHub Pages** 托管（见上文），其自带 HTTPS，PWA 可正常生效。

### 安全说明（路径3 已知取舍）
- token 明文写在 `index.html` 前端代码里，**任何查看源码的人都能拿到**。
- 因此本方案仅适合**熟人小圈（≤20 人）**，且用户间靠"用户名文件隔离"而非强鉴权。
- 不要把这个网址公开给陌生人；若需严格隔离，请改用 LeanCloud/Supabase 等真后端。
- 密码为前端简单哈希（非加密级），请勿使用重要密码。

### 更新网站后
- 改完 `index.html` 推送到 GitHub → GitHub Pages 会自动更新（约 1 分钟生效）。
- 用户数据在 `data/*.json`，不受页面更新影响。
