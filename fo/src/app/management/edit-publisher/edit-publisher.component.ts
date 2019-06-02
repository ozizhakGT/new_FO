import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';

import {ActivatedRoute, Params, Router} from "@angular/router";

import {UtilsService} from "../../core/serviecs/utils.service";
import {ManagementService} from "../management.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-edit-publisher',
  templateUrl: './edit-publisher.component.html',
  styleUrls: ['./edit-publisher.component.css']
})
export class EditPublisherComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;
  publisherId: Subscription;
  isValidPublisher: boolean = false
  id: string = sessionStorage.getItem('publisherId');
  userState: Promise<any>;
  verticals;
  constructor(private utilsService: UtilsService,
              private manageService: ManagementService,
              private route: ActivatedRoute,
              private router: Router,
              private renderer: Renderer2) {
    this.publisherId = this.utilsService.publisherId.subscribe(id => {
      if (id) {
        this.id = id;
        this.isValidPublisher = true;
      } else {
        this.isValidPublisher = false;
        this.router.navigate(['edit']);
      }
    })
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
    this.publisherId = this.utilsService.publisherId.subscribe(id => {
      if (id) {
        this.id = id;
        this.isValidPublisher = true;
      } else {
        this.isValidPublisher = false;
        this.router.navigate(['edit']);
      }
    })
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
    if (sessionStorage.getItem('publisherId')) {
      this.isValidPublisher = true;
      if (this.router.url.endsWith('edit')) {
        this.router.navigate([sessionStorage.getItem('publisherId')], {relativeTo: this.route})
      }
    }
  }
}
