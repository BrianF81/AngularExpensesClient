import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { EntriesComponent } from './entries/entries.component';
import { NewEntryComponent } from './new-entry/new-entry.component';

const routes: Routes = [
  { path: '', component: EntriesComponent},
  { path: 'entries', component: EntriesComponent },
  { path: 'new-entry', component: NewEntryComponent }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRouterModule { }
