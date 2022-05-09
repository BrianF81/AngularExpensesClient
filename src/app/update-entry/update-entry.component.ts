import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Type } from '../interfaces/type';
import { EntryService } from '../entry.service';
import { EntryElement } from '../interfaces/EntryElement';

@Component({
  selector: 'app-update-entry',
  templateUrl: './update-entry.component.html',
  styleUrls: ['./update-entry.component.css']
})


export class UpdateEntryComponent implements OnInit {
  
  types: Type[] = [
    { value: true, display: 'Expense' },
    { value: false, display: 'Income' },
  ]


  form: FormGroup;
  ID: number;

  constructor(private service: EntryService, private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateEntryComponent>,
    @Inject(MAT_DIALOG_DATA) { Description, IsExpense, Value, ID }: { Description: string, IsExpense: boolean, Value: number, ID: number}) {
    this.ID = ID;

    this.form = fb.group({
      description: [Description, Validators.required],
      isExpense: [IsExpense, Validators.required],
      value: [Value, Validators.required]
    })
  };

  close() {
    this.dialogRef.close();
  };

  save() {
    if (this.form.valid) {
      const entry: EntryElement = { Description: '', Value: 0, IsExpense: false, ID: 0 };
      entry.Description = this.form.value.description;
      entry.Value = this.form.value.value;
      entry.IsExpense = this.form.value.isExpense;
      this.form.value.ID = this.ID;
      this.service.updateEntry(this.ID, this.form.value).subscribe((data: any) => { console.log('Data - ', data); });
      this.dialogRef.close(entry);
    }    
  };

  ngOnInit(): void {
  }

}
