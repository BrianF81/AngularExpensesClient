import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EntryService } from '../entry.service';
import { Type } from '../interfaces/type';
import { FormBuilder, FormGroupDirective } from '@angular/forms';
import { ViewChild } from '@angular/core';



@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.css']
})
export class NewEntryComponent {

  @ViewChild(FormGroupDirective)
    formGroupDirective!: FormGroupDirective;

  types: Type[] = [
    { value: true, display: 'Expense' },
    { value: false, display: 'Income' },
  ]

  

  constructor(private service: EntryService, private fb: FormBuilder) { }

  status: string = '';

  entryForm = this.fb.group({
    description: ['', Validators.required],
    isExpense: ['', Validators.required],
    value: ['', [Validators.required, Validators.pattern('\\d+\\.?\\d*')]]
  })

  //entryForm = new FormGroup({
  //  description: new FormControl('', Validators.required),
  //  isExpense: new FormControl('', Validators.required),
  //  value: new FormControl('', [Validators.required, Validators.pattern('\\d+\\.?\\d*')])
  //})

  onSubmit() {
    console.log(this.entryForm.value);
    if (this.entryForm.valid) {
      this.service.createEntry(this.entryForm.value).subscribe((data) => console.log('Data - ', data));
      //this.entryForm.reset();
      this.formGroupDirective.resetForm();
      this.status = 'Entry created.'
      //this.entryForm.controls['description'].setErrors(null);
      //this.entryForm.controls['isExpense'].setErrors(null);
      //this.entryForm.controls['value'].setErrors(null);
      //this.entryForm.controls['description'].setValidators(Validators.required);
      //this.entryForm.controls['isExpense'].setValidators(Validators.required);
      //this.entryForm.controls['value'].setValidators([Validators.required, Validators.pattern('\\d+\\.?\\d*')]);
      //this.entryForm.invalid;
    }

    
    
  }

}


