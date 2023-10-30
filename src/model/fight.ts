

export class FighterOption {
    private readonly host: string;
    private readonly url: string;
    
    constructor(url: string) {
        this.host = 'http://localhost:8080';
        this.url = url;
    }

    async get() {
        const report = await fetch(this.host + this.url).then(response => response.json());

        return report;
    }
}