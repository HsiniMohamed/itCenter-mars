import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      tel: ["", [Validators.required, Validators.pattern("[0-9 ]{8}")]],
      pwd: ["", [Validators.required]],
    });
  }
  login() {
    this.userService.login(this.loginForm.value).subscribe((response) => {
      console.log("here response from back end", response);
      if (response.msg == "2") {
        sessionStorage.setItem("jwt", response.user);
        this.router.navigate([""]);
      } else if (response.msg == "4") {
        Swal.fire({
          icon: "error",

          text: "Please Check validity with admin!",
          footer: '<a href="">admin@gmail.com</a>',
        });
      } else {
        this.errorMsg = "Please Check email/pwd";
      }
    });
  }
}
