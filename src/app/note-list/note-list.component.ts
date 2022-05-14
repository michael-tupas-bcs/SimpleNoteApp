import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './../auth-service.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { Note } from '../shared/note.model';
import { MatDialog } from '@angular/material/dialog';
import { NoteDetailsComponent } from '../note-details/note-details.component';


@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})

export class NoteListComponent implements OnInit {
  
  userid: any;
  helper = new JwtHelperService();
  notes: Note[] = new Array<Note>();
  
  constructor(private router: Router, public authService: AuthServiceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.checkToken()) {
      alert("Token has been expired!");
      this.router.navigate(['login']);
    }
    this.userid = localStorage.getItem('userid');
    this.getNotesListUser();
  }

  getNotesListUser(){
    this.authService.getNotesListUser(this.userid).subscribe(response => {
        this.notes = response.data;
    });
  }
  checkToken() {
    var token = localStorage.getItem('token');
    return this.helper.isTokenExpired(token?.toString());
  }
  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    this.router.navigate(['login']);
  }

  openDialog(){
    const dialogRef = this.dialog.open(NoteDetailsComponent);

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
}
