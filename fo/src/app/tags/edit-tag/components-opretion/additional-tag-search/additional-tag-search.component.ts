import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from "@angular/core";
import {Observable, Subscription} from 'rxjs';
import 'rxjs-compat/add/operator/debounceTime';
import 'rxjs-compat/add/operator/map';
import 'rxjs-compat/add/operator/do';
import {TagService} from "../../../tag.service";

@Component({
  selector: 'app-additional-tag-search>',
  templateUrl: './additional-tag-search.component.html',
  styleUrls: ['./additional-tag-search.component.css'],
})

export class AdditionalTagSearchComponent implements OnInit {
  @ViewChild('addAdditional') query: ElementRef;
  tags: any = [];
  @Output() tagChosen = new EventEmitter<any>();
  constructor(private tagService: TagService) {}
  ngOnInit() {
      Observable.fromEvent(this.query.nativeElement, 'keyup')
        .do(() => {
          this.tags = [];
          this.query = null
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

  getTag(tagId) {
    this.tagChosen.emit({id: tagId.toString(), boolean: true});
  }
}
