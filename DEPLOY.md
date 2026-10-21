# 部署：GitHub + Cloudflare Pages

站点是纯静态页面，视频不存放在站内。

- 构建产物约 **7–8MB**（主要是 Hero 视频和图片）
- 作品集通过 **百度网盘** 外部链接查看
- 不需要服务器、数据库、对象存储或视频流量
- 推荐流程：GitHub 仓库 → Cloudflare Pages 自动构建

## 1. 上传到 GitHub

在 `D:\Harness\portfolio` 下执行：

```bash
git init -b main
git add -A
git commit -m "Initial portfolio site"
```

在 GitHub 新建一个空仓库（不要勾选 README / .gitignore / License），例如：

```text
zhaoyusen-portfolio
```

然后关联并推送：

```bash
git remote add origin https://github.com/你的用户名/zhaoyusen-portfolio.git
git push -u origin main
```

推送时按提示登录 GitHub。仓库可以是 Public，也可以是 Private；Cloudflare Pages 授权后都能读取。

## 2. Cloudflare Pages 设置

1. 登录 Cloudflare Dashboard
2. Workers & Pages → Create → Pages → Connect to Git
3. 选择 GitHub 仓库 `zhaoyusen-portfolio`
4. 构建设置：

```text
Framework preset: Vite
Build command: pnpm build
Build output directory: dist
Root directory: /
```

5. 环境变量：

```text
NODE_VERSION=20
```

如果 Cloudflare 构建环境对 pnpm 版本识别异常，再加：

```text
PNPM_VERSION=10
```

6. 点击 Save and Deploy

之后每次向 `main` 推送，Cloudflare Pages 会自动重新构建。

## 3. 自定义域名

1. 进入 Pages 项目 → Custom domains
2. 添加域名，例如 `zhaoyusen.com`
3. 按提示把 DNS 指向 Cloudflare
4. HTTPS 证书自动签发

## 构建

本地确认：

```bash
pnpm install --frozen-lockfile
pnpm build
```

产物目录：`dist/`

## 站内已配置

- [public/_redirects](public/_redirects)：SPA 回退到 `index.html`
- 作品集入口打开后展示百度网盘按钮
- 链接：`https://pan.baidu.com/s/1dI8dZjWDdl4iGtHvQSXxbQ?pwd=1234`
- 提取码：`1234`
- 链接使用 `target="_blank"`，一键打开百度网盘

## 上线检查

- 首页正常加载
- 开场剪辑界面动画完整播放
- Hero 视频正常播放
- 点击「展开完整作品集」→ 过渡动画 → 出现百度网盘按钮
- 点击「打开百度网盘」能在新标签页打开分享页
- 关闭片库后页面滚动正常
- 手机端菜单、项目、片库、联系方式正常

## 注意

- 百度网盘链接和提取码写在 `src/data/site.js` 的 `site.archive` 中，后续换链接只改这一处
- 如果百度网盘分享失效，页面上的按钮仍会跳转，需要及时更新链接
- 作品视频的公开分享权限由百度网盘侧控制
- 邮箱 `exle@qq.com` 和微信 `zyssy2` 会公开展示
