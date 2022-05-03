import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntryElement } from '../interfaces/EntryElement';
import { EntryService } from '../entry.service';
import { Type } from '../interfaces/type';


@Component({
  selector: 'app-delete-entry',
  templateUrl: './delete-entry.component.html',
  styleUrls: ['./delete-entry.component.css']
})
export class DeleteEntryComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { entry: EntryElement }, public dialogRef: MatDialogRef<DeleteEntryComponent>, private service: EntryService) { }

  types: Type[] = [
    { value: true, display: 'Expense' },
    { value: false, display: 'Income' },
  ]

  
  ngOnInit(): void {
  }


  cancel() {
    this.dialogRef.close();
  }

  delete() {
    console.log(this.data);
    this.service.deleteEntry(this.data.entry.ID, this.data.entry).subscribe((data) => console.log('Data - ', data));
    this.dialogRef.close();
  }

}
