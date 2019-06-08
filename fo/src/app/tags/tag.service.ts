import { Injectable } from '@angular/core';
import {ApiService} from "../core/serviecs/api.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TagService {
  tag;

  constructor(private apiService: ApiService) {}

  getSearchTags(query) {
    return this.apiService.getTags(query);
  }
  getTag(tagId) {
    return this.apiService.getTag(tagId);
  }
  onGetTagToService(tag) {
    this.tag = tag;
  }
  getTagToOperation() {
    return this.tag;
  }
  getStorageMode(type, modes?: {}, tag?) {
    if (type !== 'save') {
      if (modes['session'])  {
        return 1;
      }
      else if (modes['refresh']) {
        return 2;
      }
      else {
        return 3;
      }
    } else {
      switch (tag['storageMode']) {
        case 1:
          tag['session_storage'] = true;
          tag['refresh_storage'] = false;
          break;
        case 2:
          tag['session_storage'] = false;
          tag['refresh_storage'] = true;
          break;
        default:
          tag['session_storage'] = false;
          tag['refresh_storage'] = false;
      }
      delete tag['storageMode'];
    }
  }
}
