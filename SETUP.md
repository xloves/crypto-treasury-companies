# 🚀 快速部署指南

## 📋 项目概述

这是一个监控囤币公司市值和MNAV溢价的现代化网站，具有以下特点：
- 🌌 炫酷的宇宙极光背景
- 📊 实时显示公司数据和排名
- 🔄 GitHub Action自动化部署
- 📱 完全响应式设计

## 🎯 一步步部署指南

### 步骤1: 创建GitHub仓库

1. 登录GitHub
2. 点击 "New repository"
3. 仓库名建议: `crypto-treasury-companies`
4. 设为Public（必须，否则GitHub Pages无法使用）
5. 点击 "Create repository"

### 步骤2: 上传项目文件

#### 方法A: 使用Git命令行
```bash
# 在你的项目目录下
git init
git add .
git commit -m "Initial commit: Crypto Treasury Companies Monitor"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/crypto-treasury-companies.git
git push -u origin main
```

#### 方法B: 直接在GitHub网页上传
1. 点击仓库页面的 "uploading an existing file"
2. 拖拽所有项目文件到页面
3. 写提交信息，点击 "Commit new files"

### 步骤3: 配置GitHub Pages

#### 基本配置
1. 在仓库页面点击 `Settings`
2. 左侧菜单找到 `Pages`
3. 在 "Source" 部分选择 `GitHub Actions` ⚠️ **重要：不要选择 "Deploy from a branch"**
4. 点击 `Save`

#### 首次部署启动
配置完成后需要手动触发首次部署：

**方法1: GitHub网站手动触发（推荐）**
1. 进入仓库的 `Actions` 标签页
2. 左侧找到 `Deploy Crypto Treasury Website` 工作流
3. 点击右侧的 `Run workflow` 下拉按钮
4. 点击绿色的 `Run workflow` 按钮
5. 等待部署完成（通常2-3分钟）

**方法2: 通过代码更改触发**
```bash
# 对任意文件做小修改并推送
echo "# Trigger deployment" >> README.md
git add README.md
git commit -m "Trigger initial GitHub Pages deployment"
git push
```

#### 常见问题解决

**❌ 错误: "Get Pages site failed. Please verify that the repository has Pages enabled"**

解决步骤：
1. **检查仓库可见性**
   - 仓库必须是 `Public`（免费GitHub账户要求）
   - 仓库名下方不应有 🔒 图标

2. **确认Actions权限**
   - `Settings` → `Actions` → `General`
   - 选择 "Allow all actions and reusable workflows"

3. **验证Pages配置**
   - `Settings` → `Pages` → Source 必须是 `GitHub Actions`
   - 不能是 "Deploy from a branch"

4. **检查工作流权限**
   - 确认 `.github/workflows/deploy.yml` 中包含：
   ```yaml
   permissions:
     contents: read
     pages: write
     id-token: write
   ```

**❌ 错误: "HttpError: Not Found"**

这通常表示Pages还未完全激活，解决方法：
1. 等待5-10分钟后重试
2. 手动触发一次GitHub Actions工作流
3. 检查仓库URL是否正确

#### 部署状态监控
- 📊 **监控地址**: `https://github.com/YOUR_USERNAME/crypto-treasury-companies/actions`
- 🌐 **网站地址**: `https://YOUR_USERNAME.github.io/crypto-treasury-companies`
- ⏰ **部署时间**: 通常2-3分钟完成

### 步骤4: 更新配置文件

编辑 `package.json`，替换 YOUR_USERNAME：
```json
{
  "repository": {
    "url": "https://github.com/YOUR_USERNAME/crypto-treasury-companies.git"
  },
  "homepage": "https://YOUR_USERNAME.github.io/crypto-treasury-companies"
}
```

编辑 `README.md`，替换所有的 YOUR_USERNAME。

### 步骤5: 本地预览测试

在部署前，建议先本地测试：

```bash
# 智能预览（推荐）
npm run preview

# 或简单预览
npm run preview:simple
```

