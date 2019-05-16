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
  displayedColumns: string[] = ['tag_name', 'tag_id', 'bi_live'];
  spinner: boolean = false;
  @Input() verticals = [];

  constructor(private utilsService: UtilsService, private manageService: ManagementService) {
  }

  ngOnInit() {
    this.userState
      .then(
        userState => {
          this.sites = userState.sites;
          this.figureVerticals(this.sites,this.verticals)
        });
  }

  onChangeBILive(tag_id, value) {
    this.spinner = true;
    let live = value ? 'Enable' : 'Disable';
    this.manageService.updateBILive(tag_id, value)
      .subscribe(
        response => {
          if (response['type'] === 'updated') {
            this.utilsService.messageNotification(`Tag BI Live ${live} Successfully`, null, 'success');
            this.spinner = false;
          }
        },
        error => {
          this.utilsService.messageNotification(`There was problem update Tag BI Live`, null, 'failed');
          this.spinner = false
        })
  }

  figureVerticals(sites,verticals) {
    sites.forEach(site => {
      for (let i = 0; i < verticals.length; i++) {
        let id = verticals[i].id;
        let name = verticals[i].vertical;
        if (site.vertical === id) {
          return site['vertical_name'] = name;
        }
      }
    });
  };
}

