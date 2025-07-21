# 🚀 Crypto Treasury Companies Monitor

[![Deploy Status](https://github.com/dnshi/crypto-treasury-companies/workflows/Deploy%20Crypto%20Treasury%20Website/badge.svg)](https://github.com/dnshi/crypto-treasury-companies/actions)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://dnshi.github.io/crypto-treasury-companies)

一个现代化的网站，实时监控囤币公司的市值、持仓和MNAV溢价倍率。具有炫酷的宇宙极光背景，类似Binance和欧艺的专业交易平台风格。

## ✨ 功能特点

- 🌌 **炫酷界面**: 宇宙星空背景 + 极光动画效果
- 📊 **实时数据**: 显示BTC、ETH、SOL价格和公司持仓
- 💰 **市值排名**: 按市值从大到小排序，突出显示前三名
- 🔢 **MNAV监控**: 实时计算市值净资产比率（溢价倍率）
- 🌍 **国籍标识**: 显示每家公司的国籍信息
- 📱 **响应式设计**: 完美适配桌面和移动设备
- 🔄 **自动更新**: GitHub Action自动部署，CSV更新即时生效

## 📈 数据展示

### 主要指标
- **市值 (Market Cap)**: 以十亿美元为单位，大字体显示
- **MNAV倍率**: 市值/净资产价值比率，颜色编码风险等级
  - 🟢 绿色 (< 2x): 相对合理
  - 🟡 黄色 (2-3x): 中等溢价
  - 🔴 红色 (> 3x): 高溢价风险

### 详细信息
- 股票代码和国籍
- 当前股价
- 净资产价值 (NAV)
- BTC/ETH持仓数量
- 流通股数

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone https://github.com/dnshi/crypto-treasury-companies.git
cd crypto-treasury-companies
```

### 2. 本地运行
```bash
# 智能预览（推荐）- 自动打开浏览器
npm run preview

# 普通启动（Node.js服务器）
npm start

# 简单预览（仅启动服务器）
npm run preview:simple

# 访问 http://localhost:8000 或 http://localhost:8080
```

**✨ 现在全部使用Node.js！** 不再需要Python环境，所有服务器都基于Node.js内置HTTP模块。

### 3. 部署到GitHub Pages

#### 步骤1: Fork或上传到你的GitHub仓库

#### 步骤2: 启用GitHub Pages
1. 进入仓库的 `Settings` → `Pages`
2. Source选择 `GitHub Actions`
3. 保存设置

#### 步骤3: 更新仓库信息
在 `package.json` 中修改：
```json
{
  "repository": {
    "url": "https://github.com/dnshi/crypto-treasury-companies.git"
  },
  "homepage": "https://dnshi.github.io/crypto-treasury-companies"
}
```

#### 步骤4: 自动部署
- 每当你更新 `db/MNAV.csv` 文件并推送到main分支
- GitHub Action会自动构建和部署网站
- 通常在1-2分钟内完成部署

## 🔍 预览功能

### 智能预览模式
使用 `npm run preview` 命令启动智能预览：

```bash
npm run preview
```

**功能特点：**
- 🔍 **自动检查**: 验证所有必需文件是否存在
- 🌐 **自动打开**: 2秒后自动在浏览器中打开网站
- 📊 **实时数据**: 使用本地CSV数据进行预览
- ⚡ **快速启动**: 基于Node.js的HTTP服务器，端口8080
- 🛑 **优雅退出**: Ctrl+C停止服务器
- 🚀 **零依赖**: 纯Node.js实现，无需Python环境

**预览输出示例：**
```
🚀 Starting Crypto Treasury Companies Preview...

✅ All required files found
📊 Data file: db/MNAV.csv
🌐 Preview URL: http://localhost:8080
📱 The website will automatically open in your browser

⚡ Starting Node.js HTTP server...
🎉 Preview server is running!
🌟 Visit: http://localhost:8080
⏹️  Press Ctrl+C to stop the server

✅ Served: / (text/html)
✅ Served: /script.js (application/javascript)
✅ Served: /db/MNAV.csv (text/csv)
🌐 Browser opened automatically
```

### 其他预览选项
```bash
# 简单预览（仅启动Node.js服务器，不自动打开浏览器）
npm run preview:simple

# 标准启动（Node.js服务器，端口8000）
npm start

# 检查项目文件完整性
npm run validate

# 查看所有可用命令
npm run help
```

## 📊 数据更新

### CSV文件格式
`db/MNAV.csv` 文件结构：
```csv
行号 | 内容
-----|-----
2    | BTC价格, ETH价格, SOL价格
8    | 公司股票代码 (MSTR, SBET, BMNR, GLXY, BTBT, BTCS, GAME)
9    | 股价
10   | 市值(十亿美元)
11   | 流通股数
12   | BTC持仓
13   | ETH持仓
14   | SOL持仓
15   | 净资产价值(十亿美元)
16   | MNAV倍率
```

### 更新数据
1. 修改 `db/MNAV.csv` 文件
2. 提交并推送到GitHub
3. 等待自动部署完成（约1-2分钟）
4. 网站自动更新显示新数据

## 🛠️ 技术栈

- **前端**: HTML5 + TailwindCSS + Vanilla JavaScript
- **后端**: Node.js 内置HTTP服务器（零依赖）
- **样式**: 自定义CSS动画（宇宙背景、极光效果）
- **字体**: Orbitron (科技感) + Roboto (可读性)
- **图标**: Font Awesome 6
- **部署**: GitHub Actions + GitHub Pages
- **数据**: CSV文件解析
- **开发**: 完全基于Node.js，无需Python环境

## 🎨 设计特色

### 视觉效果
- 🌌 动态星空背景
- 🌈 流动极光效果
- ✨ 发光卡片动画
- 🏆 排名奖牌显示
- 📊 渐变文字效果

### 交互体验
- 🖱️ 表格行悬停效果
- 👆 点击高亮选中
- 📱 滚动视差效果
- 🔄 平滑过渡动画

## 📋 支持的公司

当前监控的囤币公司：

| 代码 | 公司 | 国籍 | 主要持仓 |
|------|------|------|----------|
| MSTR | MicroStrategy | 🇺🇸 美国 | BTC |
| SBET | SharpLink Gaming | 🇺🇸 美国 | ETH |
| BMNR | BitMine Technologies | 🇺🇸 美国 | ETH |
| GLXY | Galaxy Digital | 🇨🇦 加拿大 | BTC |
| BTBT | Bit Digital | 🇺🇸 美国 | ETH |
| BTCS | BTCS Inc. | 🇺🇸 美国 | ETH |
| GAME | GameSquare Esports | 🇺🇸 美国 | ETH |

## 🔧 自定义配置

### 添加新公司
在 `script.js` 的 `getCompanyNationality()` 函数中添加：
```javascript
const nationalities = {
    'YOUR_TICKER': '🇺🇸 国家名',
    // ... 其他公司
};
```

### 修改样式
- 主题颜色：修改CSS中的颜色变量
- 动画效果：调整@keyframes动画参数
- 字体大小：修改TailwindCSS类名

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📞 联系方式

如有问题或建议，请通过GitHub Issues联系。

---

⭐ 如果这个项目对你有帮助，请给个星标支持！
