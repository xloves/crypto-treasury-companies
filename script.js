// 解析CSV数据并渲染表格
class CryptoCompanyTracker {
    constructor() {
        this.companies = [];
        this.cryptoPrices = {};
        this.init();
    }

    async init() {
        try {
            await this.loadCSVData();
            this.renderCryptoPrices();
            this.renderCompanyTable();
            this.updateLastUpdateTime();
        } catch (error) {
            console.error('初始化失败:', error);
            this.showError('数据加载失败，请稍后重试');
        }
    }

    async loadCSVData() {
        try {
            const response = await fetch('./db/MNAV.csv');
            const csvText = await response.text();
            this.parseCSV(csvText);
        } catch (error) {
            throw new Error('无法加载CSV文件: ' + error.message);
        }
    }

    parseCSV(csvText) {
        const lines = csvText.split('\n').map(line => line.split(','));

        // 解析加密货币价格 (第2-3行)
        this.cryptoPrices = {
            BTC: parseFloat(lines[2][1]) || 117927,
            ETH: parseFloat(lines[2][3]) || 3758.5
        };

        // 解析公司数据 (从第7行开始，跳过第一列的标题)
        const tickers = lines[6].slice(1).filter(cell => cell.trim() !== '');
        const stockPrices = lines[7].slice(1).filter(cell => cell.trim() !== '');
        const marketValues = lines[8].slice(1).filter(cell => cell.trim() !== '');

        // 流通股数据需要特殊处理，因为CSV中的引号和逗号导致分割
        const rawSharesLine = lines[9].slice(1).join(','); // 重新组合
        const sharesOutstanding = this.parseSharesLine(rawSharesLine);

        const btcHoldings = lines[10].slice(1).filter(cell => cell.trim() !== '');
        const ethHoldings = lines[11].slice(1).filter(cell => cell.trim() !== '');
        const navValues = lines[13].slice(1).filter(cell => cell.trim() !== '');
        const mnavValues = lines[14].slice(1).filter(cell => cell.trim() !== '');

                // 构建公司数据数组
        this.companies = [];
        for (let i = 0; i < tickers.length; i++) {
            if (tickers[i] && tickers[i].trim() !== '') {
                const company = {
                    ticker: tickers[i].trim(),
                    stockPrice: parseFloat(stockPrices[i]) || 0,
                    marketValue: parseFloat(marketValues[i]) || 0,
                    sharesOutstanding: parseFloat(sharesOutstanding[i]) || 0,
                    btcHolding: this.parseNumber(btcHoldings[i]) || 0,
                    ethHolding: this.parseNumber(ethHoldings[i]) || 0,
                    nav: parseFloat(navValues[i]) || 0,
                    mnav: parseFloat(mnavValues[i]) || 0
                };

                                this.companies.push(company);
            }
        }

        // 按市值排序（从大到小）
        this.companies.sort((a, b) => b.marketValue - a.marketValue);
    }

