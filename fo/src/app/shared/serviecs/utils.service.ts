import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Publisher} from "../interfaces/publisher.interface";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  publisherSelcted = new Subject<Publisher>();
  constructor() { }

}
