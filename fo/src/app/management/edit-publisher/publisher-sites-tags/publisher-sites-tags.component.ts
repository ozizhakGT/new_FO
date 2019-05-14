import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Site} from "../../../shared/interfaces/site.interface";
import {UtilsService} from "../../../core/serviecs/utils.service";
import {ManagementService} from "../../management.service";

@Component({
  selector: 'app-publisher-sites-tags',
  templateUrl: './publisher-sites-tags.component.html',
  styleUrls: ['./publisher-sites-tags.component.css']
})
export class PublisherSitesTagsComponent implements OnInit,OnDestroy {
  @Input() userState: Promise<any>;
  sites: Site[] = [];
  displayedColumns: string[] = ['tag_name', 'tag_id', 'bi_live'];
  spinner: boolean = false;

  constructor(private utilsService: UtilsService, private manageService: ManagementService) {
  }

  ngOnInit() {
    this.userState
      .then(
        userState => {
          this.sites = userState.sites;
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
}