预览功能特点：
- ✅ 自动检查文件完整性
- 🌐 自动打开浏览器
- 📊 使用真实CSV数据
- ⚡ 快速启动服务器

### 步骤6: 启动部署

按照步骤3中的"首次部署启动"说明操作即可。部署完成后：

1. 访问你的网站：`https://YOUR_USERNAME.github.io/crypto-treasury-companies`
2. 在 `Actions` 页面确认部署成功（绿色勾号）
3. 如遇问题，参考步骤3中的"常见问题解决"部分

## 📊 更新数据

### 自动更新流程
当你上传新的 `db/MNAV.csv` 文件时：

1. **推送文件到GitHub**
   ```bash
   git add db/MNAV.csv
   git commit -m "Update MNAV data"
   git push
   ```

2. **自动触发GitHub Action**
   - 检测到CSV文件变化
   - 自动验证数据格式
   - 构建和部署网站

3. **网站自动更新**
   - 1-2分钟内完成部署
   - 访问你的GitHub Pages网址看到更新

### CSV文件格式说明

确保你的 `db/MNAV.csv` 文件遵循以下格式：

```
行2: ,BTC价格,,ETH价格,,SOL价格,,
行8: Ticker,MSTR,SBET,BMNR,GLXY,BTBT,BTCS,GAME,
行9: Stock Price,股价1,股价2,股价3,...
行10: Market Value(billion),市值1,市值2,市值3,...
行11: Shares Outstanding,股数1,股数2,股数3,...
行12: BTC Holding,BTC1,BTC2,BTC3,...
行13: ETH Holding,ETH1,ETH2,ETH3,...
行14: SOL Holding,SOL1,SOL2,SOL3,...
行15: Net Asset Value(billion),NAV1,NAV2,NAV3,...
行16: MNAV,MNAV1,MNAV2,MNAV3,...
```

## 🔧 常见问题

### Q: GitHub Action失败了怎么办？
A:
1. 检查Actions页面的错误日志
2. 确保CSV文件格式正确
3. 确认仓库是Public
4. 重新推送代码触发部署

### Q: 出现"Get Pages site failed"或"HttpError: Not Found"错误？
A:
这是GitHub Pages配置问题，解决方法：
1. 确保 `Settings` → `Pages` → Source 选择的是 `GitHub Actions`
2. 仓库必须是Public（免费账户要求）
3. 在 `Settings` → `Actions` → `General` 中允许所有Actions
4. 手动触发一次工作流：`Actions` → `Run workflow`
5. 等待5-10分钟让Pages完全激活
详细解决方案请参考步骤3中的"常见问题解决"部分。

### Q: 网站显示"正在加载数据"不变？
A:
1. 检查CSV文件是否正确上传到 `db/MNAV.csv`
2. 打开浏览器开发者工具查看网络请求
3. 确认GitHub Pages已启用

### Q: 想添加新的公司怎么办？
A:
1. 在CSV文件中添加新公司数据
2. 在 `script.js` 的 `getCompanyNationality()` 函数中添加国籍信息
3. 推送更改到GitHub

### Q: 想修改网站样式？
A:
1. 编辑 `index.html` 中的CSS样式
2. 修改 `script.js` 中的显示逻辑
3. 推送更改自动部署

## 🌟 高级配置

### 自定义域名（可选）
1. 在仓库根目录创建 `CNAME` 文件
2. 文件内容写入你的域名：`yourdomain.com`
3. 在域名DNS设置中添加CNAME记录指向 `YOUR_USERNAME.github.io`

### 监控更多指标
可以在CSV文件中添加更多列，然后修改JavaScript代码显示这些数据。

### 定时自动更新
可以设置GitHub Action定时运行，自动获取最新数据（需要API集成）。

## 📞 获得帮助

如果遇到问题：
1. 查看GitHub Action的运行日志
2. 检查浏览器开发者控制台
3. 在项目仓库创建Issue求助
4. 参考README.md中的详细说明

---

🎉 **恭喜！** 现在你有了一个专业的囤币公司监控网站！
