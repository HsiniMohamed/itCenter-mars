import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-edit-teacher",
  templateUrl: "./edit-teacher.component.html",
  styleUrls: ["./edit-teacher.component.css"],
})
export class EditTeacherComponent implements OnInit {
  validateForm: FormGroup;
  user: any = {};
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService
      .getUserById(this.activatedRoute.snapshot.paramMap.get("id"))
      .subscribe((response) => {
        this.user = response.user;
      });
  }
  ToValidate() {
    this.userService.validateTeacher(this.user).subscribe((response) => {
      if (response.msg == "OK") {
        Swal.fire({
          title: "USer valid !!",
          showConfirmButton: false,
          icon: "success",
        });
        this.router.navigate(["admin"]);
      }
    });
  }
}
