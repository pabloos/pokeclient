import { Game } from "../controller/game";
import { BattleReport } from "../model/report";
import { delay } from "./delay";
import { blink, effectMap, play } from "./effects";
import { AttackUsed, Message, NewWinner } from "./message";

export class Battle {
    private scene: HTMLElement;

    private opponentLifeProgressBar: HTMLElement;
    private opponentLifeProgressBarContainer: HTMLElement;

    private playerLifeProgressBar: HTMLElement;
    private playerLifeProgressBarContainer: HTMLElement;

    private oppImgContainer: HTMLElement;
    private playerImgContainer: HTMLElement;

    private messageBox: HTMLElement;

    constructor(report: BattleReport, game: Game) {
        const battle = document.createElement('div');
              battle.setAttribute('id', 'battle');

        const oppSpace = document.createElement('div');
              oppSpace.classList.add('opp-space');
            
        battle.appendChild(oppSpace);

        const oppStats = document.createElement('div');
              oppStats.classList.add('stats');
              oppStats.classList.add('opp-stats');

        oppSpace.appendChild(oppStats);

        const oppName = document.createElement('h2');
              oppName.innerText = report.opponent.name;

        oppStats.appendChild(oppName);

        const progressBarContainer = document.createElement('div');
              progressBarContainer.classList.add('progress-bar-container');
    
        oppStats.appendChild(progressBarContainer);

        this.opponentLifeProgressBarContainer = progressBarContainer;

        const label = document.createElement('label');
              label.setAttribute('for', 'progressBar');
              label.innerText = 'HP:';

        progressBarContainer.appendChild(label);

        const progressBar = document.createElement('div');
            progressBar.setAttribute('id', 'progressBar')
            progressBar.classList.add('progress-bar');
            progressBar.classList.add('p'+ report.opponent.curr_life);

        progressBarContainer.appendChild(progressBar);
        this.opponentLifeProgressBar = progressBar;

        const oppImageContainer = document.createElement('div');
        oppImageContainer.classList.add('opponent-image');

        this.oppImgContainer = oppImageContainer;

        const img = document.createElement('img');
                img.classList.add('pokemon-image');
                img.setAttribute('id', 'opp-image');
                img.src = 'assets/' + report.opponent.name + '-front.png';
        
        oppImageContainer.appendChild(img);
        oppSpace.appendChild(oppStats);
        oppSpace.appendChild(oppImageContainer);

        const youSpace = document.createElement('div');
            youSpace.classList.add('you-space');

        battle.appendChild(youSpace);

        const youStats = document.createElement('div');
        youStats.classList.add('stats');
        youStats.classList.add('you-stats');

        youSpace.appendChild(youStats);

        const youName = document.createElement('h2');
            youName.innerText = report.you.name;

        youStats.appendChild(youName);

        const youProgressBarContainer = document.createElement('div');
            youProgressBarContainer.classList.add('progress-bar-container');

        youStats.appendChild(youProgressBarContainer);

        this.playerLifeProgressBarContainer = youProgressBarContainer;

        const youLabel = document.createElement('label');
            youLabel.setAttribute('for', 'progressBar');
            youLabel.innerText = 'HP:';

        youProgressBarContainer.appendChild(youLabel);

        const youProgressBar = document.createElement('div');
            youProgressBar.setAttribute('id', 'progressBar')
            youProgressBar.classList.add('progress-bar');
            youProgressBar.classList.add('p'+ report.you.curr_life);

        youProgressBarContainer.appendChild(youProgressBar);
        this.playerLifeProgressBar = youProgressBar;

        const youImageContainer = document.createElement('div');
            youImageContainer.classList.add('you-image');

        this.playerImgContainer = youImageContainer;

        const youImg = document.createElement('img');
            youImg.classList.add('pokemon-image');
            youImg.setAttribute('id', 'you-image');
            youImg.src = 'assets/' + report.you.name + '-back.png';

        youImageContainer.appendChild(youImg);

        youSpace.appendChild(youImageContainer);
        youSpace.appendChild(youStats);

        const notificationBox = document.createElement('div');
            notificationBox.classList.add('framed');
            notificationBox.classList.add('notificationbox');

        battle.appendChild(notificationBox);

        this.messageBox = notificationBox

        this.scene = battle;
    }

