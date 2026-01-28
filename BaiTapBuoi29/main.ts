//Assignment 29
//create interface
interface EmployeeI {
    getId: () => number;
    getName: () => string;
    setName: (name: string) => void;
    getSalary: () => number;
    setSalary: (salary: number) => void;
    calculateSalary: () => number;
}
//create abstract class
abstract class Employee implements EmployeeI {
    id: number;
    name: string;
    salary: number;
    constructor(id: number, name: string, salary: number) {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }
    abstract calculateSalary(): number;
    getId(): number {
        return this.id;
    }
    getName(): string {
        return this.name;
    }
    setName(name: string) {
        this.name = name;
    }
    getSalary(): number {
        return this.salary;
    }
    setSalary(salary: number) {
        if (salary <= 0) {
            throw new Error("Salary must greater than 0");
        }
        this.salary = salary;
    }
}
//create class Developer extends Employee
class Developer extends Employee {
    private overtimeHours: number;
    constructor(
        id: number,
        name: string,
        salary: number,
        overtimeHours: number
    ) {
        super(id, name, salary);
        this.overtimeHours = overtimeHours;
        this.setSalary(salary);
    }
    setSalary(salary: number): void {
        if (salary <= 0) {
            throw new Error("Salary must greater than 0");
        }
        this.salary = salary + this.overtimeHours * 50000;
    }
    calculateSalary(): number {
        return this.salary;
    }
}
//create class Manager extends Employee
class Manager extends Employee {
    private teamSize: number;
    constructor(id: number, name: string, salary: number, teamSize: number) {
        super(id, name, salary);
        this.teamSize = teamSize;
        this.setSalary(salary);
    }
    setSalary(salary: number): void {
        if (salary <= 0) {
            throw new Error("Salary must greater than 0");
        }
        this.salary = salary + this.teamSize * 200000;
    }
    calculateSalary(): number {
        return this.salary;
    }
}
//test
const developer = new Developer(1, "Nguyen Van A", 1000000, 5);
console.log(developer.calculateSalary());//1250000
developer.setSalary(1500000);
console.log(developer.calculateSalary());//1750000
const manager = new Manager(2, "Nguyen Van B", 2000000, 10);
console.log(manager.calculateSalary());//4000000
