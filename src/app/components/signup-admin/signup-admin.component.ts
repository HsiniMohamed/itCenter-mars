import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-signup-admin",
  templateUrl: "./signup-admin.component.html",
  styleUrls: ["./signup-admin.component.css"],
})
export class SignupAdminComponent implements OnInit {
  signupForm: FormGroup;
  user: any = {};
  errorMsgPhone: any;
  errorMsgEmail: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      tel: ["", [Validators.required, Validators.pattern("[0-9 ]{8}")]],
      email: ["", [Validators.required, Validators.email]],
      pwd: [
        "",
        [Validators.required, Validators.minLength(6), Validators.maxLength(8)],
      ],
    });
  }
  signup() {
    this.signupForm.value.role = "admin";
    this.signupForm.value.validity = "valid";
    this.userService
      .signupAdmin(this.signupForm.value)
      .subscribe((response) => {
        if (response.message == "0") {
          this.errorMsgEmail = "Email Exists";
        } else if (response.message == "1") {
          this.errorMsgPhone = "Phone Exists";
        } else {
          // this.router.navigate(["login"])
        }
      });
  }
}
