import { delay } from "./delay";

interface Effectful {
    imgSources: string[]
    cssClass: string
}

export const effectMap: {[key: string]: Effectful} = {
    "tackle": {
        imgSources: [
            "assets/effects/tackle/1.png", 
            "assets/effects/tackle/2.png", 
            "assets/effects/tackle/3.png", 
            "assets/effects/tackle/4.png", 
            "assets/effects/tackle/5.png"
        ],
        cssClass: ""
    },
    "cut": {
        imgSources: [
            "assets/effects/cut/1.png", 
            "assets/effects/cut/2.png", 
            "assets/effects/cut/3.png", 
            "assets/effects/cut/4.png", 
            "assets/effects/cut/5.png"
        ],
        cssClass: ""
    },
    "quick_att": {
        imgSources: [
            "assets/effects/quick/1.png", 
            "assets/effects/quick/2.png", 
            "assets/effects/quick/3.png", 
            "assets/effects/quick/4.png", 
        ],
        cssClass: ""
    },
    "thunder": {
        imgSources: [
            "assets/effects/thunder/1.png", 
            "assets/effects/thunder/2.png", 
            "assets/effects/thunder/3.png", 
            "assets/effects/thunder/4.png", 
            "assets/effects/thunder/5.png"
        ],
        cssClass: ""
    },
    "elec_ball": {
        imgSources: [
            "assets/effects/ball/1.png", 
            "assets/effects/ball/2.png", 
            "assets/effects/ball/3.png", 
            "assets/effects/ball/4.png", 
            "assets/effects/ball/5.png"
        ],
        cssClass: ""
    },
    "water_gun": {
        imgSources: [
            "assets/effects/water/1.png", 
            "assets/effects/water/2.png", 
            "assets/effects/water/3.png", 
            "assets/effects/water/4.png", 
        ],
        cssClass: ""
    },
    "rain_dance": {
        imgSources: [
            "assets/effects/rain/1.png", 
            "assets/effects/rain/2.png", 
            "assets/effects/rain/3.png", 
            "assets/effects/rain/4.png", 
            "assets/effects/rain/5.png",
            "assets/effects/rain/6.png", 
            "assets/effects/rain/7.png", 
            "assets/effects/rain/8.png", 
        ],
        cssClass: ""
    },
    "flames": {
        imgSources: [
            "assets/effects/flames/1.png", 
            "assets/effects/flames/2.png", 
            "assets/effects/flames/3.png", 
            "assets/effects/flames/4.png", 
            "assets/effects/flames/5.png",
            "assets/effects/flames/6.png", 
            "assets/effects/flames/7.png", 
            "assets/effects/flames/8.png", 
        ],
        cssClass: ""
    },
    "fire_spin": {
        imgSources: [
            "assets/effects/fire/1.png", 
            "assets/effects/fire/2.png", 
            "assets/effects/fire/3.png", 
            "assets/effects/fire/4.png", 
            "assets/effects/fire/5.png",
            "assets/effects/fire/6.png", 
        ],
        cssClass: ""
    },
    "leaf_blade": {
        imgSources: [
            "assets/effects/leaf/1.png", 
            "assets/effects/leaf/2.png", 
            "assets/effects/leaf/3.png", 
            "assets/effects/leaf/4.png", 
            "assets/effects/leaf/5.png",
        ],
        cssClass: ""
    },
    "seed_bomb": {
        imgSources: [
            "assets/effects/seed/1.png", 
            "assets/effects/seed/2.png", 
            "assets/effects/seed/3.png", 
            "assets/effects/seed/4.png", 
            "assets/effects/seed/5.png",
        ],
        cssClass: ""
    },
}

export async function play(pokemonImg: HTMLElement, animationVector: string[]) {
    for (let i = 0; i < animationVector.length; i++) {
        const effect = document.createElement('img');
        effect.src = animationVector[i];
        effect.classList.add('opp-attack-effect');

        pokemonImg.appendChild(effect);

        await delay(125);

        effect.remove();
    }
}

export async function blink(element: HTMLElement) {
    element.classList.add('blink-fast');

    await delay(1000);

    element.classList.remove('blink-fast');
}