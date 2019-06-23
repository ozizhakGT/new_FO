import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {Observable, Subscription} from 'rxjs';
import 'rxjs-compat/add/operator/debounceTime';
import 'rxjs-compat/add/operator/map';
import 'rxjs-compat/add/operator/do';
import {TagService} from "../../../tag.service";
import {operationcategoriesArray} from "../../../../core/general-enums/operation_categories";

@Component({
  selector: 'app-additional-tag-search>',
  templateUrl: './additional-tag-search.component.html',
  styleUrls: ['./additional-tag-search.component.css'],
})

export class AdditionalTagSearchComponent implements OnInit {
  @ViewChild('addAdditional') query: ElementRef;
  @Input() currentAdditionalTags;
  @Output() presentAdditionalTag = new EventEmitter<[] | {}>();
  operationTypes = operationcategoriesArray;
  tags: any = [];
  constructor(private tagService: TagService) {}
  ngOnInit() {
      Observable.fromEvent(this.query.nativeElement, 'keyup')
        .do(() => {
          this.tags = [];
          this.query = null;
        })
        .debounceTime(1200)
        .subscribe(typing => {
          let getQuery = typing['target'].value;
          if (getQuery.length >= 3) {
            this.tagService.getSearchTags(getQuery).subscribe((results: any) => {
              if (results.length > 0) {
                this.tags = results;
              } else {
                this.tags = [{id: 'No Results'}];
              }
            });
          }
        });
  }
  onPaintLabel(operationId) {
    return this.tagService.getLabelColor(operationId);
  }

  onFunc(type, i) {
    if (type === 'delete') {
      this.tagService.onDelete(this.currentAdditionalTags, i);
    }
    else if (type === 'add') {
      this.currentAdditionalTags.push({id: i.toString(), enable: true});
    }
    else if (type === 'change') {
      this.currentAdditionalTags[i].enable = !this.currentAdditionalTags[i].enable;
    }
    this.presentAdditionalTag.emit(this.tagService.onGenerateAdditionalTag('save', this.currentAdditionalTags));
  }
}
