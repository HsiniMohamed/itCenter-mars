import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { CountsComponent } from './components/counts/counts.component';
import { WhyUsComponent } from './components/why-us/why-us.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseComponent } from './components/course/course.component';
import { CoursesPopularComponent } from './components/courses-popular/courses-popular.component';
import { TrainersPopularComponent } from './components/trainers-popular/trainers-popular.component';
import { TrainerComponent } from './components/trainer/trainer.component';
import { SignupTeacherComponent } from './components/signup-teacher/signup-teacher.component';
import { SignupStudentComponent } from './components/signup-student/signup-student.component';
import { SignupParentComponent } from './components/signup-parent/signup-parent.component';
import { SignupAdminComponent } from './components/signup-admin/signup-admin.component';
import { LoginComponent } from './components/login/login.component';
import { AddCoursComponent } from './components/add-cours/add-cours.component';
import { AddGroupeComponent } from './components/add-groupe/add-groupe.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { AddGroupComponent } from './components/add-group/add-group.component';
import { AdminComponent } from './components/admin/admin.component';
import { DisplayStudentsComponent } from './components/display-students/display-students.component';
import { DisplayTeachersComponent } from './components/display-teachers/display-teachers.component';
import { DisplayParentsComponent } from './components/display-parents/display-parents.component';
import { DisplayCoursComponent } from './components/display-cours/display-cours.component';
import { DisplayGroupComponent } from './components/display-group/display-group.component';
import { EditTeacherComponent } from './components/edit-teacher/edit-teacher.component';
import { GroupInfosComponent } from './components/group-infos/group-infos.component';
import { DashboardTeacherComponent } from './components/dashboard-teacher/dashboard-teacher.component';
import { GroupesTableComponent } from './components/groupes-table/groupes-table.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { SearchTeacherComponent } from './components/search-teacher/search-teacher.component';
import { CoursesStudentComponent } from './components/courses-student/courses-student.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, HomeComponent, HeroComponent, AboutComponent, CountsComponent, WhyUsComponent, CoursesComponent, CourseComponent, CoursesPopularComponent, TrainersPopularComponent, TrainerComponent, SignupTeacherComponent, SignupStudentComponent, SignupParentComponent, SignupAdminComponent, LoginComponent, AddCoursComponent, AddGroupeComponent, CoursesTableComponent, AddGroupComponent, AdminComponent, DisplayStudentsComponent, DisplayTeachersComponent, DisplayParentsComponent, DisplayCoursComponent, DisplayGroupComponent, EditTeacherComponent, GroupInfosComponent, DashboardTeacherComponent, GroupesTableComponent, AddNoteComponent, TeachersComponent, SearchTeacherComponent, CoursesStudentComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
