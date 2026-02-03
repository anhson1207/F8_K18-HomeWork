import {Student} from './student.js';
export interface ClassRoomI {
    addStudent(student: Student): void;
    removeStudent(student: Student): void;
    notify(message: string): void;
    postAnnouncement(message: string): void;
}
export class ClassRoom implements ClassRoomI {
private name: string;
private students: Student[];
constructor(name: string) {
    this.name = name;
    this.students = [];
}
addStudent(student: Student): void {
    this.students.push(student);
}
removeStudent(student: Student): void {
    this.students = this.students.filter((s) => s !== student);
}
notify(message: string): void {
    this.students.forEach((student) => student.upadate(message));
}
postAnnouncement(message: string): void {
    console.log(`👉 Thông báo mới: ${message}`);
    this.notify(message);
}
}