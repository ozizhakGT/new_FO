import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
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
