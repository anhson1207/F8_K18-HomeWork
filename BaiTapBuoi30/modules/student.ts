export interface StudentI {
    setName(name: string): void;
    getName(): string;
    upadate(message: string): void;
}
export class Student implements StudentI {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }
    setName(name: string): void {
        this.name = name;
    }
    getName(): string {
        return this.name;
    }
    upadate(message: string): void {
        console.log(`👉 Học sinh ${this.name} nhận được: ${message}`);
    }
}
