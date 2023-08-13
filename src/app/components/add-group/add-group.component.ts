import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { CoursService } from "src/app/services/cours.service";
import { GroupeService } from "src/app/services/groupe.service";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-add-group",
  templateUrl: "./add-group.component.html",
  styleUrls: ["./add-group.component.css"],
})
export class AddGroupComponent implements OnInit {
  groupForm: FormGroup;

  groupe: any = {};
  constructor(
    private groupeService: GroupeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.groupe.coursId = this.activatedRoute.snapshot.paramMap.get("idCours");
    this.groupe.teacherId =
      this.activatedRoute.snapshot.paramMap.get("idTeacher");
  }
  addGroup() {
    this.groupeService.addGroupe(this.groupe).subscribe((response) => {
      if (response.message == "added with success") {
        Swal.fire({
          icon: "success",
          text: "Group added with success  !",
        });
        this.router.navigate(["admin"]);
      }
    });
  }
}
