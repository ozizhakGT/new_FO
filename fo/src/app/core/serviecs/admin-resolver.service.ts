import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {LocalAuthService} from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminResolverService {

  constructor(private auth: LocalAuthService ) {}
}
