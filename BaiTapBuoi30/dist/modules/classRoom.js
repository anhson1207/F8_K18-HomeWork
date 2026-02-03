export class ClassRoom {
    constructor(name) {
        this.name = name;
        this.students = [];
    }
    addStudent(student) {
        this.students.push(student);
    }
    removeStudent(student) {
        this.students = this.students.filter((s) => s !== student);
    }
    notify(message) {
        this.students.forEach((student) => student.upadate(message));
    }
    postAnnouncement(message) {
        console.log(`👉 Thông báo mới: ${message}`);
        this.notify(message);
    }
}
