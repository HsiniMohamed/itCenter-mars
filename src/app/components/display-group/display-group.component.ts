import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GroupeService } from "src/app/services/groupe.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-display-group",
  templateUrl: "./display-group.component.html",
  styleUrls: ["./display-group.component.css"],
})
export class DisplayGroupComponent implements OnInit {
  groupesTab: [];
  constructor(private groupeService: GroupeService, private router: Router) {}

  ngOnInit() {
    this.getAll();
  }
  deleteGroupe(id) {
    this.groupeService.deleteGroup(id).subscribe((response) => {
      if (response.message == "deleted with success") {
        Swal.fire({
          title: "Group deleted !!",
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
    this.groupeService.getAllGroupes().subscribe((response) => {
      console.log(response.groupes);
      this.groupesTab = response.groupes;
    });
  }
  showDetails(id) {
    this.router.navigate([`group-infos/${id}`]);
  }
}
