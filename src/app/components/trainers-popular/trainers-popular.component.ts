import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-trainers-popular",
  templateUrl: "./trainers-popular.component.html",
  styleUrls: ["./trainers-popular.component.css"],
})
export class TrainersPopularComponent implements OnInit {
  usersTab: [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAllTeachers().subscribe((response) => {
      console.log(response.usersTab);
      this.usersTab = response.usersTab;
    });
  }
}
