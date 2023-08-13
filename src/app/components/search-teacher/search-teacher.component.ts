import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-search-teacher",
  templateUrl: "./search-teacher.component.html",
  styleUrls: ["./search-teacher.component.css"],
})
export class SearchTeacherComponent implements OnInit {
  searchTeacherForm: FormGroup;
  teacher: any = {};
  feindedTeachers: any;
  constructor(private userService: UserService) {}

  ngOnInit() {}
  searchTeacher() {
    if (this.teacher.specialite) {
      this.userService
        .searchTeachersBySpecialite(this.teacher.specialite)
        .subscribe((response) => {
          this.feindedTeachers = response.usersTab;
        });
    }
  }
}
