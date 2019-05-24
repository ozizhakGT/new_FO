import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromEvent';

// SERVICE
import {ApiService} from '../serviecs/api.service';
import {UtilsService} from '../serviecs/utils.service';

// INTERFACES
import {Publisher} from '../../shared/interfaces/publisher.interface';

@Component({
selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('search') searchQuery: ElementRef;
  keyupSubscription: Subscription;
  mouseupSubscription: Subscription;
  loaderSubscription: Subscription;

  adminData = JSON.parse(localStorage.getItem('userDetails'));
  publisherId: string = this.utilsService.onSessionStorageLoad('publisherId');
  lastSearch: string;
  isNavbarLoading: boolean;
  isAppLoading = true;
  isResults: boolean;
  publisherResult: Publisher[] = [];


  constructor(private apiService: ApiService,
              private cd: ChangeDetectorRef,
              private utilsService: UtilsService,
              private router: Router) { }

  ngOnInit() {
    this.loaderSubscription = this.utilsService.loader
      .subscribe(value => {
        this.isAppLoading = value;
        this.cd.detectChanges();
      });

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
  ngAfterViewInit() {
    this.cd.detectChanges();

  }

  ngOnDestroy() {
    this.loaderSubscription.unsubscribe();
    this.keyupSubscription.unsubscribe();
    this.mouseupSubscription.unsubscribe();
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
    this.utilsService.onSessionStorageSave('publisherId', this.publisherId);
    this.utilsService.onSessionStorageSave('publisherSites', JSON.stringify(publisher['sites']));
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
