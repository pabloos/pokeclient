import { AttackOption } from "./attack";
import { FighterOption } from "./fight";
import { Pokemon, PokemonOption } from "./pokemon";
import { BattleReport } from "./report";

// model
export class Client {
    private readonly host: string;
    private readonly pokemons: { [key: string]: PokemonOption; } = {};
    private readonly fighters: { [key: string]: FighterOption; } = {};
    private readonly attacks:  { [key: string]: AttackOption; }  = {};

    constructor() {
        this.host = 'http://localhost:8080';
    }

    // pokedex
    async requestPokemons() {
        const pokemons = await fetch(this.host + "/pokedex").then(response => response.json());

        pokemons.forEach((pokemon: any) => {
            this.pokemons[pokemon.name] = new PokemonOption(pokemon.url);
        })

        return pokemons.map((pokemon: any) => pokemon.name);
    }

    async requestPokemon(pokemonName: string) {
        const handler = this.pokemons[pokemonName];

        const pokemon = await handler.get();

        this.fighters[pokemon.name] = new FighterOption(pokemon.fight);

        return new Pokemon(pokemon.name, pokemon.life);
    }

    // battle
    async selectFighter(pokemon: Pokemon) {
        const handler = this.fighters[pokemon.name];

        const battle = await handler.get();

        battle.attack_options.forEach((attack: any) => {
            this.attacks[attack.attack] = new AttackOption(attack.link);
        })

        return new BattleReport(battle);
    }

    async selectAttack(attackName: string) {
        const handler = this.attacks[attackName];

        const battle = await handler.attack();

        battle.attack_options?.forEach((attack: any) => {
            this.attacks[attack.name] = new AttackOption(attack.url);
        })

        return new BattleReport(battle);
    }
}