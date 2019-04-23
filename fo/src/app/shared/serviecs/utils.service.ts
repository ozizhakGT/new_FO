import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  publisherId = new Subject<string>();
  constructor() { }

  onSessionStorageSave(id: string) {
    sessionStorage.setItem('publisherId', id);
  }

  onSessionStorageLoad() {
      const id = sessionStorage.getItem('publisherId');
      if (id) {
        return id;
      }
  }
}
