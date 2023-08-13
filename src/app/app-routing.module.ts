import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { SignupStudentComponent } from "./components/signup-student/signup-student.component";
import { SignupTeacherComponent } from "./components/signup-teacher/signup-teacher.component";
import { SignupParentComponent } from "./components/signup-parent/signup-parent.component";
import { SignupAdminComponent } from "./components/signup-admin/signup-admin.component";
import { LoginComponent } from "./components/login/login.component";
import { AddCoursComponent } from "./components/add-cours/add-cours.component";
import { CoursesComponent } from "./components/courses/courses.component";
import { CoursesTableComponent } from "./components/courses-table/courses-table.component";
import { AddGroupComponent } from "./components/add-group/add-group.component";
import { AdminComponent } from "./components/admin/admin.component";
import { EditTeacherComponent } from "./components/edit-teacher/edit-teacher.component";
import { GroupInfosComponent } from "./components/group-infos/group-infos.component";
import { DashboardTeacherComponent } from "./components/dashboard-teacher/dashboard-teacher.component";
import { AddNoteComponent } from "./components/add-note/add-note.component";
import { TeachersComponent } from "./components/teachers/teachers.component";
import { SearchTeacherComponent } from "./components/search-teacher/search-teacher.component";
import { CoursesStudentComponent } from "./components/courses-student/courses-student.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "signup-student", component: SignupStudentComponent },
  { path: "signup-teacher", component: SignupTeacherComponent },
  { path: "signup-parent", component: SignupParentComponent },
  { path: "signup-admin", component: SignupAdminComponent },
  { path: "login", component: LoginComponent },
  { path: "add-cours", component: AddCoursComponent },
  { path: "edit-cours/:id", component: AddCoursComponent },
  { path: "courses", component: CoursesComponent },
  { path: "teachers", component: TeachersComponent },
  { path: "search-teachers", component: SearchTeacherComponent },
  { path: "add-group/:idCours/:idTeacher", component: AddGroupComponent },
  { path: "admin", component: AdminComponent },
  { path: "edit-teacher/:id", component: EditTeacherComponent },
  { path: "group-infos/:id", component: GroupInfosComponent },
  { path: "dashboard-teacher", component: DashboardTeacherComponent },
  {
    path: "add-note/:studentId/:teacherId/:coursId/:groupeId",
    component: AddNoteComponent,
  },
  { path: "courses-student", component: CoursesStudentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
