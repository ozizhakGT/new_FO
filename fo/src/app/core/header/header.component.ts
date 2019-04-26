import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromEvent';

// SERVICE
import {PublisherApiService} from '../serviecs/publisher-api.service';
import {UtilsService} from '../serviecs/utils.service';

// INTERFACES
import {Publisher} from '../../shared/interfaces/publisher.interface';

@Component({
selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('search') searchQuery: ElementRef;
  keyupSubscription: Subscription;
  mouseupSubscription: Subscription;
  loaderSubscription: Subscription;

  publisherId: string = this.utilsService.onSessionStorageLoad();
  lastSearch: string;
  isNavbarLoading: boolean;
  isAppLoading: boolean;
  isResults: boolean;
  publisherResult: Publisher[] = [];


  constructor(private apiService: PublisherApiService,
              private utilsService: UtilsService,
              private router: Router) { }

  ngOnInit() {
    this.loaderSubscription = this.utilsService.loader
      .subscribe(value => this.isAppLoading = value);

    // subscribe search from by keyup wait 1.5 sec and then send request.
    this.keyupSubscription = Observable.fromEvent(this.searchQuery.nativeElement, 'keyup')
      .debounceTime(1500)
      .subscribe(() => {
        const search = this.searchQuery.nativeElement.value.toLowerCase();
        if (search.length >= 3 && search !== this.lastSearch) {
          this.isNavbarLoading = true;
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
  }

  // Get Publisher function.
  onGetPublisher(query) {
    this.apiService.getPublishers(query)
      .subscribe(
        (result: Publisher[]) => {
        this.publisherResult = result;
        this.isNavbarLoading = false;
        this.isResults = true;
      },
      err => {
          console.info(err);
          this.onResetSearch();
          this.isResults = true;
          this.isNavbarLoading = false;
      }
    ); }

  //  Select Publisher from the search list and clear list and last search
  onPublisherSelect(publisher) {
    this.publisherId = publisher._id.toString();
    this.utilsService.onSessionStorageSave(this.publisherId);
    this.router.navigate(['manage/edit', this.publisherId]);
    this.onResetSearch(true);
  }

  // Reset Search
  private onResetSearch(publisher= false) {
    this.isResults = false;
    this.publisherResult = [];
    this.lastSearch = '';
    if (publisher) {
      this.searchQuery.nativeElement.value = '';
    }
  }
}
