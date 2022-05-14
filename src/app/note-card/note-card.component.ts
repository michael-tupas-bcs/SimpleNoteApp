import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Note } from '../shared/note.model';
import {MatDialog} from '@angular/material/dialog';
import { NoteDetailsComponent } from '../note-details/note-details.component';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  @Input() notes?: Note[] = new Array<Note>();
  @Input() id?: number;
  @Input() title?: string;
  @Input() body?: string;

  @ViewChild('truncator', {static: true}) truncator?: ElementRef<HTMLElement>;
  @ViewChild('bodyText', {static: true}) bodyText?: ElementRef<HTMLElement>;

  constructor(private authService: AuthServiceService, public dialog: MatDialog) { }
  
  @ViewChild(NoteDetailsComponent) noteDetail?: NoteDetailsComponent;

  ngOnInit() {
  }

  deleteNote(id: number){
    if(confirm("Are you sure?")){
      this.authService.deleteNote(id).subscribe(response =>{
        location.reload();
      });
    }
  }

  editNoteControl(id: number, title: string, body: string){
    this.notes = [{
      id : id,
      title : title,
      body : body
    }];

    this.dialog.open(NoteDetailsComponent,{
      data:this.notes
    });
    
  }
  openDialog(){
    const dialogRef = this.dialog.open(NoteDetailsComponent);
    dialogRef.componentInstance.notes = this.notes;
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
}
