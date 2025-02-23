class GameState {
    static currentLevel = 1;
    static score = 0;
    static soundCache = {}; // 音效快取

static init() {
    // 初始化背景音樂
    this.playBGM();

    // 綁定開始按鈕
    document.getElementById('start-btn').addEventListener('click', () => {
        this.playSound('click-sfx');
        this.loadLevel(1);
    });

    // 監聽「下一關」按鈕
    document.addEventListener('click', function(event) {
        if (event.target && event.target.id === 'next-btn') {
            GameState.playSound('click-sfx');
            GameState.loadLevel(GameState.currentLevel + 1);
        }
    });
}

    // 播放音效
    static playSound(soundId) {
        if (!this.soundCache[soundId]) {
            const sound = new Audio(`assets/sounds/${soundId}.mp3`);
            this.soundCache[soundId] = sound;
        }
        const sound = this.soundCache[soundId];
        sound.currentTime = 0;
        sound.play().catch(error => {
            console.error(`音效 ${soundId} 播放失敗:`, error);
        });
    }

    // 載入關卡
    static loadLevel(levelId) {
        this.currentLevel = levelId;
        this.clearLevelContainer();

        // 隱藏標題畫面
        document.getElementById('title-screen').classList.remove('active');

        // 根據關卡 ID 載入對應關卡
        switch (levelId) {
            case 1:
                VoiceScamLevel.init();
                break;
            case 2:
                DeepfakeLevel.init();
                break;
            case 3:
                InvestmentScamLevel.init();
                break;
            case 4:
                TextScamLevel.init();
                break;
            default:
                this.showEnding();
        }
    }

    // 清除關卡容器
    static clearLevelContainer() {
        const container = document.getElementById('level-container');
        container.innerHTML = '';
    }

    // 顯示遊戲結束畫面
    static showEnding() {
        const container = document.getElementById('level-container');
        container.innerHTML = `
            <div class="ending-screen">
                <h2>${this.getEndingTitle()}</h2>
                <img src="${this.getEndingImage()}" alt="遊戲結束角色" class="ending-character">
                <div class="ending-text">
                    <p>${this.getEndingText()}</p>
                    <p>你的分數：${this.score} 分</p>
                </div>
                <button onclick="location.reload()" class="pixel-button">再玩一次</button>
            </div>
        `;
    }

    // 根據分數取得結局標題
    static getEndingTitle() {
        if (this.score >= 400) return '🎉 防詐天才鴨';
        if (this.score >= 300) return '🛡️ 安全守護者';
        return '⚠️ 需要加強警戒';
    }

    // 根據分數取得結局圖片
    static getEndingImage() {
        return this.score >= 300 ?
            'assets/images/characters/呱呱_開心.png' :
            'assets/images/characters/呱呱_受傷.png';
    }

    // 根據分數取得結局文字
    static getEndingText() {
        if (this.score >= 400) return '你簡直是鴨界福爾摩斯！所有陷阱都逃不過你的法眼！';
        if (this.score >= 300) return '厲害厲害！校園防詐就靠你守護啦～';
        return '哎呀～要多提高警覺才行啊！';
    }
}

// 初始化遊戲
GameState.init();

