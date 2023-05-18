import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-admin-dashboard-page',
  templateUrl: './admin-dashboard-page.component.html',
  styleUrls: ['./admin-dashboard-page.component.css']
})
export class AdminDashboardPageComponent implements  OnInit{

  constructor(private data: DataService) {
  }

  ngOnInit(): void {
    
  }
}

