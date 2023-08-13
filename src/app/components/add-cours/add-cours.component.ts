import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CoursService } from "src/app/services/cours.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-add-cours",
  templateUrl: "./add-cours.component.html",
  styleUrls: ["./add-cours.component.css"],
})
export class AddCoursComponent implements OnInit {
  coursForm: FormGroup;
  cours: any = {};
  id: any;
  tittle: string = "Add Cours";
  constructor(
    private router: Router,
    private coursService: CoursService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");

    if (this.id) {
      this.tittle = "Edit Cours";
      this.coursService.getCoursById(this.id).subscribe((response) => {
        this.cours = response.cours;
      });
    }
  }

  addCours() {
    if (this.id) {
      this.coursService.editCours(this.cours).subscribe((response) => {
        if (response.message == "0") {
          Swal.fire({
            icon: "error",
            text: "Please Check Teacher Id  !",
          });
        } else if (response.message == "echec") {
          Swal.fire({
            icon: "error",
            text: "echec !",
          });
        } else {
          Swal.fire({
            icon: "success",
            text: "cours edited with success  !",
          });
        }
      });
    } else {
      this.coursService.addCours(this.cours).subscribe((response) => {
        if (response.message == "0") {
          Swal.fire({
            icon: "error",
            text: "Please Check Teacher Id  !",
          });
        } else {
          Swal.fire({
            icon: "success",
            text: "cours added with success  !",
          });
        }
      });
    }
  }
}
