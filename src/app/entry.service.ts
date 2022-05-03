import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EntryElement } from './interfaces/EntryElement';


@Injectable({
  providedIn: 'root'
})
export class EntryService {

  baseUrl: string = 'http://localhost:16956/api/entries';

  constructor(private http: HttpClient) { }

  getEntryByID(ID: number) {
    return this.http.get(this.baseUrl + '/' + ID);
  }
  
  getAll() {
    return this.http.get(this.baseUrl);
  }

  createEntry(entry: EntryElement) {
    return this.http.post(this.baseUrl, entry);

  }

  updateEntry(ID: number, entry: EntryElement) {
    return this.http.put(this.baseUrl + '/' + ID, entry);

  }

  deleteEntry(ID: number, entry: EntryElement) {
    return this.http.request('delete', this.baseUrl + '/' + ID, { body: entry });
  }

}
