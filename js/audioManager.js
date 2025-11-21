// js/audioManager.js
export const audioManager = { 
    rocketSound: new Audio('assets/pokemon-anime-sound-collection-team-rocket-motto-kanto-version_KkV4sgtO.mp3'),
    bgm: new Audio('assets/song/opening.mp3'),
    flip: new Audio('assets/song/flipcard.mp3'), 
    
    playRocket() { 
        this.rocketSound.volume = 0.5;
        this.rocketSound.play().catch(e => console.log("Navegador bloqueou o som automático:", e));
    },

    stopRocket() { 
        this.rocketSound.pause();
        this.rocketSound.currentTime = 0;
    },

    playBGM(){
        this.bgm.volume = 0.3;
        this.bgm.loop = true;
        this.bgm.play().catch(error => {
            console.log("Autoplay bloqueado. Aguardando interação do usuário.");
        });
    },

    stopBGM() {
        this.bgm.pause();
        this.bgm.currentTime = 0; 
    },

    playFlip(){
        this.flipSound.currentTime = 0; 
        this.flipSound.volume = 0.5; // Volume agradável
    }
};