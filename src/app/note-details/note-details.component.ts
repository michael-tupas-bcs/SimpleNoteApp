import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Injectable } from '@angular/core';
import { Note } from '../shared/note.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {
  formGroup !: FormGroup;
  notes: Note[] = new Array<Note>();
  actionLabel : string = "Add New Note";
  actionBtn : string = "Save";
  constructor(private authService:AuthServiceService,
    private formBuilder: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef:MatDialogRef<NoteDetailsComponent>) { }

  ngOnInit(): void {
    this.initForm();

    if(this.editData){
      this.actionLabel = "Update Note";
      this.actionBtn = "Update";
      this.formGroup.controls['title'].setValue(this.editData[0].title);
      this.formGroup.controls['body'].setValue(this.editData[0].body);
    }
  }

  initForm(){
    this.formGroup = this.formBuilder.group({
      title: ['',Validators.required],
      body: ['',Validators.required],
    });
  }

  saveNoteProcess(){
    if(!this.editData){
      if(this.formGroup.valid){
        this.authService.addNote(this.formGroup.value).subscribe(response =>{
          this.formGroup.reset();
          this.dialogRef.close();
          location.reload();
        });
      }
    }else{
      if(this.formGroup.valid){

        this.notes = [{
          "id": this.editData[0].id,
          "title": this.formGroup.controls['title'].value,
          "body": this.formGroup.controls['body'].value
        }];        
        this.authService.updateNote(this.notes[0]).subscribe(response =>{
          this.formGroup.reset();
          this.dialogRef.close();
          location.reload();
        });
      }
    }
  }
}
