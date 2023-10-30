import { Game } from "../controller/game";
import { Pokemon } from "../model/pokemon";

export class Detail {
    private readonly frame: HTMLElement;

    constructor(pokemon: Pokemon, game: Game) {
        const pokemonBox = document.createElement('div');
        pokemonBox.setAttribute('id', 'pokemon-box');
        pokemonBox.classList.add('framed');
        pokemonBox.classList.add('neutral');
        
        const pokemonMin = this.detailImage(pokemon);
        pokemonBox.appendChild(pokemonMin);
    
        const description = this.optionBox(pokemon, game);
        pokemonBox.appendChild(description);
    
        this.frame = pokemonBox;
    }

    display() {
        const wrapper = document.getElementById('wrapper');
        wrapper?.appendChild(this.frame);
    }

    hide() {
        this.frame.remove();
    }

    detailHeader(pokemon: Pokemon) {
        const title = document.createElement('h2')
              title.innerText = pokemon.name;

        return title;
    }

    detailImage(pokemon: Pokemon) {
        const pokemonMin = document.createElement('div');
              pokemonMin.classList.add('opponent');
    
        const img = document.createElement('img');
              img.classList.add('detail-image');
              img.src = 'assets/' + pokemon.name + '.png';
        pokemonMin.appendChild(img);
    
        return pokemonMin;
    }

    optionBox(pokemon: Pokemon, game: Game) {
        const description = document.createElement('div');
              description.classList.add('framed');
    
        const message = document.createElement('p');
    
        const button = document.createElement('button');
              button.innerText = 'fight!';
              button.onclick = () => game.startBattle(pokemon);
    
        message.appendChild(button);
        description.appendChild(message);
        
        return description;
    }
}