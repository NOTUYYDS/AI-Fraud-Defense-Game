class InvestmentScamLevel {
    static init() {
        const container = document.getElementById('level-container');
        container.innerHTML = `
            <div class="investment-ui">
                <h2>💼 高報酬投資平台分析</h2>
                <div class="red-flags">
                    <div class="flag" data-type="return-rate">
                        <img src="assets/images/ui/高報酬率.png">
                        <p>宣稱月報酬率 300%</p>
                    </div>
                    <div class="flag" data-type="fake-review">
                        <img src="assets/images/ui/假評價.png">
                        <p>假用戶評價</p>
                    </div>
                </div>
                <button class="report-btn">🚩 檢舉此平台</button>
            </div>
        `;

        // 詐騙要素互動
        document.querySelectorAll('.flag').forEach(flag => {
            flag.addEventListener('click', () => {
                flag.classList.add('exposed');
                GameState.score += 30;
                this.updateScore();
            });
        });

        // 檢舉按鈕
        document.querySelector('.report-btn').addEventListener('click', () => {
            if (document.querySelectorAll('.exposed').length >= 2) {
                GameState.score += 100;
                GameState.loadLevel(4); // 進入第四關
            } else {
                this.showWarning('⚠️ 請先找出至少兩個可疑點！');
            }
        });
    }

    static updateScore() {
        document.getElementById('score-display').textContent = `分數：${GameState.score}`;
    }

    static showWarning(message) {
        const warning = document.createElement('div');
        warning.className = 'warning-message';
        warning.textContent = message;
        document.body.appendChild(warning);
        setTimeout(() => warning.remove(), 2000);
    }
}
