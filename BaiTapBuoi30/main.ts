import { ClassRoom } from "./modules/classRoom.js";
import { Student } from "./modules/student.js";
const classA:ClassRoom=new ClassRoom("Lớp A");
const studentA:Student=new Student("An");
const studentB:Student=new Student("Binh");
classA.addStudent(studentA);
classA.addStudent(studentB);
classA.postAnnouncement("ngày mai kiểm tra OOP nhé các em");