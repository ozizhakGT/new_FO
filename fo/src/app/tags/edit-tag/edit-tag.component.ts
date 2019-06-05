import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TagService} from "../tag.service";
import {Observable, Subscription} from "rxjs";
import "rxjs-compat/add/operator/debounceTime";
import "rxjs-compat/add/operator/map";
import "rxjs-compat/add/operator/do";
import {ApiService} from "../../core/serviecs/api.service";
import {UtilsService} from "../../core/serviecs/utils.service";

interface TagSearch {
  id: string;
  name: string;
  site_name: string;
}

@Component({
  selector: 'app-edit-tag',
  templateUrl: './edit-tag.component.html',
  styleUrls: ['./edit-tag.component.css']
})
export class EditTagComponent implements OnInit, OnDestroy {
  tagsSearch: TagSearch[];
  hasTagsResults: boolean = false;
  hasTag: boolean =  false;
  @ViewChild('query') searchTagQuery: ElementRef;
  searchQuerySubscription: Subscription;
  constructor(private tagService: TagService, private utilsService: UtilsService) { }

  ngOnInit() {
    this.searchQuerySubscription = Observable.fromEvent(this.searchTagQuery.nativeElement, 'keyup')
      .do(() => this.tagsSearch = null)
      .debounceTime(1200)
      .subscribe(() => {
        let query = this.searchTagQuery.nativeElement.value;
        if (query.length >= 3) {
          this.tagService.getSearchTags(query).toPromise()
            .then((tags: TagSearch[]) => {
              if (tags.length > 0) {
                this.hasTagsResults = true;
                this.tagsSearch = tags
              } else {
                this.tagsSearch = [null];
                this.hasTagsResults = false;
              }
            })
        } else {
          this.tagsSearch = [];
        }
      })
  }

  ngOnDestroy() {
    this.searchQuerySubscription.unsubscribe()
  }

  onSelectTag(tagId) {
    this.utilsService.loader.next(true);
    this.tagService.getTag(tagId).toPromise()
      .then(
      tag => {
        console.log(tag);
        this.utilsService.loader.next(false);
      }
    )
      .catch(err => {
        if (err['status'] === 500) {
          this.utilsService.messageNotification(`Tag Not Found!`, null, 'failed');
          this.utilsService.loader.next(false);
        }
      })
  }


}
