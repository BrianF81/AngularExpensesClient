import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute } from '@angular/router';
import { EntryService } from '../entry.service';
import { EntryElement } from '../interfaces/EntryElement';

@Component({
  selector: 'app-details-entry',
  templateUrl: './details-entry.component.html',
  styleUrls: ['./details-entry.component.css']
})
export class DetailsEntryComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private service: EntryService) { }

  ID: any;

  entry = {
    description: '',
    value: 0,
    isExpense: false
  }

  ngOnInit(): void {
    this.ID = this.activatedRoute.snapshot.paramMap.get('ID');
    this.service.getEntryByID(this.ID).subscribe((data:any) => {
      this.entry.description = data.Description;
      this.entry.value = data.Value;
      this.entry.isExpense = data.IsExpense;
    });
    
    }
  
}

