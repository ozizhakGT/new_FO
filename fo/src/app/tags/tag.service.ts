import { Injectable } from '@angular/core';
import {ApiService} from "../core/serviecs/api.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TagService {
  tag = new Subject<any[]>();

  constructor(private apiService: ApiService) { }

  getSearchTags(query) {
    return this.apiService.getTags(query);
  }
  getTag(tagId) {
    return this.apiService.getTag(tagId);
  }
}
