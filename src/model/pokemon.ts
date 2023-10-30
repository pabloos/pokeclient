

export class Pokemon {
    readonly name: string;
    readonly life: number;

    constructor(name: string, life: number) {
        this.name = name;
        this.life = life;
    }
}

export class PokemonOption {
    private readonly host: string;
    private readonly url: string;

    constructor(url: string) {
        this.host = 'http://localhost:8080';
        this.url = url;
    }

    async get() {
        const pokemon = await fetch(this.host + this.url).then(response => response.json());

        return pokemon;
    }
}