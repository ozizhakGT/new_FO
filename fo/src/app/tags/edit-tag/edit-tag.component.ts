import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TagService} from '../tag.service';
import {Observable, Subscription} from 'rxjs';
import 'rxjs-compat/add/operator/debounceTime';
import 'rxjs-compat/add/operator/map';
import 'rxjs-compat/add/operator/do';
import {UtilsService} from '../../core/serviecs/utils.service';
import {ActivatedRoute, Router} from '@angular/router';

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
  hasTagsResults = false;
  hasTag =  false;
  loading =  true;
  searchingTags = false;
  tagGeneralDetails;
  @ViewChild('query') searchTagQuery: ElementRef;
  searchQuerySubscription: Subscription;
  constructor(private tagService: TagService,
              private utilsService: UtilsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.detectingTagIDUrl();
    this.searchQuerySubscription = Observable.fromEvent(this.searchTagQuery.nativeElement, 'keyup')
      .do(() => this.tagsSearch = null)
      .debounceTime(1200)
      .subscribe(() => {
        const query = this.searchTagQuery.nativeElement.value;
        if (query.length >= 3) {
          this.searchingTags = true;
          this.tagService.getSearchTags(query).toPromise()
            .then((tags: TagSearch[]) => {
              if (tags.length > 0) {
                this.hasTagsResults = true;
                this.tagsSearch = tags;
                this.searchingTags = false;
              } else {
                this.tagsSearch = [null];
                this.hasTagsResults = false;
                this.searchingTags = false;
              }
            });
        } else {
          this.tagsSearch = [];
        }
      });
  }

  ngOnDestroy() {
    this.searchQuerySubscription.unsubscribe();
  }

  detectingTagIDUrl() {
    let tagId = null;
    const url = this.router.url.split('/');
    for (const param of url) {
      if (!isNaN(parseInt(param)) && param.length >= 6) {
        tagId = '_' + param;
        this.onSelectTag(tagId);
        break;
      } else {
        this.utilsService.loader.next(false);
      }
    }
    if (tagId == null) {
      this.loading = false;
    }
  }
  onSelectTag(tagId) {
    if (sessionStorage.getItem('tagId') != tagId)  {
      if (tagId.toString().startsWith('_')) { console.log(tagId = tagId.substring(1)); }
      this.loading = true;
      this.utilsService.loader.next(true);
      this.tagService.getTag(tagId).toPromise()
        .then(
          _tag => {
            const tag = _tag['message'];
            this.tagGeneralDetails = {
              id: tag['_id'],
              created_on: new Date(tag['created_on']),
              last_update: tag['created_on'] !== tag['updated_on'] ?  new Date(tag['updated_on']) : null
            };
            sessionStorage.setItem('tagId', tag['_id']);
            this.tagService.onGetTagToService(tag);
            this.router.navigate(['./', tag._id , 'operation', tag.operation_id], {relativeTo: this.route});
            this.utilsService.loader.next(false);
            this.hasTag = true;
            this.loading = false;
          }
        )
        .catch(err => {
          if (err.status === 500) {
            this.utilsService.messageNotification(`Tag Not Found!`, null, 'failed');
            this.utilsService.loader.next(false);
            this.hasTag = false;
            this.loading = false;
          }
        });
    } else {
      this.utilsService.messageNotification(`You try to look for same Tag!`, null, 'info');
    }
  }


}
