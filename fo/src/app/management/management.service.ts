import { Injectable } from '@angular/core';
import {ApiService} from "../shared/serviecs/api.service";

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  constructor(private apiService: ApiService) { }

}
