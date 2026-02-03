import { ClassRoom } from "./modules/classRoom.js";
import { Student } from "./modules/student.js";
const classA=new ClassRoom("Lớp A");
const studentA=new Student("An");
const studentB=new Student("Binh");
classA.addStudent(studentA);
classA.addStudent(studentB);
classA.postAnnouncement("ngày mai kiểm tra OOP nhé các em");