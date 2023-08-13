import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-display-parents",
  templateUrl: "./display-parents.component.html",
  styleUrls: ["./display-parents.component.css"],
})
export class DisplayParentsComponent implements OnInit {
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
  getAll() {
    this.userService.getAllParents().subscribe((response) => {
      console.log(response.usersTab);
      this.usersTab = response.usersTab;
    });
  }
}
