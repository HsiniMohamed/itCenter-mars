import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CoursService } from "src/app/services/cours.service";

@Component({
  selector: "app-course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
})
export class CourseComponent implements OnInit {
  @Input() coursInput: any;
  @Output() coursesToSend: EventEmitter<any> = new EventEmitter();
  constructor(private coursService: CoursService) {}

  ngOnInit() {}
  deleteCours(id) {
    this.coursService.deleteCours(id).subscribe((response) => {
      console.log("here response", response.message);
      this.coursService.getAllCours().subscribe((data) => {
        this.coursesToSend.emit(data.courses);
      });
    });
  }
}