    parseNumber(str) {
        if (!str) return 0;
        // 移除引号和逗号，然后转换为数字
        return parseFloat(str.replace(/[",]/g, '')) || 0;
    }

    parseSharesLine(rawLine) {
        // 解析流通股数据行，处理引号和逗号分割的问题
        // 原始数据类似：'"281,903,000","89,223,200","80,220,200",...'
        const shares = [];
        const regex = /"([^"]+)"/g;
        let match;

        while ((match = regex.exec(rawLine)) !== null) {
            const shareValue = match[1].replace(/,/g, ''); // 移除逗号
            shares.push(shareValue);
        }

        return shares;
    }



    renderCryptoPrices() {
        document.getElementById('btc-price').textContent = this.formatNumber(this.cryptoPrices.BTC);
        document.getElementById('eth-price').textContent = this.formatNumber(this.cryptoPrices.ETH);
    }

        renderCompanyTable() {
        // 先渲染表头（公司名称）
        this.renderTableHeaders();

        // 然后渲染数据行
        const tbody = document.getElementById('company-data');
        tbody.innerHTML = '';

        // 定义行数据
        const rows = [
            {
                label: '市值 (B)',
                className: 'market-value-row bg-green-900 bg-opacity-30 border-green-500 border-opacity-30',
                isHighlight: true,
                getValue: (company) => `${this.formatBillion(company.marketValue)}B`,
                getStyle: () => 'text-3xl font-bold text-green-400 orbitron'
            },
            {
                label: 'MNAV倍率',
                className: 'mnav-row bg-blue-900 bg-opacity-30 border-blue-500 border-opacity-30',
                isHighlight: true,
                getValue: (company) => `${company.mnav.toFixed(2)}x`,
                getStyle: (company) => `text-3xl font-bold orbitron ${this.getMNAVColor(company.mnav)}`
            },
            {
                label: '股价 ($)',
                className: 'table-row',
                isHighlight: false,
                getValue: (company) => `$${this.formatNumber(company.stockPrice)}`,
                getStyle: () => 'orbitron font-semibold'
            },
            {
                label: 'NAV (B)',
                className: 'table-row',
                isHighlight: false,
                getValue: (company) => `${this.formatBillion(company.nav)}B`,
                getStyle: () => 'orbitron font-semibold'
            },
            {
                label: 'BTC持仓',
                className: 'table-row',
                isHighlight: false,
                getValue: (company) => company.btcHolding > 0 ?
                    `<div class="flex items-center justify-center">
                        <i class="fab fa-bitcoin text-orange-400 mr-2"></i>
                        <span class="orbitron">${this.formatNumber(company.btcHolding)}</span>
                    </div>` :
                    '<span class="text-gray-500">-</span>',
                getStyle: () => ''
            },
            {
                label: 'ETH持仓',
                className: 'table-row',
                isHighlight: false,
                getValue: (company) => company.ethHolding > 0 ?
                    `<div class="flex items-center justify-center">
                        <i class="fab fa-ethereum text-blue-400 mr-2"></i>
                        <span class="orbitron">${this.formatNumber(company.ethHolding)}</span>
                    </div>` :
                    '<span class="text-gray-500">-</span>',
                getStyle: () => ''
            },
            {
                label: '流通股数',
                className: 'table-row',
                isHighlight: false,
                getValue: (company) => company.sharesOutstanding.toLocaleString(),
                getStyle: () => 'orbitron text-sm'
            }
        ];

        // 生成每一行
        rows.forEach(rowConfig => {
            const row = document.createElement('tr');
            row.className = rowConfig.className;

            // 第一列：指标名称
            let firstCellHTML = `
                <td class="p-4 font-semibold text-gray-300 bg-gray-800 bg-opacity-50">
                    ${rowConfig.label}
                </td>
            `;

            // 其他列：公司数据
            this.companies.forEach((company, index) => {
                const value = rowConfig.getValue(company);
                const style = rowConfig.getStyle ? rowConfig.getStyle(company) : '';

                firstCellHTML += `
                    <td class="p-4 text-center ${style}">
                        ${value}
                    </td>
                `;
            });

            row.innerHTML = firstCellHTML;
            tbody.appendChild(row);
        });
    }

    renderTableHeaders() {
        const headerRow = document.querySelector('thead tr');

        // 清除现有的公司列标题
        const existingHeaders = headerRow.querySelectorAll('th:not(:first-child)');
        existingHeaders.forEach(header => header.remove());

        // 添加公司列标题
        this.companies.forEach((company, index) => {
            const th = document.createElement('th');
            th.className = 'p-4 text-center min-w-32';

            // 为前三名添加特殊样式
            let rankIcon = '';
            if (index === 0) rankIcon = '🥇';
            else if (index === 1) rankIcon = '🥈';
            else if (index === 2) rankIcon = '🥉';

            th.innerHTML = `
                <div class="flex items-center justify-center">
                    <span class="text-2xl mr-2">${rankIcon}</span>
                    <span class="font-bold text-lg orbitron text-white">${company.ticker}</span>
                </div>
            `;

            headerRow.appendChild(th);
        });
    }

    getMNAVColor(mnav) {
        if (mnav >= 3) return 'text-red-400';
        if (mnav >= 2) return 'text-yellow-400';
        return 'text-green-400';
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toLocaleString();
    }

    formatBillion(num) {
        return num.toFixed(2);
    }

    updateLastUpdateTime() {
        const now = new Date();
        const timeString = now.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        document.getElementById('last-update').textContent = timeString;
    }

    showError(message) {
        const tbody = document.getElementById('company-data');
        tbody.innerHTML = `
            <tr>
                <td colspan="8" class="text-center p-8 text-red-400">
                    <i class="fas fa-exclamation-triangle mr-2"></i>
                    ${message}
                </td>
            </tr>
        `;
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new CryptoCompanyTracker();
});

// 添加一些交互效果
document.addEventListener('DOMContentLoaded', () => {
    // 添加滚动视差效果
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const aurora = document.querySelector('.aurora');
        const spaceBg = document.querySelector('.space-bg');

        if (aurora) {
            aurora.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        if (spaceBg) {
            spaceBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

        // 添加表格行/列点击效果
    document.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        const cell = e.target.closest('td');

        if (row && cell) {
            // 移除其他行的高亮
            document.querySelectorAll('tr').forEach(r => {
                r.classList.remove('border-yellow-500', 'bg-yellow-900', 'bg-opacity-20');
            });

            // 高亮当前行
            row.classList.add('border-yellow-500', 'bg-yellow-900', 'bg-opacity-20');

            // 3秒后移除高亮
            setTimeout(() => {
                row.classList.remove('border-yellow-500', 'bg-yellow-900', 'bg-opacity-20');
            }, 3000);
        }
    });
});
