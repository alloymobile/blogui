import { TableMetadata } from './../../model/table-metadata';
import { CategoryService } from './../category/category.service';
import { DataService } from '../../service/data.service';
import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../category/category.model';
import {
  NgForm,
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  category: Category;
  categoryForm: FormGroup;
  constructor(
    public data: DataService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.data.tableHead = {};
    this.data.tableBody = [];
    this.category = new Category();
    this.categoryForm = this.createCategory();
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

  createCategory() {
    return this.formBuilder.group({
      id: [0, Validators.required],
      name: ['Country', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.categoryForm.value);
  }

  add() {
    this.categoryForm = this.createCategory();
  }
}
