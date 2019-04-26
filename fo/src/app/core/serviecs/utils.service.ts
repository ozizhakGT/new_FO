import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  loader = new BehaviorSubject<boolean>(false);
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
