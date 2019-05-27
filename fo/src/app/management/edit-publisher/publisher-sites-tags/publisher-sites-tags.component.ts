import {Component, Input, OnInit} from '@angular/core';
import {Site} from "../../../shared/interfaces/site.interface";
import {UtilsService} from "../../../core/serviecs/utils.service";
import {ManagementService} from "../../management.service";
import {MatDialog} from "@angular/material";
import {EditSiteModalComponent} from "./edit-site-modal/edit-site-modal.component";

@Component({
  selector: 'app-publisher-sites-tags',
  templateUrl: './publisher-sites-tags.component.html',
  styleUrls: ['./publisher-sites-tags.component.css']
})
export class PublisherSitesTagsComponent implements OnInit {
  @Input() userState: Promise<any>;
  sites: Site[] = [];
  displayedColumns: string[] = ['tag_name', 'tag_id', 'bi_live'];
  @Input() verticals = [];

  constructor(private utilsService: UtilsService,
              private manageService: ManagementService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userState
      .then(
        userState => {
          this.sites = this.figureVerticals(userState.sites,this.verticals)
        });
  }

  onChangeBILive(tag_id, value) {
    let live = value ? 'Enable' : 'Disable';
    this.manageService.updateBILive(tag_id, value)
      .subscribe(
        response => {
          if (response['type'] === 'updated') {
            this.utilsService.messageNotification(`Tag BI Live ${live} Successfully`, null, 'success');
          }
        },
        error => {
          this.utilsService.messageNotification(`There was problem update Tag BI Live`, null, 'failed');
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
    return sites
  };
  onSentUpdate(site, editSite) {
    editSite['enable'] = editSite['enable'] ? 1 : 0;
    this.manageService.updateSiteById(site._id, editSite).then(response => {
      if (response['type'] === 'updated') {
        this.manageService.getSitesAndTags(sessionStorage.getItem('publisherId'))
          .then(response2 => {
            this.sites = this.figureVerticals(response2['message'].results, this.verticals);
            this.utilsService.messageNotification(`Site Edited Successfully!`, null, 'success');
            this.utilsService.loader.next(false);
          });
      }
    })
      .catch(err => {
        console.log(err);
        this.utilsService.messageNotification(`Error Editing Site!`, null, 'failed');
        this.utilsService.loader.next(false);
      })
  }

  openEditSiteModal(site) {
    const dialogRef = this.dialog.open(EditSiteModalComponent, {
      width: 'fit-content',
      data: {site: site, verticals: this.verticals}
    });
    dialogRef.beforeClosed().toPromise().then(async result => {
      if (result != undefined) {
          this.utilsService.loader.next(true);
          await this.onSentUpdate(site, result);

      }
    })
  }
}

