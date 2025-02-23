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

        // 拖放功能實現
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
