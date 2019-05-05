import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {MatSnackBar} from "@angular/material";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  loader = new BehaviorSubject<boolean>(false);
  constructor(private Notification: MatSnackBar) { }

  onSessionStorageSave(key: string, value) {
    sessionStorage.setItem(key, value);
  }

  onSessionStorageLoad(key) {
      const id = sessionStorage.getItem(key);
      if (id) {
        return id;
      }
  }

  onSessionStorageRemove(key) {
    sessionStorage.removeItem(key)
  }

  messageNotification(message, action, messagetype) {
    this.Notification.open(message, action, {
      duration: 3500,
      panelClass: messagetype,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    })
  }
}
