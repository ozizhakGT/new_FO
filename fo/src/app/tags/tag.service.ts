import { Injectable } from '@angular/core';
import {ApiService} from "../core/serviecs/api.service";

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private apiService: ApiService) { }

  getSearchTags(query) {
    return this.apiService.getTags(query);
  }
  getTag(tagId) {
    return this.apiService.getTag(tagId);
  }
}
