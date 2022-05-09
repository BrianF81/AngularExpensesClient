import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { EntryService } from '../entry.service';
import { EntryElement } from '../interfaces/EntryElement';
import { UpdateEntryComponent } from '../update-entry/update-entry.component';
import { MatPaginator } from '@angular/material/paginator';
import { DeleteEntryComponent } from '../delete-entry/delete-entry.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Description', 'IsExpense', 'Value', 'Actions']
  dataSource: any;
  @ViewChild(MatPaginator)
    paginator!: MatPaginator;

  constructor(private service: EntryService, private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef, private deleteDialog: MatDialog, private activatedRoute: ActivatedRoute) { }

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }

  onPaginateChange(event: any) {
    //alert(JSON.stringify("Current page index: " + event.pageIndex));
    this.selectedRowIndexValue = -1;
    this.selectedRowIndexDesc = -1;
    this.selectedRowIndexIsExpense = -1;
    this.deleteRowIndexValue = -1;
    this.pIndex = event.pageIndex;
  }

  ngOnInit() {
    //const entry: EntryElement = { Description:'', Value: 0, IsExpense:false,ID:0};
    this.refresh();
  }
  pageNum: any;
  pIndex: any;

  newValue = 0;
  newDesc = '';
  newIsExpense: any;

  deleteRowIndexValue = -1;
  
  origValue = 0;
  origDesc = '';
  origIsExpense: any;
  selectedRowIndexValue = -1;
  selectedRowIndexDesc = -1;
  selectedRowIndexIsExpense = -1;
  tempIndex = -1;
  logIndex(ind: any) {
    //this.selectedRowIndex = ind;
    this.selectedRowIndexValue = -1;
    this.selectedRowIndexDesc = -1;
    this.selectedRowIndexIsExpense = -1;
    this.tempIndex = ind;
    //console.log(ind);
  }
  
  logDeleteIndex(ind: any) {
    this.deleteRowIndexValue = ind;
  }
  
  deleteEntry(entry: EntryElement) {
    console.log(this.deleteRowIndexValue);
    this.deleteDialog.open(DeleteEntryComponent, { data: { entry } }).afterClosed().subscribe(() => { this.deleteRefresh(); });
  }

  deleteRefresh() {
    this.deleteRowIndexValue = -1;
    this.service.getAll().subscribe((data:any) => {
      this.dataSource = new MatTableDataSource<EntryElement>(data as EntryElement[]);
      this.dataSource.paginator = this.paginator;
    });
  }

  //removeFocus() {
  //  let buttonsList = document.getElementsByClassName('mat-raised-button');
  //  //iterate through all buttons
  //  for (let i = 0; i < buttonsList.length; i++) {
  //    //if the button is the one we want
  //    if (buttonsList[i].textContent === 'Delete') {        
  //      buttonsList[i].classList.remove("cdk-focused");
  //      buttonsList[i].classList.remove("cdk-program-focused");
  //    }
  //  }
  //}

  updateEntry(entry: EntryElement) {
    //console.log(entry);
    //console.log(entry.ID);
    //console.log('from edit button: ', entry.Description);
    this.origValue = entry.Value;
    this.origDesc = entry.Description;
    this.origIsExpense = entry.IsExpense;
    this.dialog.open(UpdateEntryComponent, { data: { ID: entry.ID, Description: entry.Description, IsExpense: entry.IsExpense, Value: entry.Value } }).afterClosed().subscribe((data: any) => { this.setValues(data); if (data != null) { this.refresh(); } });
    //this.dialog.open(UpdateEntryComponent, { data: { ID: entry.ID, Description: entry.Description, IsExpense: entry.IsExpense, Value: entry.Value } });
  }

  setValues(data: any) {

    if (data != null) {
      this.newValue = data.Value;
      this.newDesc = data.Description;
      this.newIsExpense = data.IsExpense;
    }
    else {
      let buttonsList = document.getElementsByClassName('mat-raised-button');
    //iterate through all buttons
    for (let i = 0; i < buttonsList.length; i++) {
      //if the button is the one we want
      if (buttonsList[i].textContent === 'Edit') {        
        buttonsList[i].classList.remove("cdk-focused");
        buttonsList[i].classList.remove("cdk-program-focused");
      }
    }
    }

  }
    

  refresh() {
    this.service.getAll().subscribe((data:any) => {
      //console.log('Result - ', data);

      this.pageNum = this.activatedRoute.snapshot.paramMap.get('pIndex');
      if (this.pageNum != null) {
        this.paginator.pageIndex = this.pageNum;
      }

      this.dataSource = new MatTableDataSource<EntryElement>(data as EntryElement[]);
      this.dataSource.paginator = this.paginator;

      this.pIndex = this.paginator.pageIndex;
      
      //console.log('tempIndex: ', this.tempIndex)
      //this.selectedRowIndex = this.tempIndex;

      if (this.tempIndex != -1) {
        const fields = data as EntryElement[];

        //console.log('Fields: ', fields[this.tempIndex].Description);

        //console.log('Original Desc: ', this.origDesc);
        //console.log('New Desc: ', fields[this.tempIndex].Description);
        //console.log('from data: ', data.Description);

        /*if (this.origValue != fields[this.tempIndex].Value) {*/
        if (this.origValue != this.newValue) {
          this.selectedRowIndexValue = this.tempIndex;
        }
        /*if (this.origDesc != fields[this.tempIndex].Description) {*/
        if (this.origDesc != this.newDesc) {
          this.selectedRowIndexDesc = this.tempIndex;
        }
        /*if (this.origIsExpense != fields[this.tempIndex].IsExpense) {*/
        if (this.origIsExpense != this.newIsExpense) {
          this.selectedRowIndexIsExpense = this.tempIndex;
        }
      }
      
      //const changedFields = (<any>Object).entries(data);
      //console.log(changedFields[this.tempIndex]);

    });

  }

}
