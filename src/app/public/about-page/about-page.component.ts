import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements  OnInit{

  constructor(private data: DataService) {
  }

  ngOnInit(): void {
    this.data.nextLink("about");
  }
}


