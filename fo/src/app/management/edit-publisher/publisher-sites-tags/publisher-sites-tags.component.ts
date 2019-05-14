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
  @Input() userState: Promise<any>;
  sites: Site[] = [];
  displayedColumns: string[] = ['tag_name', 'tag_id', 'bi_live']
  constructor(private utilsService: UtilsService, private manageService: ManagementService) { }

  ngOnInit() {
    this.userState
      .then(
        userState => {
          this.sites = userState.sites;
        });
  }
}
