import { Component, OnInit } from "@angular/core";
import jwt_decode from "jwt-decode";
import { CoursService } from "src/app/services/cours.service";
import { GroupeService } from "src/app/services/groupe.service";
import { NoteService } from "src/app/services/note.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-courses-student",
  templateUrl: "./courses-student.component.html",
  styleUrls: ["./courses-student.component.css"],
})
export class CoursesStudentComponent implements OnInit {
  decodedToken: any;
  notes: any;

  constructor(
    private noteService: NoteService,
    private groupeService: GroupeService,
    private coursService: CoursService,
    private userService: UserService
  ) {}

  ngOnInit() {
    let tel;
    if (
      this.isLoggedIn() &&
      this.decodedToken &&
      this.decodedToken.role == "student"
    ) {
      tel = this.decodedToken.tel;
    } else if (
      this.isLoggedIn() &&
      this.decodedToken &&
      this.decodedToken.role == "parent"
    ) {
      tel = this.decodedToken.telChild;
    }
    if (tel) {
      this.noteService.searchNoteByTel(tel).subscribe((response) => {
        this.notes = response.notes;
        for (let i = 0; i < this.notes.length; i++) {
          console.log(this.notes[i].teacherId);
          //importation des informations de "Teacher"
          this.userService
            .getUserById(this.notes[i].teacherId)
            .subscribe((doc) => {
              this.notes[i].nameTeacher =
                doc.user.firstName + " " + doc.user.lastName;
            });
          //importation des informations de "Cours"
          this.coursService
            .getCoursById(this.notes[i].coursId)
            .subscribe((course) => {
              this.notes[i].nameCours = course.cours.name;
            });
          //importation des informations de "Groupe"
          this.groupeService
            .getGroupeById(this.notes[i].groupeId)
            .subscribe((response) => {
              this.notes[i].nameGroupe = response.groupe.name;
              console.log(this.notes[i]);
            });
        }
      });
    }
  }
  isLoggedIn() {
    const token = sessionStorage.getItem("jwt");
    if (token) {
      this.decodedToken = this.decodeToken(token);
    }
    return !!token;
  }
  decodeToken(token: string) {
    return jwt_decode(token);
  }
}
