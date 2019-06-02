import {Component, OnInit} from '@angular/core';
import {Site} from "../../../shared/interfaces/site.interface";
import {UtilsService} from "../../../core/serviecs/utils.service";
import {ManagementService} from "../../management.service";
import {MatDialog} from "@angular/material";
import {EditSiteModalComponent} from "./edit-site-modal/edit-site-modal.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-publisher-sites-tags',
  templateUrl: './publisher-sites-tags.component.html',
  styleUrls: ['./publisher-sites-tags.component.css']
})
export class PublisherSitesTagsComponent implements OnInit {
  sites: Site[];
  verticals: {id: number, vertical: string}[];
  displayedColumns: string[] = ['tag_name', 'tag_id', 'bi_live'];

  constructor(private utilsService: UtilsService,
              private manageService: ManagementService,
              private dialog: MatDialog,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getSitesData(this.route.snapshot.params['publisherId'])
  }

  async getSitesData(publisherId) {
    let promiseArr = [this.manageService.getVerticals(), this.manageService.getSitesAndTags(publisherId)];

    await Promise.all(promiseArr)
      .then(res => {
        this.utilsService.loader.next(true);
        this.verticals = res[0]['message'].results;
        this.sites = this.figureVerticals(res[1]['message'].results, res[0]['message'].results);
        this.utilsService.loader.next(false);
      })
      .catch(err => {
        console.log(err);
        this.utilsService.messageNotification(`Cannot get Data!`, null, 'failed');
        this.utilsService.loader.next(false);
      })
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
      site['vertical_name'] = verticals[site['vertical'] - 100].vertical;
    });
    return sites;
  }
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

