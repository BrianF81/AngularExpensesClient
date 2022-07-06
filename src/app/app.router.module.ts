import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { DetailsEntryComponent } from './details-entry/details-entry.component';
import { EntriesComponent } from './entries/entries.component';
import { NewEntryComponent } from './new-entry/new-entry.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: EntriesComponent },
  { path: 'entries', component: EntriesComponent },
  { path: 'entries/page/:pIndex', component: EntriesComponent },
  { path: 'new-entry', component: NewEntryComponent },
  { path: 'details-entry/:ID/:pIndex', component: DetailsEntryComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRouterModule { }
