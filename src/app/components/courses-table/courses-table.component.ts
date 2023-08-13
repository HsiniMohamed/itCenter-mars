import { Component, OnInit } from "@angular/core";
import { CoursService } from "src/app/services/cours.service";
import jwt_decode from "jwt-decode";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-courses-table",
  templateUrl: "./courses-table.component.html",
  styleUrls: ["./courses-table.component.css"],
})
export class CoursesTableComponent implements OnInit {
  constructor(private coursService: CoursService, private router: Router) {}
  coursesTab: [];
  decodedToken: any;

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    if (
      this.isLoggedIn() &&
      this.decodedToken &&
      this.decodedToken.role == "teacher"
    ) {
      this.coursService
        .getAllCoursByTeacherId(this.decodedToken.tel)
        .subscribe((response) => {
          this.coursesTab = response.courses;
        });
    }
  }
  isLoggedIn() {
    const token = sessionStorage.getItem("jwt");
    if (token) {
      this.decodedToken = this.decodeToken(token);
      console.log(this.decodedToken);
    }
    return !!token;
  }
  decodeToken(token: string) {
    return jwt_decode(token);
  }
  goToEditCours(id) {
    this.router.navigate([`edit-cours/${id}`]);
  }
  deleteCours(id) {
    this.coursService.deleteCours(id).subscribe((response) => {
      if (response.message == "deleted with success") {
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
}
