import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NoteListComponent } from './note-list/note-list.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '', component: MainPageComponent,
    children: [
      { path: '', component: NoteListComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
