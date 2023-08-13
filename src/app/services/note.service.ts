import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class NoteService {
  //declaration de destination du serveur

  noteURL: string = "http://localhost:3000/api/notes";
  constructor(private httpClient: HttpClient) {}
  // getNoteById(id) {
  //   return this.httpClient.get<{ note: any }>(`${this.noteURL}/${id}`);
  // }
  searchNoteByTel(tel) {
    return this.httpClient.get<{ notes: any }>(`${this.noteURL}/${tel}`);
  }
  addNote(noteObj) {
    return this.httpClient.post<{ message: string }>(this.noteURL, noteObj);
  }
}
