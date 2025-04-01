document.addEventListener('DOMContentLoaded', function() {
    const hiElement = document.getElementById('hi');
    const introText = document.getElementById('intro-text');
    const transitionImage = document.getElementById('transition-image');
    const audioElement = document.getElementById('intro-audio');
    const startButton = document.getElementById('start-button');
    
    // 隐藏Hi
    hiElement.style.opacity = '0';
    
    // 动画序列函数
    function startAnimationSequence() {
        // 显示Hi
        hiElement.style.opacity = '1';
        
        // 介绍文字
        setTimeout(() => {
            hiElement.style.opacity = '0';
            
            let opacity = 0;
            const fadeIn = setInterval(() => {
                if (opacity < 1) {
                    opacity += 0.05;
                    introText.style.opacity = opacity;
                } else {
                    clearInterval(fadeIn);
                }
            }, 50);

            // 介绍文字消失
            setTimeout(() => {
                introText.style.opacity = '0';
                
                // 等待文字完全消失 后再显示图片
                setTimeout(() => {
                    // 文字完全消失
                    introText.style.display = 'none';
                    
                    // 显示图片
                    transitionImage.style.display = 'block';
                    transitionImage.style.opacity = '1';
                    
                    // 3秒后跳转到下一页
                    setTimeout(() => {
                        window.location.href = 'page2.html';
                    }, 3000);
                }, 1000); 
            }, 5000);
        }, 1000);
    }
    
    // 预加载
    audioElement.load();
    
    // 自动触发
    startButton.addEventListener('click', function() {
        // 播放
        audioElement.muted = false;
        audioElement.play()
            .then(() => {
                console.log("音频播放成功");
                // 移除按钮
                startButton.remove();
                // 动画序列
                startAnimationSequence();
            })
            .catch(error => {
                console.error("音频播放失败:", error);
                startButton.remove();
                startAnimationSequence();
            });
    });
    
    // 自动触发开始按钮点击
    setTimeout(() => {
        startButton.click();
    }, 100);
}); 