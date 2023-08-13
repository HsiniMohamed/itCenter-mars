import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-signup-parent",
  templateUrl: "./signup-parent.component.html",
  styleUrls: ["./signup-parent.component.css"],
})
export class SignupParentComponent implements OnInit {
  signupForm: FormGroup;

  user: any = {};
  errorMsgPhone: any;
  errorMsgPhoneChild: any;
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
      telChild: ["", [Validators.required, Validators.pattern("[0-9 ]{8}")]],
      adresse: [""],
      email: ["", [Validators.required, Validators.email]],
      pwd: [
        "",
        [Validators.required, Validators.minLength(6), Validators.maxLength(8)],
      ],
    });
  }
  signup() {
    this.signupForm.value.role = "parent";
    this.signupForm.value.validity = "valid";
    this.userService
      .signupParent(this.signupForm.value)
      .subscribe((response) => {
        console.log("respnse", response);

        if (response.message == "0") {
          this.errorMsgPhoneChild = "Phone Child Not Found";
        } else if (response.message == "2") {
          this.errorMsgPhone = "Phone Exists";
        } else if (response.message == "1") {
          this.errorMsgEmail = "Email Exists";
        } else {
          this.router.navigate([""]);
        }
      });
  }
}
