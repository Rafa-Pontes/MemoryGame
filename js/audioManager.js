// js/audioManager.js
export const audioManager = { 
    rocketSound: new Audio('assets/pokemon-anime-sound-collection-team-rocket-motto-kanto-version_KkV4sgtO.mp3'),
    
    playRocket() { 
        this.rocketSound.volume = 0.5;
        this.rocketSound.play().catch(e => console.log("Navegador bloqueou o som automático:", e));
    },

    stopRocket() { 
        this.rocketSound.pause();
        this.rocketSound.currentTime = 0;
    }
};