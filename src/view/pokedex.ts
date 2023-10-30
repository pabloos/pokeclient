

import { Game } from "../controller/game";

export class Pokedex {
    private frame: HTMLElement;

    constructor(pokemons: string[], game: Game) {
        const pokedexFrame = document.createElement('div');
              pokedexFrame.classList.add('wrapper');
              pokedexFrame.setAttribute('id', 'pokedex');

        const header = document.createElement('header');
        const title = document.createElement('h1');
              title.innerText = 'Pokedex';

        header.appendChild(title);
        pokedexFrame.appendChild(header);

        const list = document.createElement('ul');
              list.setAttribute('id', 'pokedex-box');
              list.classList.add('framed');
              list.classList.add('buttons');

        pokedexFrame.appendChild(list);

        for (const i in pokemons) {
            const pokemon = pokemons[i];

            const li = document.createElement('li');
            const button = document.createElement('button');
    
            button.innerText = pokemon;
            button.onclick = () => game.showPokemon(pokemon);
            
            li.appendChild(button);

            list?.appendChild(li);
        }

        this.frame = pokedexFrame;
    }

    display() {
        const wrapper = document.getElementById('wrapper');

        wrapper?.appendChild(this.frame);
    }

    hide() {
        this.frame.remove();
    }
}