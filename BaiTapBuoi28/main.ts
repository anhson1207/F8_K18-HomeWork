//Assignment 28
//1
//interface
interface PartTimeI {
    id: number;
    name: string;
    salary: number;
    hoursWorked: number;
}
const partTime: PartTimeI = {
    id: 2,
    name: "Binh",
    salary: 20,
    hoursWorked: 40,
};
//shallow copy
const copy = { ...partTime, hoursWorked: 45 };
//console.log(copy);
//2
//class and interface
interface Employee {
    id: number;
    name: string;
    salary: number;
    getSalary: () => number;
}
class FullTimeEmployee implements Employee {
    id: number;
    name: string;
    salary: number;
    getSalary(): number {
        return this.salary;
    }
}
// const e1=new FullTimeEmployee();
// e1.salary=20;
// console.log(e1.getSalary());
class PartTimeEmployee implements Employee {
    hourWorker: number;
    id: number;
    name: string;
    salary: number;
    getSalary(): number {
        return this.salary * this.hourWorker;
    }
}
//calculate total salary
function calculateTotalSalary(employees: Employee[]): number {
    let totalSalary = 0;
    for (const e of employees) {
        totalSalary += e.getSalary();
    }
    return totalSalary;
}
const e1 = new FullTimeEmployee();
e1.id = 1;
e1.name = "Son";
e1.salary = 1000;
console.log(e1);
console.log(e1.getSalary()); //1000
const e2 = new PartTimeEmployee();
e2.id = 2;
e2.name = "Anh";
e2.salary = 1000;
e2.hourWorker = 8;
console.log(e2);
console.log(e2.getSalary()); //8000
const employees = [e1, e2];
console.log(calculateTotalSalary(employees)); //9000
