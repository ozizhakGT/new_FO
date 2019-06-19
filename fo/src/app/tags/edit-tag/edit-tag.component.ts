import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TagService} from '../tag.service';
import {Observable, Subscription} from 'rxjs';
import 'rxjs-compat/add/operator/debounceTime';
import 'rxjs-compat/add/operator/map';
import 'rxjs-compat/add/operator/do';
import {UtilsService} from '../../core/serviecs/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {operationcategoriesArray} from "../../core/general-enums/operation_categories";
import {SelectMode} from "./components-opretion/operation-enums";

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
  operationTypes = operationcategoriesArray;
  layerSelected = SelectMode;
  @ViewChild('query') searchTagQuery: ElementRef;
  searchQuerySubscription: Subscription;
  constructor(private tagService: TagService,
              private utilsService: UtilsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.router.url.endsWith('edit')) {
      sessionStorage.removeItem('tagId')
    }
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
                console.log(tags)
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
  async onSelectTag(tagId) {
    if (sessionStorage.getItem('tagId') != tagId)  {
      if (tagId.toString().startsWith('_')) { console.log(tagId = tagId.substring(1)); }
      this.loading = true;
      this.utilsService.loader.next(true);
      await this.tagService.getTag(tagId).toPromise()
        .then(
          async _tag => {
            console.log(_tag['message'])
            const tag = _tag['message'];
            this.tagGeneralDetails = {
              id: tag['_id'],
              operation_id: tag['operation_id'],
              type: this.operationTypes[tag['operation_id']].name,
              created_on: new Date(tag['created_on']),
              last_update: tag['created_on'] !== tag['updated_on'] ?  new Date(tag['updated_on']) : null,
              publisher_id: tag['publisher_id'],
              site_id: tag['site_id'],
            };
            await this.tagService.getTagGeneralDetails(this.tagGeneralDetails);
            console.log(this.tagGeneralDetails);
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
            sessionStorage.removeItem('tagId');
            this.utilsService.loader.next(false);
            this.hasTag = false;
            this.loading = false;
          }
        });
    } else {
      this.utilsService.messageNotification(`You try to look for same Tag!`, null, 'info');
    }
  }
  onPaintLabel(oparetionName) {
   return this.tagService.getLabelColor(oparetionName);
  }
  onSelectLayer(selection) {
    for (let layer in this.layerSelected) {
      this.layerSelected[layer].enable = this.layerSelected[layer].name === selection['name'];
    }
    this.tagService.layerSelection.next(selection);
  }
}
