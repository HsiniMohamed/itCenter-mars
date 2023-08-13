import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-signup-student",
  templateUrl: "./signup-student.component.html",
  styleUrls: ["./signup-student.component.css"],
})
export class SignupStudentComponent implements OnInit {
  signupForm: FormGroup;
  imagePreview: any;
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
      email: ["", [Validators.required, Validators.email]],
      pwd: [
        "",
        [Validators.required, Validators.minLength(6), Validators.maxLength(8)],
      ],
      photo: [""],
    });
  }
  signup() {
    this.signupForm.value.role = "student";
    this.signupForm.value.validity = "valid";
    this.userService
      .signupStudent(this.signupForm.value, this.signupForm.value.photo)
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
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({ photo: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
