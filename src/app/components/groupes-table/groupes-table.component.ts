import { Component, OnInit } from "@angular/core";
import { GroupeService } from "src/app/services/groupe.service";
import jwt_decode from "jwt-decode";
import { Router } from "@angular/router";
@Component({
  selector: "app-groupes-table",
  templateUrl: "./groupes-table.component.html",
  styleUrls: ["./groupes-table.component.css"],
})
export class GroupesTableComponent implements OnInit {
  groupesTab: [];
  decodedToken: any;

  constructor(private groupeService: GroupeService, private router: Router) {}

  ngOnInit() {
    if (
      this.isLoggedIn() &&
      this.decodedToken &&
      this.decodedToken.role == "teacher"
    ) {
      console.log(this.decodedToken.tel);

      this.groupeService
        .getGroupeByIdTeacher(this.decodedToken.tel)
        .subscribe((response) => {
          this.groupesTab = response.groupe;
          console.log(this.groupesTab);
        });
    }
  }
  isLoggedIn() {
    const token = sessionStorage.getItem("jwt");
    if (token) {
      this.decodedToken = this.decodeToken(token);
      console.log(this.decodedToken);
    }
    return !!token;
  }
  decodeToken(token: string) {
    return jwt_decode(token);
  }
  showDetails(id) {
    this.router.navigate([`group-infos/${id}`]);
  }
}
