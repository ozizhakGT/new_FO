import {Component, Input, OnInit} from '@angular/core';
import {Site} from "../../../shared/interfaces/site.interface";
import {UtilsService} from "../../../core/serviecs/utils.service";
import {ManagementService} from "../../management.service";

@Component({
  selector: 'app-publisher-sites-tags',
  templateUrl: './publisher-sites-tags.component.html',
  styleUrls: ['./publisher-sites-tags.component.css']
})
export class PublisherSitesTagsComponent implements OnInit {
  sites: Site[] = JSON.parse(this.utilsService.onSessionStorageLoad('publisherSites'));
  constructor(private utilsService: UtilsService, private manageService: ManagementService) { }

  ngOnInit() {
    this.getSiteTags()
  }

  getSiteTags() {
    this.sites.forEach(site => {
      this.manageService.getTagsbySiteId(site._id)
        .then(response => site['tags'] = response['message'].results)
    });
    console.log(this.sites)
  }
}
