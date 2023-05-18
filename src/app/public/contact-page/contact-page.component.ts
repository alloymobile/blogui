import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent  implements  OnInit{

  constructor(private data: DataService) {
  }

  ngOnInit(): void {
    this.data.nextLink("contact");
  }
}
