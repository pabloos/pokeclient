

import { Game } from "../controller/game";
import { Pokemon } from "../model/pokemon";
import { BattleReport } from "../model/report";
import { Battle } from "./battle";
import { Detail } from "./detail";
import { Pokedex } from "./pokedex";

export class Board {
    private readonly game: Game;

    private pokedex: Pokedex;
    private detail: Detail;
    private battle: Battle;

    constructor(game: Game) {
        this.game = game;
    }

    drawPokedex(pokemonNames: string[]) {
        this.pokedex = new Pokedex(pokemonNames, this.game);
        this.pokedex.display();
    }

    drawPokemonDetail(pokemon: Pokemon) {
        this.pokedex.hide();

        this.detail = new Detail(pokemon, this.game);
        this.detail.display();
    }

    drawBattle(report: BattleReport) {
        this.detail.hide();

        const battle = new Battle(report, this.game);
        this.battle = battle;

        this.battle.display();
        this.battle.displayAttackOptions(report, this.game);
    }

    async updateBattle(report: BattleReport) {
        await this.battle.update(report, this.game);
        this.battle.displayAttackOptions(report, this.game);
    }

    async endBattle(report: BattleReport) {
        await this.battle.update(report, this.game);
        await this.battle.end(report);

        this.battle.remove();
    }
}