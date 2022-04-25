import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { EntryService } from '../entry.service';
import { EntryElement } from '../interfaces/EntryElement';
import { UpdateEntryComponent } from '../update-entry/update-entry.component';
import { MatPaginator } from '@angular/material/paginator';
import { DeleteEntryComponent } from '../delete-entry/delete-entry.component';

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

  constructor(private service: EntryService, private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef, private deleteDialog: MatDialog) { }

  ngAfterViewInit() {
    /*this.dataSource.paginator = this.paginator;*/
  }

  onPaginateChange(event: any) {
    //alert(JSON.stringify("Current page index: " + event.pageIndex));
    this.selectedRowIndexValue = -1;
    this.selectedRowIndexDesc = -1;
    this.selectedRowIndexIsExpense = -1;
  }

  ngOnInit() {
    this.refresh();
  }

  
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

  deleteEntry(entry: EntryElement) {
    this.deleteDialog.open(DeleteEntryComponent, { data: { entry } });
  }

  updateEntry(entry: EntryElement) {
    //console.log(entry);
    //console.log(entry.ID);
    this.origValue = entry.Value;
    this.origDesc = entry.Description;
    this.origIsExpense = entry.IsExpense;
    this.dialog.open(UpdateEntryComponent, { data: { ID: entry.ID, Description: entry.Description, IsExpense: entry.IsExpense, Value: entry.Value } }).afterClosed().subscribe(result => { this.refresh(); });
    //this.dialog.open(UpdateEntryComponent, { data: { ID: entry.ID, Description: entry.Description, IsExpense: entry.IsExpense, Value: entry.Value } });
  }

  refresh() {
    this.service.getAll().subscribe((data) => {
      //console.log('Result - ', data);
      this.dataSource = new MatTableDataSource<EntryElement>(data as EntryElement[]);
      this.dataSource.paginator = this.paginator;

      //console.log('tempIndex: ', this.tempIndex)
      //this.selectedRowIndex = this.tempIndex;

      if (this.tempIndex != -1) {
        const fields = data as EntryElement[];

        //console.log('Fields: ', fields[this.tempIndex].Description);

        //console.log('Original Desc: ', this.origDesc);
        //console.log('New Desc: ', fields[this.tempIndex].Description);

        if (this.origValue != fields[this.tempIndex].Value) {
          this.selectedRowIndexValue = this.tempIndex;
        }
        if (this.origDesc != fields[this.tempIndex].Description) {
          this.selectedRowIndexDesc = this.tempIndex;
        }
        if (this.origIsExpense != fields[this.tempIndex].IsExpense) {
          this.selectedRowIndexIsExpense = this.tempIndex;
        }
      }
      
      //const changedFields = (<any>Object).entries(data);
      //console.log(changedFields[this.tempIndex]);

    });

  }

}
