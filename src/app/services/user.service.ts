import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UserService {
  //declaration de destination du serveur

  userURL: string = "http://localhost:3000/api/users";
  constructor(private httpClient: HttpClient) {}
  login(user) {
    return this.httpClient.post<{ user: any; msg: string }>(
      this.userURL + "/login",
      user
    );
  }

  signupParent(user) {
    return this.httpClient.post<{ message: string }>(
      this.userURL + "/signup/parent",
      user
    );
  }
  signupAdmin(user) {
    return this.httpClient.post<{ message: string }>(
      this.userURL + "/signup/admin",
      user
    );
  }
  signupStudent(userObj: any, photo: File) {
    let formData = new FormData();
    formData.append("firstName", userObj.firstName);
    formData.append("lastName", userObj.lastName);
    formData.append("tel", userObj.tel);
    formData.append("adresse", userObj.adresse);
    formData.append("email", userObj.email);
    formData.append("pwd", userObj.pwd);
    formData.append("photo", photo);
    formData.append("role", userObj.role);
    formData.append("validity", userObj.validity);

    return this.httpClient.post<{ message: string }>(
      this.userURL + "/signup/student",
      formData
    );
  }
  signupTeacher(userObj: any, cv: File) {
    let formData = new FormData();
    formData.append("firstName", userObj.firstName);
    formData.append("lastName", userObj.lastName);
    formData.append("tel", userObj.tel);
    formData.append("adresse", userObj.adresse);
    formData.append("specialite", userObj.specialite);
    formData.append("email", userObj.email);
    formData.append("pwd", userObj.pwd);
    formData.append("cv", cv);
    formData.append("role", userObj.role);
    formData.append("validity", userObj.validity);

    return this.httpClient.post<{ message: string }>(
      this.userURL + "/signup/teacher",
      formData
    );
  }
  getAllTeachers() {
    return this.httpClient.get<{ usersTab: any; message: string }>(
      this.userURL + "/teachers"
    );
  }
  validateTeacher(obj) {
    return this.httpClient.put<{ msg: string }>(this.userURL, obj);
  }
  getAllStudents() {
    return this.httpClient.get<{ usersTab: any; message: string }>(
      this.userURL + "/students"
    );
  }
  getAllParents() {
    return this.httpClient.get<{ usersTab: any; message: string }>(
      this.userURL + "/parents"
    );
  }
  getUserById(id) {
    return this.httpClient.get<{ user: any }>(`${this.userURL}/${id}`);
  }
  deleteUserById(id) {
    return this.httpClient.delete<{ msg: string }>(`${this.userURL}/${id}`);
  }
  searchTeachersBySpecialite(specialite: string) {
    return this.httpClient.get<{ usersTab: any }>(
      `${this.userURL}/teachers/${specialite}`
    );
  }
}
