import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../shared/serviecs/api.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.onGetPublisher('65873');
  }
  
  onGetPublisher(query) {
    this.apiService.getPublisher(query)
      .subscribe(
      result => {
        console.log(result);
      },
      err => console.log(err)
    )
  }

  onSearch(search) {
   if (search.length >= 3) {
     _.debounce(this.onGetPublisher(search), 2000);
   }
  }

}
