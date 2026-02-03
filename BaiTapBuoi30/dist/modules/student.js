export class Student {
    constructor(name) {
        this.name = name;
    }
    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    upadate(message) {
        console.log(`👉 Học sinh ${this.name} nhận được: ${message}`);
    }
}
