export class AttackOption {
    private readonly url: string;

    constructor(url: string) {
        this.url = url;
    }

    async attack() {
        const report = await fetch('http://localhost:8080' + this.url).then(response => response.json());

        return report;
    }
}