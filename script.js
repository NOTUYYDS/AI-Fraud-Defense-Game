class GameState {
    static currentLevel = 1;
    static score = 0;

    static init() {
        // 播放背景音樂
        const bgm = document.getElementById('bgm');
        bgm.volume = 0.3;
        bgm.play();

        // 綁定開始按鈕
        document.getElementById('start-btn').addEventListener('click', () => {
            this.playSound('click-sfx');
            this.loadLevel(1);
        });
    }

    static playSound(soundId) {
        const sound = document.getElementById(soundId);
        sound.currentTime = 0;
        sound.play();
    }

    static loadLevel(levelId) {
        document.getElementById('title-screen').classList.remove('active');
        const container = document.getElementById('level-container');
        container.innerHTML = '';
        
        switch(levelId) {
            case 1: VoiceScamLevel.init(); break;
            case 2: DeepfakeLevel.init(); break;
            case 3: InvestmentScamLevel.init(); break;
            case 4: TextScamLevel.init(); break;
            default: this.showEnding();
        }
    }

    static showEnding() {
        const container = document.getElementById('level-container');
        container.innerHTML = `
            <div class="ending-screen">
                <h2>${this.getEndingTitle()}</h2>
                <img src="${this.getEndingImage()}" class="ending-character">
                <div class="ending-text">${this.getEndingText()}</div>
                <button onclick="location.reload()">再玩一次</button>
            </div>
        `;
    }

    static getEndingTitle() {
        if(this.score >= 400) return '🎉 防詐天才鴨';
        if(this.score >= 300) return '🛡️ 安全守護者';
        return '⚠️ 需要加強警戒';
    }

    static getEndingImage() {
        return this.score >= 300 ? 
            'assets/images/characters/呱呱_開心.png' :
            'assets/images/characters/呱呱_受傷.png';
    }

    static getEndingText() {
        if(this.score >= 400) return '你簡直是鴨界福爾摩斯！所有陷阱都逃不過你的法眼！';
        if(this.score >= 300) return '厲害厲害！校園防詐就靠你守護啦～';
        return '哎呀～要多提高警覺才行啊！';
    }
}

// 初始化遊戲
GameState.init();
