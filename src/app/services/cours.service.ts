import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CoursService {
  //declaration de destination du serveur

  coursURL: string = "http://localhost:3000/api/cours";
  constructor(private httpClient: HttpClient) {}

  getAllCours() {
    return this.httpClient.get<{ courses: any; message: string }>(
      this.coursURL
    );
  }
  getAllCoursByTeacherId(teacherId) {
    return this.httpClient.get<{ courses: any; message: string }>(
      `${this.coursURL}/teacher/${teacherId}`
    );
  }
  getCoursById(id) {
    return this.httpClient.get<{ cours: any }>(`${this.coursURL}/${id}`);
  }

  addCours(coursObj) {
    return this.httpClient.post<{ message: string }>(this.coursURL, coursObj);
  }
  editCours(newObj) {
    return this.httpClient.put<{ message: string }>(this.coursURL, newObj);
  }
  deleteCours(id) {
    return this.httpClient.delete<{ message: string }>(
      `${this.coursURL}/${id}`
    );
  }
}
