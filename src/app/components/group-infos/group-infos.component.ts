import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CoursService } from "src/app/services/cours.service";
import { GroupeService } from "src/app/services/groupe.service";
import { UserService } from "src/app/services/user.service";
import jwt_decode from "jwt-decode";
import { NoteService } from "src/app/services/note.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-group-infos",
  templateUrl: "./group-infos.component.html",
  styleUrls: ["./group-infos.component.css"],
})
export class GroupInfosComponent implements OnInit {
  groupeForm: FormGroup;
  newStudent = {
    idStudent: "",
  };
  groupe: any = {};
  teacher: any = {};
  cours: any = {};
  note: any = {};
  studentId: any;
  studentsTab: any = [];
  decodedToken: any;
  constructor(
    private groupeService: GroupeService,
    private coursService: CoursService,
    private userService: UserService,
    private noteService: NoteService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.groupeService
      .getGroupeById(this.activatedRoute.snapshot.paramMap.get("id"))
      .subscribe((response) => {
        this.groupe = response.groupe;
        //importation des informations de "Student"
        for (let i = 0; i < response.groupe.studentsId.length; i++) {
          this.userService
            .getUserById(response.groupe.studentsId[i])
            .subscribe((student) => {
              this.studentsTab.push(student.user);

              //affecter le note pour chaque etudiant
              this.noteService
                .searchNoteByTel(response.groupe.studentsId[i])
                .subscribe((response) => {
                  for (let j = 0; j < response.notes.length; j++) {
                    student.user.note = response.notes[j].note;
                  }
                });
            });
        }
        //importation des informations de "Teacher"
        this.userService
          .getUserById(response.groupe.teacherId)
          .subscribe((doc) => {
            this.teacher = doc.user;
          });
        //importation des informations de "Cours"
        this.coursService
          .getCoursById(response.groupe.coursId)
          .subscribe((course) => {
            this.cours = course.cours;
          });
      });
  }
  addStudent() {
    this.groupe.studentsId.push(this.newStudent.idStudent);
    this.groupeService.editGroup(this.groupe).subscribe((response) => {
      if (response.message == "eidted with success") {
        Swal.fire({
          icon: "success",
          text: "Student added with success  !",
        });
        this.router.navigate(["admin"]);
      }
    });
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
  goToAddNote(studentId, teacherId, coursId, groupeId) {
    this.router.navigate([
      `add-note/${studentId}/${teacherId}/${coursId}/${groupeId}`,
    ]);
  }
}
