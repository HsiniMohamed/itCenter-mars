import { Component, OnInit } from "@angular/core";
import { CoursService } from "src/app/services/cours.service";
import { GroupeService } from "src/app/services/groupe.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-counts",
  templateUrl: "./counts.component.html",
  styleUrls: ["./counts.component.css"],
})
export class CountsComponent implements OnInit {
  studentsCount: any;
  teachersCount: any;
  coursesCount: any;
  groupsCount: any;
  constructor(
    private courseService: CoursService,
    private userService: UserService,
    private groupeService: GroupeService
  ) {}

  ngOnInit() {
    this.userService.getAllStudents().subscribe((response) => {
      this.studentsCount = response.usersTab.length;
    });
    this.userService.getAllTeachers().subscribe((response) => {
      this.teachersCount = response.usersTab.length;
    });
    this.courseService.getAllCours().subscribe((response) => {
      this.coursesCount = response.courses.length;
    });
    this.groupeService.getAllGroupes().subscribe((response) => {
      this.groupsCount = response.groupes.length;
    });
  }
}
