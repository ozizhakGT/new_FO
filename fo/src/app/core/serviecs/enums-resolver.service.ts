import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ApiService} from "./api.service";
import {UtilsService} from "./utils.service";

@Injectable({
  providedIn: 'root'
})
export class EnumsResolverService implements Resolve<any> {
  enums;

  constructor(private utilsService: UtilsService, private apiService: ApiService) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.utilsService.loader.next(true)
    if (!sessionStorage.getItem('enums')) {
      this.enums = await this.apiService.getEnums()
        .then(async res => {
          this.enums = await res['results'];
          sessionStorage.setItem('enums', JSON.stringify(this.enums));
        });
    }
    return this.enums;
  }
}
