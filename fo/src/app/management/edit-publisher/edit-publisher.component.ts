import {Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';

import {ActivatedRoute, Params, Router} from "@angular/router";

import {UtilsService} from "../../core/serviecs/utils.service";
import {ManagementService} from "../management.service";
import {Subscription} from "rxjs";
import {GeneralDetails} from "../enums/publisher-enums";

@Component({
  selector: 'app-edit-publisher',
  templateUrl: './edit-publisher.component.html',
  styleUrls: ['./edit-publisher.component.css']
})
export class EditPublisherComponent implements OnInit, OnDestroy {
  generalDetails;
  navLinks: any[];
  activeLinkIndex = -1;
  publisherIdSubscription: Subscription;
  ownerSubscription: Subscription;
  modeSubscription: Subscription;
  statusColor: string;
  statusStyle;
  isValidPublisher: boolean = false;
  isGeneralDetailsValid: boolean = false;
  id = sessionStorage.getItem('publisherId');

  constructor(private utilsService: UtilsService,
              private manageService: ManagementService,
              private route: ActivatedRoute,
              private router: Router) {
    this.navLinks = [
      {
        label: 'Details Settings',
        link: `details`,
        index: 0
      }, {
        label: 'Payments Settings',
        link: `payments`,
        index: 1
      }, {
        label: 'Ownership History',
        link: `ownership`,
        index: 2
      }, {
        label: 'Sites & Tags',
        link: `sites`,
        index: 3
      }
    ];
  }

  ngOnInit() {
    this.publisherIdSubscription = this.utilsService.publisherId.subscribe(id => {
      if (id) {
        this.id = id;
        this.getGeneralDetails(id)
        this.isValidPublisher = true;
      } else {
        this.isValidPublisher = false;
        this.router.navigate(['edit']);
      }
    });
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
    if (sessionStorage.getItem('publisherId')) {
      this.getGeneralDetails(this.id);
      this.isValidPublisher = true;
    } else {
      this.router.navigate(['./'], {relativeTo: this.route});
    }

    this.modeSubscription = this.manageService.modeStatus.subscribe(mode => {
        this.statusStyle = {'color': this.changeColorByStatus(mode), 'animation': 'scaleAnime .7s, running'}

        setTimeout(() => {
          this.statusStyle = {'animation-play-state': 'paused'}
        }, 1000)
    })
    this.ownerSubscription = this.manageService.repalceOwner.subscribe( owner => {this.generalDetails['owner'] = owner })
  }
  ngOnDestroy() {
    this.publisherIdSubscription.unsubscribe();
    this.modeSubscription.unsubscribe();
    this.ownerSubscription.unsubscribe();
  }

  async getGeneralDetails(publisherId) {
    this.utilsService.loader.next(true)
    this.isGeneralDetailsValid = false;
    let promiseArr = [];
    await this.manageService.getUser(publisherId).then(async res => {
      let publisher = res['message'].results[0];
      if (publisher['account_manager_id']) {
        promiseArr = [this.manageService.getLastLogin(publisher['username']), this.manageService.getUser(publisher['account_manager_id'])]
      } else {
        promiseArr = [this.manageService.getLastLogin(publisher['username'])]
      }
      await Promise.all(promiseArr).then(res => {
        let generalDetailsHolder;
          generalDetailsHolder = {
            last_seen: res[0]['message'].results.length > 0 ? res[0]['message'].results[0].login_timestamp : '',
            country: res[0]['message'].results.length > 0 ? res[0]['message'].results[0].country : '',
            owner: res[1] ? res[1]['message'].results[0].username : 'No Owner'
          }
        this.generalDetails = new GeneralDetails(
          publisherId,
          publisher['mode'],
          publisher['username'],
          generalDetailsHolder.last_seen,
          generalDetailsHolder.country,
          generalDetailsHolder.owner
        );
        this.statusStyle = {'color': this.changeColorByStatus(publisher['mode'])}
        this.isGeneralDetailsValid = true;
      });
    })
  }

  changeColorByStatus(mode) {
    switch (mode) {
      case 0:
        return 'orange';
      case 1:
        return 'green';
      case 2:
        return 'red';
      case 3:
        return 'grey';
    }
  }
}
