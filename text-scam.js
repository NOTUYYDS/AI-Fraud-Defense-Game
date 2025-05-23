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
    <link rel="preload" href="campus_bg.png" as="image">
    <link rel="preload" href="呱呱.PNG.png" as="image">
    <link rel="preload" href="bgm.mp3" as="audio">
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
            <img src="campus_bg.png" alt="校園背景" class="parallax-bg">
            <img src="呱呱.PNG" alt="主角呱呱" class="main-character">
            <button id="start-btn" class="pixel-button" aria-label="開始冒險">開始冒險</button>
        </header>
        
        <!-- 關卡容器 -->
        <div id="level-container" class="screen" style="display:none;"></div>
    </main>

    <!-- 音效 -->
    <audio id="bgm" src="assets/sounds/bgm.mp3" loop></audio>
    <audio id="click-sfx" src="assets/sounds/click.mp3"></audio>

    <!-- 核心邏輯與關卡程式 -->
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

        // 第一關 - VoiceScamLevel
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

        // 第二關 - DeepfakeLevel
        class DeepfakeLevel {
            static init() {
                const canvas = document.createElement('canvas');
                canvas.width = 800;
                canvas.height = 600;
                canvas.id = "shooting-canvas";
                document.getElementById('level-container').appendChild(canvas);
                
                const ctx = canvas.getContext('2d');
                this.gameLoop(ctx);
                
                // 射擊事件監聽
                canvas.addEventListener('click', (e) => this.handleShoot(e, canvas));
            }

            static gameLoop(ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // 渲染影片物件邏輯
                this.renderFakeVideo(ctx); // 假影片物件
                this.renderRealVideo(ctx); // 真實影片物件
                
                requestAnimationFrame(() => this.gameLoop(ctx));
            }

            static renderFakeVideo(ctx) {
                ctx.fillStyle = 'red';
                ctx.fillRect(200, 150, 100, 100); // 假影片區塊
                ctx.fillStyle = 'black';
                ctx.font = '20px Arial';
                ctx.fillText('假影片', 210, 210);
            }

            static renderRealVideo(ctx) {
                ctx.fillStyle = 'green';
                ctx.fillRect(500, 150, 100, 100); // 真實影片區塊
                ctx.fillStyle = 'black';
                ctx.font = '20px Arial';
                ctx.fillText('真實影片', 510, 210);
            }

            static handleShoot(event, canvas) {
                const rect = canvas.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                
                // 檢查命中邏輯
                if (x >= 200 && x <= 300 && y >= 150 && y <= 250) {
                    alert("🎯 命中！你成功擊中了假影片！分數 +50！");
                    GameState.score += 50;
                    GameState.loadLevel(3); // 進入下一關
                } else if (x >= 500 && x <= 600 && y >= 150 && y <= 250) {
                    alert("😱 哎呀！你擊中了真實影片！扣分 -20！");
                    GameState.score -= 20;
                } else {
                    alert("🤔 沒打中任何目標，再試一次吧！");
                }
            }
        }

        // 第三關 - InvestmentScamLevel
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

        // 第四關 - TextScamLevel
        class TextScamLevel {
            static init() {
                const container = document.getElementById('level-container');
                container.innerHTML = `
                    <div class="browser-simulator">
                        <div class="url-bar">https://www.pntsu.edu.tw</div>
                        <div class="email-list">
                            <div class="email" data-type="phishing">
                                <img src="assets/images/ui/釣魚郵件.png">
                                <p>[緊急] 您的密碼已外洩！立即重置</p>
                            </div>
                            <div class="email" data-type="legit">
                                <img src="assets/images/ui/真實郵件.png">
                                <p>校園講座通知：AI 防詐技巧</p>
                            </div>
                        </div>
                        <div class="drop-zone">
                            <div class="zone legit">✅ 真實郵件</div>
                            <div class="zone phishing">❌ 詐騙郵件</div>
                        </div>
                    </div>
                `;
                
                let draggedItem = null;
                document.querySelectorAll('.email').forEach(item => {
                    item.draggable = true;
                    item.addEventListener('dragstart', (e) => {
                        draggedItem = e.target;
                    });
                });

                document.querySelectorAll('.zone').forEach(zone => {
                    zone.addEventListener('dragover', (e) => e.preventDefault());
                    zone.addEventListener('drop', (e) => {
                        if (!draggedItem) return;
                        const isCorrect = 
                            draggedItem.dataset.type === zone.classList[1] ||
                            (draggedItem.dataset.type === 'legit' && zone.classList.contains('legit'));
                        
                        if (isCorrect) {
                            GameState.score += 50;
                            draggedItem.style.opacity = '0.3';
                        } else {
                            this.showWarning('⚠️ 分類錯誤！');
                        }
                        draggedItem = null;
                    });
                });
            }

            static showWarning(message) {
                const warning = document.createElement('div');
                warning.className = 'warning-message';
                warning.textContent = message;
                document.body.appendChild(warning);
                setTimeout(() => warning.remove(), 2000);
            }
        }

        // 初始化遊戲
        window.onload = () => GameState.init();
    </script>
</body>
</html>
