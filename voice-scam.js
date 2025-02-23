class VoiceScamLevel {
    static init() {
        const container = document.getElementById('level-container');
        container.innerHTML = `
            <div class="phone-scene">
                <img src="assets/images/characters/詐騙狐狸.png" class="villain">
                <div class="dialog-bubble">
                    <p>📞「嘿！同學！我是阿牛教授啦～你的學分有點小問題，需要你『立刻』轉帳處理一下喔！不然可能會被當掉唷～😏」</p>
                    <div class="options">
                        <button data-choice="1">🤔 嗯...先驗證一下身份吧！</button>
                        <button data-choice="2">🚨 這絕對是詐騙！掛斷並報警！</button>
                    </div>
                </div>
            </div>
        `;

        document.querySelectorAll('[data-choice]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                GameState.playSound('click-sfx');
                const choice = e.target.dataset.choice;
                this.handleChoice(choice);
            });
        });
    }

    static handleChoice(choice) {
        if(choice === '2') {
            GameState.score += 100;
            GameState.loadLevel(2);
            alert("🎉 太棒了！你成功識破了詐騙！分數 +100！");
        } else {
            this.showDamageEffect();
        }
    }

    static showDamageEffect() {
        const container = document.getElementById('level-container');
        container.innerHTML = `
            <div class="damage-effect">
                <img src="assets/images/ui/money_loss.png">
                <p>💸 哎呀！你被騙走了新台幣 30,000 元！下次要更小心喔～</p>
            </div>
        `;
        setTimeout(() => {
            alert("😅 沒關係！再試一次吧！");
            GameState.loadLevel(1);
        }, 2000);
    }
}

