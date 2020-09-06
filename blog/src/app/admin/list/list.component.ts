import { DataService } from './../../data.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  header: any;
  constructor(public data: DataService) {}
  ngOnInit(): void {}
}
