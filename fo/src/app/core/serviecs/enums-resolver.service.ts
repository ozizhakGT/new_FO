import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ApiService} from "./api.service";
import {UtilsService} from "./utils.service";

@Injectable({
  providedIn: 'root'
})
export class EnumsResolverService implements Resolve<any> {
  enums;
  attributes;
  constructor(private utilsService: UtilsService, private apiService: ApiService) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.utilsService.loader.next(true);
    if (!sessionStorage.getItem('enums')) {
      this.enums = await this.apiService.getEnums()
        .then(async res => {
          this.enums = await res['results'];
          sessionStorage.setItem('enums', JSON.stringify(this.enums));
        })
        .catch(err => {
          if (err['status'] === 401) {
            this.utilsService.messageNotification(`There was some problem with your Token, please try login again to solve this problem.`, null, 'failed')
            this.utilsService.loader.next(false);
          }
        })
    }
    return this.enums;
  }
}
