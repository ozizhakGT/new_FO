import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material";
import {BehaviorSubject, Subject} from "rxjs";

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

  onSessionStorageCheckExistKey(key) {
    for (let i = 0; i < sessionStorage.length; i++) {
      return sessionStorage[i] === key;
    }
  }
  messageNotification(message, action, messagetype) {
    let textMessage: string;
    switch (messagetype) {
      case 'success':
        textMessage = '✔ ';
        break;
      case 'failed':
        textMessage = '✖ ';
        break;
    }
    textMessage += message
    this.Notification.open(textMessage, action, {
      duration: 3500,
      panelClass: messagetype,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    })
  }
}
