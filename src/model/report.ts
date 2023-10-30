

export class BattleReport {
    readonly you: { name: any; total_life: any; curr_life: any; attack: any; };
    readonly opponent: { name: any; total_life: any; curr_life: any; attack: any; };
    readonly attacks: any;
    readonly result: string;
    
    constructor(report: any) {
        const you = report.report.fighters.you;
        const opponent = report.report.fighters.opponent;

        this.result = report.report.result;

        this.you = {
            name: you.pokemon.name,
            total_life: you.pokemon.life,
            curr_life: you.life,
            attack: you.attack,
        };

        this.opponent = {
            name: opponent.pokemon.name,
            total_life: opponent.pokemon.life,
            curr_life: opponent.life,
            attack: opponent.attack,
        };

        this.attacks = report.attack_options;
    }
}