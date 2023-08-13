import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NoteService } from "src/app/services/note.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-add-note",
  templateUrl: "./add-note.component.html",
  styleUrls: ["./add-note.component.css"],
})
export class AddNoteComponent implements OnInit {
  noteForm: FormGroup;
  note: any = {};
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private noteService: NoteService
  ) {}

  ngOnInit() {
    this.note.teacherId =
      this.activatedRoute.snapshot.paramMap.get("teacherId");
    this.note.studentId =
      this.activatedRoute.snapshot.paramMap.get("studentId");
    this.note.groupeId = this.activatedRoute.snapshot.paramMap.get("groupeId");
    this.note.coursId = this.activatedRoute.snapshot.paramMap.get("coursId");
  }
  addNote() {
    this.noteService.addNote(this.note).subscribe((response) => {
      console.log("here response", response);
      if (response.message == "added with success") {
        Swal.fire({
          icon: "success",
          text: "note added with success  !",
        });
        this.router.navigate([`group-infos/${this.note.groupeId}`]);
      }
    });
  }
}
