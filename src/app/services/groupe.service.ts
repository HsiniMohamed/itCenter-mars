import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class GroupeService {
  //declaration de destination du serveur

  groupeURL: string = "http://localhost:3000/api/groupes";
  constructor(private httpClient: HttpClient) {}
  getAllGroupes() {
    return this.httpClient.get<{ groupes: any; message: string }>(
      this.groupeURL
    );
  }
  getGroupeById(id) {
    return this.httpClient.get<{ groupe: any }>(`${this.groupeURL}/${id}`);
  }
  getGroupeByIdTeacher(id) {
    return this.httpClient.get<{ groupe: any }>(
      `${this.groupeURL}/teachers/${id}`
    );
  }
  addGroupe(groupeObj) {
    return this.httpClient.post<{ message: string }>(this.groupeURL, groupeObj);
  }
  editGroup(newObj) {
    return this.httpClient.put<{ message: string }>(this.groupeURL, newObj);
  }
  deleteGroup(id) {
    return this.httpClient.delete<{ message: string }>(
      `${this.groupeURL}/${id}`
    );
  }
}
