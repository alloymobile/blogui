import { TableMetadata } from './../../model/table-metadata';
import { CategoryService } from './../category/category.service';
import { DataService } from '../../service/data.service';
import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../category/category.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  header: any;
  constructor(
    public data: DataService,
    private categoryService: CategoryService
  ) {
    this.data.tableHead = {};
    this.data.tableBody = [];
  }
  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory() {
    this.categoryService.getCategoryMetadata().subscribe((res: any) => {
      this.data.tableHead = new TableMetadata(res);
    });

    this.categoryService.getAllCategory().subscribe(
      (res: any) => {
        res.content.forEach((element) => {
          this.data.tableBody.push(new Category(element));
        });
      },
      (error) => {}
    );
  }
}
