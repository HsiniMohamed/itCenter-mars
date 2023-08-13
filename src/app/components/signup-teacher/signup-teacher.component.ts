import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-signup-teacher",
  templateUrl: "./signup-teacher.component.html",
  styleUrls: ["./signup-teacher.component.css"],
})
export class SignupTeacherComponent implements OnInit {
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
      adresse: [""],
      specialite: [""],
      email: ["", [Validators.required, Validators.email]],
      pwd: [
        "",
        [Validators.required, Validators.minLength(6), Validators.maxLength(8)],
      ],
      cv: [""],
    });
  }
  signup() {
    this.signupForm.value.role = "teacher";
    this.signupForm.value.validity = "en attente";
    this.userService
      .signupTeacher(this.signupForm.value, this.signupForm.value.cv)
      .subscribe((response) => {
        if (response.message == "0") {
          this.errorMsgEmail = "Email Exists";
        } else if (response.message == "1") {
          this.errorMsgPhone = "Phone Exists";
        } else {
          this.router.navigate(["login"]);
        }
      });
  }

  onCvSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({ cv: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();

    reader.readAsDataURL(file);
  }
}
