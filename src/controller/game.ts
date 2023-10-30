import { Client } from "../model/client";
import { Pokemon } from "../model/pokemon";
import { Board } from "../view/board";

export class Game {
    private readonly client: Client;
    private readonly board: Board;

    constructor() {
        this.client = new Client();
        this.board = new Board(this);
    }

    async start() {
        await this.showPokedex();
    }

    async showPokedex() {
        const pokemons = await this.client.requestPokemons();

        this.board.drawPokedex(pokemons);
    }

    async showPokemon(pokemonName: string) {
        const pokemon = await this.client.requestPokemon(pokemonName);

        this.board.drawPokemonDetail(pokemon);
    }

    async startBattle(pokemon: Pokemon) {
        const report = await this.client.selectFighter(pokemon);

        this.board.drawBattle(report);
    }

    async fight(attackName: string) {
        const report = await this.client.selectAttack(attackName);

        if (report.result != "Continue") {
            await this.board.endBattle(report);

            this.start();

        } else {
            await this.board.updateBattle(report);
        }
    }
}