    display() {
        const wrapper = document.getElementById('wrapper');

        wrapper?.appendChild(this.scene);
    }

    remove() {
        this.scene.remove();
    }

    async update(report: BattleReport, game: Game) {
        this.clearMessageBox();

        this.printOpponentAttack(report);
        await this.showOpponentAttackEffects(report);
        await delay(1000);
        this.reducePlayerLife(report.you.curr_life);
        await delay(1000);

        this.clearMessageBox();

        this.printPlayerAttack(report);
        await this.showPlayerAttackEffects(report);
        await delay(1000);
        this.reduceOpponentLife(report.opponent.curr_life);
        await delay(1000);

        this.clearMessageBox();
    }

    displayAttackOptions(report: BattleReport, game: Game) {
        this.clearMessageBox();

        const buttons = document.createElement('ul');
            buttons.classList.add('framed');
            buttons.classList.add('buttons');
            buttons.classList.add('compact');
            buttons.classList.add('optionsbox');
            buttons.setAttribute('id', 'optionsbox');

        for (let i = 0; i < report.attacks.length; i++) {
            const li = document.createElement('li');

            const button = document.createElement('button');
                button.innerText = report.attacks[i].attack;
                button.onclick = async () => {
                    await game.fight(report.attacks[i].attack);
                };

            li.appendChild(button);

            buttons.appendChild(li);
        }

        this.messageBox.appendChild(buttons);
    }

    async end(report: BattleReport) {
        this.clearMessageBox();

        if (report.result == "Win") {
            await this.displayWinner(report.you.name);
            await delay(2000);
        } else if (report.result == "Lose") {
            await this.displayWinner(report.opponent.name);
            await delay(2000);
        } else {

        }
    }

    private async showOpponentAttackEffects(report: BattleReport) {
        const effect = effectMap[report.opponent.attack];

        await play(this.playerImgContainer, effect.imgSources)

        await blink(this.playerImgContainer);
    }

    private async showPlayerAttackEffects(report: BattleReport) {
        const effect = effectMap[report.you.attack];
        
        await play(this.oppImgContainer, effect.imgSources)

        await blink(this.oppImgContainer);
    }

    private async printPlayerAttack(report: BattleReport) {
        const message = new AttackUsed(report.you.name, report.you.attack);

        this.displayMessage(message);
    }

    private async printOpponentAttack(report: BattleReport) {
        const message = new AttackUsed(report.opponent.name, report.opponent.attack);

        this.displayMessage(message);
    }

    private async displayWinner(winner: string) {
        const message = new NewWinner(winner);

        this.displayMessage(message);
    }

    private displayMessage(message: Message) {
        const text = message.show();

        const textMessage = document.createElement('p');
        textMessage.classList.add('message');
        textMessage.innerText = text;

        this.messageBox.appendChild(textMessage);
    }

    private clearMessageBox() {
        this.messageBox.innerText = '';
    }

    private reduceOpponentLife(life: number) {
        this.opponentLifeProgressBar.remove();

        const progressBar = document.createElement('div');
              progressBar.setAttribute('id', 'progressBar')
              progressBar.classList.add('progress-bar');
              progressBar.classList.add('p'+ life);

        this.opponentLifeProgressBar = progressBar;
        this.opponentLifeProgressBarContainer.appendChild(progressBar);
    }

    private reducePlayerLife(life: number) {
        this.playerLifeProgressBar.remove();

        const progressBar = document.createElement('div');
              progressBar.setAttribute('id', 'progressBar')
              progressBar.classList.add('progress-bar');
              progressBar.classList.add('p'+ life);

        this.playerLifeProgressBar = progressBar;
        this.playerLifeProgressBarContainer.appendChild(progressBar);
    }
}