import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../shared/serviecs/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    // this.onGetPublisher('65873');
  }
  
  onGetPublisher(query) {
    debugger;
    this.apiService.getPublisher(query).subscribe(
      result => {
        debugger;
        console.log(result)
      },
      err => console.log(err)
    )
  }

  onSearch(search) {
    console.log(search)
    if (search && search.length >= 3) {
      this.onGetPublisher(search);
    }
  }

}
