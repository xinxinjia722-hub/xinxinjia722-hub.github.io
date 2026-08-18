# XIN'S SPACE GitHub 上传说明

## 需要上传的内容

上传本项目根目录中的以下内容：

- `src/`
- `public/`
- `index.html`
- `package.json`
- `pnpm-lock.yaml`
- `pnpm-workspace.yaml`
- `vite.config.js`
- `.gitignore`
- `.gitattributes`

不要上传：

- `node_modules/`
- `dist/`
- 原始资料文件夹 `作品集codex/`

## GitHub 文件限制

以下媒体文件较大，GitHub 网页上传容易超过限制，其中 LOG 03 已超过 GitHub 普通仓库的 100MB 单文件限制：

- `public/media/diary/log-03-ai-culture.m4v`，约 134MB
- `public/media/diary/log-05-quit-loop.mp4`，约 41MB
- `public/media/audio/xin-space.flac`，约 27MB

这些文件建议统一使用 Git LFS。

要保留这个视频，需要安装 Git LFS 后执行：

```bash
git lfs install
git lfs track "public/media/diary/log-03-ai-culture.m4v"
git lfs track "public/media/diary/log-05-quit-loop.mp4"
git lfs track "public/media/audio/xin-space.flac"
git add .gitattributes public/media/diary public/media/audio
git commit -m "Track large diary video with Git LFS"
git push
```

如果暂时不需要 LOG 03 视频，可以先压缩到 100MB 以下，再上传到 GitHub。

## Vercel 配置

在 Vercel 导入 GitHub 仓库后使用：

- Framework Preset: `Vite`
- Build Command: `pnpm run build`
- Output Directory: `dist`
