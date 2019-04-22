import { Component, OnInit } from '@angular/core';
import {UtilsService} from "../shared/serviecs/utils.service";
import {Publisher} from "../shared/interfaces/publisher.interface";

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  constructor(private utilsService: UtilsService) { }

  ngOnInit() {
  }

}
