

export interface Message {
    show(): string
}

export class AttackUsed implements Message {
    pokemonName: string
    attackName: string

    constructor(pokemonName: string, attackName: string) {
        this.pokemonName = pokemonName
        this.attackName = attackName
    }

    show(): string {
        return this.pokemonName + " used " + this.attackName;
    }
}

export class NewBattle implements Message {
    player: string
    opponent: string

    constructor(player: string, opponent: string) {
        this.player = player;
        this.opponent = opponent;
    }

    show(): string {
        return this.player + " will fight with " + this.opponent + "!";
    }
}

export class NewWinner implements Message {
    winner: string

    constructor(winner: string) {
        this.winner = winner;
    }

    show(): string {
        return this.winner + " won the battle!"
    }
}