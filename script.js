<!DOCTYPE html>
<html lang="zh-Hant-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>別信！這是騙局：AI欺詐大作戰</title>
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=swap" rel="stylesheet">
    <link rel="preload" href="教室.webp" as="image">
    <link rel="preload" href="呱.PNG.png" as="image">
    <link rel="preload" href="assets/sounds/bgm.mp3" as="audio">
    <link rel="preload" href="assets/sounds/click.mp3" as="audio">
    <style>
        #title-screen {
            position: relative;
        }
        .parallax-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
        }
        .main-character {
            position: absolute;
            z-index: 2;
        }
        #start-btn {
            position: relative;
            z-index: 3;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <main id="game-container">
        <!-- 標題畫面 -->
        <header id="title-screen" class="screen active">
            <img src="教室.webp" alt="校園背景" class="parallax-bg">
            <img src="呱.PNG" alt="主角呱呱" class="main-character">
            <button id="start-btn" class="pixel-button" aria-label="開始冒險">開始冒險</button>
        </header>
        
        <!-- 關卡容器 -->
        <div id="level-container" class="screen" style="display:none;"></div>
    </main>

    <!-- 音效 -->
    <audio id="bgm" src="assets/sounds/bgm.mp3" loop></audio>
    <audio id="click-sfx" src="assets/sounds/click.mp3"></audio>

    <!-- 核心邏輯與關卡程式 -->
    <script src="script.js" defer></script>
    <script src="voice-scam.js" defer></script>
    <script src="deepfake.js" defer></script>
    <script src="investment.js" defer></script>
    <script src="text-scam.js" defer></script>

    <script>
        // GameState class definition
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

            // 播放背景音樂
            static playBGM() {
                const bgm = document.getElementById('bgm');
                bgm.play().catch(error => {
                    console.error('背景音樂播放失敗:', error);
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

                // 顯示遊戲畫面
                document.getElementById('level-container').classList.add('active');
                document.getElementById('level-container').style.display = 'block';
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
    </script>
</body>
</html>


