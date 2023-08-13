import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CoursService } from "src/app/services/cours.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-display-cours",
  templateUrl: "./display-cours.component.html",
  styleUrls: ["./display-cours.component.css"],
})
export class DisplayCoursComponent implements OnInit {
  coursesTab: [];
  constructor(private coursService: CoursService, private router: Router) {}

  ngOnInit() {
    this.getAll();
  }
  deleteUser(id) {
    this.coursService.deleteCours(id).subscribe((response) => {
      if (response.message == "deleted with success") {
        Swal.fire({
          title: "Cours deleted !!",
          showConfirmButton: false,
          icon: "warning",
        });
        this.getAll();
      } else {
        Swal.fire({
          title: "Not deleted !!",
          showConfirmButton: false,
          icon: "warning",
        });
      }
    });
  }
  getAll() {
    this.coursService.getAllCours().subscribe((response) => {
      this.coursesTab = response.courses;
    });
  }
  addGroup(idCours, idTeacher) {
    this.router.navigate([`add-group/${idCours}/${idTeacher}`]);
  }
}
