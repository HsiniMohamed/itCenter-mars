import { Component, OnInit } from "@angular/core";
import { CoursService } from "src/app/services/cours.service";

@Component({
  selector: "app-courses-popular",
  templateUrl: "./courses-popular.component.html",
  styleUrls: ["./courses-popular.component.css"],
})
export class CoursesPopularComponent implements OnInit {
  courses: [];
  constructor(private coursService: CoursService) {}

  ngOnInit() {
    this.coursService.getAllCours().subscribe((respnse) => {
      this.courses = respnse.courses;
    });
  }
}
