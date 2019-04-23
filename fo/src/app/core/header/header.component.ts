import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromEvent';

//SERVICE
import {PublisherApiService} from '../serviecs/publisher-api.service';
import {UtilsService} from "../serviecs/utils.service";

//INTERFACES
import {Publisher} from "../../shared/interfaces/publisher.interface";

@Component({
selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('search') searchQuery: ElementRef;
  keyupSubscription    : Subscription;
  mouseupSubscription  : Subscription;

  publisherId     : string = this.utilsService.onSessionStorageLoad();
  lastSearch      : string;
  isLoading       : boolean;
  isResults       : boolean;
  publisherResult : Publisher[] = [];
  // publisherResult: Publisher[] = [
  //   {
  //     _id: 88287,
  //     username: "ozizhak@walla.com",
  //     sites: [
  //       {
  //         _id: 65873,
  //         name: "fdbfb",
  //         url: "http://www.adsology.com",
  //         enable: true
  //       },
  //       {
  //         _id: 81175,
  //         name: "test",
  //         url: "https://gamesmor hter.com",
  //         enable: true
  //       },
  //       {
  //         _id: 87008,
  //         name: "test ownership",
  //         url: "https://oztest.com",
  //         enable: true
  //       },
  //       {
  //         _id: 65354,
  //         name: "test site",
  //         url: "https://www.blabla.com",
  //         enable: true
  //       }
  //     ]
  //   },
  //   {
  //     _id: 71231,
  //     username: "oz@web-pick.com",
  //     sites: [
  //       {
  //         _id: 81331,
  //         name: "test banner",
  //         url: "http://ben.com",
  //         enable: true
  //       },
  //       {
  //         _id: 79574,
  //         name: "google",
  //         url: "http://google.com",
  //         enable: true
  //       },
  //       {
  //         _id: 81129,
  //         name: "blabla",
  //         url: "http://walla.com",
  //         enable: true
  //       },
  //       {
  //         _id: 63599,
  //         name: "ozizhak test",
  //         url: "https://publisher.ad-maven.com",
  //         enable: false
  //       },
  //       {
  //         _id: 66155,
  //         name: "hara",
  //         url: "https://walla.com",
  //         enable: true
  //       },
  //       {
  //         _id: 66238,
  //         name: "blabla",
  //         url: "https://walla.com",
  //         enable: false
  //       },
  //       {
  //         _id: 63598,
  //         name: "testSite",
  //         url: "https://www.one.co.il",
  //         enable: false
  //       },
  //       {
  //         _id: 66405,
  //         name: "newOne",
  //         url: "https://www.ynet.co.il",
  //         enable: false
  //       },
  //       {
  //         _id: 51287,
  //         name: "ozsITE",
  //         url: "https://ynet.co.il",
  //         enable: false
  //       }
  //     ]
  //   }
  // ]

  constructor(private apiService: PublisherApiService,
              private utilsService: UtilsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // subscribe search from by keyup wait 1.5 sec and then send request.
    this.keyupSubscription = Observable.fromEvent(this.searchQuery.nativeElement, 'keyup')
      .debounceTime(1500)
      .subscribe(() => {
        const search = this.searchQuery.nativeElement.value.toLowerCase();
        if (search.length >= 3 && search !== this.lastSearch) {
          this.isLoading = true;
          this.lastSearch = search;
          this.onGetPublisher(search);
        } else {
          this.onResetSearch();
        }
      });

    // subscribe for closing window
    this.mouseupSubscription = Observable.fromEvent(document.querySelector('.page-body'), 'mouseup')
      .subscribe(() => {
        this.onResetSearch();
      });

    this.utilsService.publisherId.subscribe(
      (id: string) => {
        this.utilsService.onSessionStorageSave(id);
        this.publisherId = id;
    });
  }

  // Get Publisher function.
  onGetPublisher(query) {
    this.apiService.getPublishers(query)
      .subscribe(
        (result: Publisher[]) => {
        this.publisherResult = result;
          this.isLoading = false;
          this.isResults = true;
      },
      err => {
          console.info(err);
          this.onResetSearch();
          this.isResults = true;
          this.isLoading = false;
      }
    )}

  //  Select Publisher from the search list and clear list and last search
  onPublisherSelect(publisher) {
    this.utilsService.publisherId.next(publisher._id.toString());
    this.router.navigate(['manage/edit', this.publisherId]);
    this.onResetSearch(true);
  }

  // Reset Search
  private onResetSearch(publisher=false) {
    this.isResults = false;
    this.publisherResult = [];
    this.lastSearch = '';
    if (publisher) {
      this.searchQuery.nativeElement.value = '';
    }
  }
}
