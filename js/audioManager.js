// js/audioManager.js
export const audioManager = { 
    // Sons definidos
    rocketSound: new Audio('assets/song/ending.mp3'),
    bgm: new Audio('assets/song/opening.mp3'),
    gameSound: new Audio('assets/song/soundBoard.mp3'), 
    flipSound: new Audio('assets/Flip.mp3'), 

    // --- MÚSICA DA EQUIPE ROCKET / FINAL ---
    playRocket() { 
        this.rocketSound.volume = 0.5;
        this.gameSound.loop = true; 

        this.rocketSound.play().catch(e => console.log("Som bloqueado:", e));
    },

    stopRocket() { 
        this.rocketSound.pause();
        this.rocketSound.currentTime = 0;
    },

    // --- MÚSICA DA TELA DE LOGIN (OPENING) ---
    playBGM(){
        this.bgm.volume = 0.3;
        this.bgm.loop = true;
        this.bgm.play().catch(error => {
            console.log("Autoplay bloqueado no login.");
        });
    },

    stopBGM() {
        this.bgm.pause();
        this.bgm.currentTime = 0; 
    },

    // --- NOVA MÚSICA DO TABULEIRO (SOUNDBOARD) ---
    playGameSound(){
        this.gameSound.volume = 0.8; 
        this.gameSound.loop = true; 
        this.gameSound.play().catch(e => console.log("Erro ao tocar som do jogo:", e));
    },

    stopGameSound() {
        this.gameSound.pause();
        this.gameSound.currentTime = 0;
    },

    // --- SOM DE VIRAR CARTA ---
    playFlip() {
        // Verifica se o som existe antes de tentar resetar
        if(this.flipSound) {
            this.flipSound.currentTime = 0; 
            this.flipSound.volume = 1; 
            this.flipSound.play().catch(() => {});
        }
    }
};