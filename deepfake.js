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
