import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {MatSnackBar} from "@angular/material";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  loader = new BehaviorSubject<boolean>(false);
  constructor(private Notification: MatSnackBar) { }

  onSessionStorageSave(id: string) {
    sessionStorage.setItem('publisherId', id);
  }

  onSessionStorageLoad() {
      const id = sessionStorage.getItem('publisherId');
      if (id) {
        return id;
      }
  }

  messageNotification(message, action) {
    this.Notification.open(message, action, {
      duration: 4000
    })
  }
}
