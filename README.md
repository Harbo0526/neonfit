# NEON FIT · 运动打卡（可托管版）

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
