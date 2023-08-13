import { Component, OnInit } from "@angular/core";
import { UserService } from "./../../services/user.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-display-teachers",
  templateUrl: "./display-teachers.component.html",
  styleUrls: ["./display-teachers.component.css"],
})
export class DisplayTeachersComponent implements OnInit {
  usersTab: [];
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.getAll();
  }
  deleteUser(id) {
    this.userService.deleteUserById(id).subscribe((response) => {
      if (response.msg == "deleted with success") {
        Swal.fire({
          title: "USer deleted !!",
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
  validate(id) {
    this.router.navigate([`edit-teacher/${id}`]);
  }
  getAll() {
    this.userService.getAllTeachers().subscribe((response) => {
      console.log(response.usersTab);
      this.usersTab = response.usersTab;
    });
  }
}
