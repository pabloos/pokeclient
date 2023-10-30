import { Game } from "./controller/game";

window.onload = () => {
    const game = new Game();

    game.start();
}