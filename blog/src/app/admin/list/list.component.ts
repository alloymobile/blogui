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
import { ListService } from './list.service';
declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ListService],
})
export class ListComponent implements OnInit {
  categoryForm: FormGroup;
  category: any;
  constructor(
    public data: DataService,
    private formBuilder: FormBuilder,
    private listService: ListService,
    private categoryService: CategoryService
  ) {
    this.data.tableHead = {};
    this.data.tableBody = [];
    this.categoryForm = this.createCategory();
    this.category = new Category();
  }
  ngOnInit(): void {
    this.getAllCategory();
    this.categoryForm = this.createCategory();
  }

  openModal(open: boolean, data?: any) {
    if (open) {
      this.categoryForm = this.createCategory(data);
      console.log(this.categoryForm.value);
      $('#myModal').modal('show');
    } else {
      this.categoryForm = this.createCategory(data);
      console.log(this.categoryForm.value);
      $('#myModal').modal('hide');
    }
  }

  createCategory(data?: any) {
    if (data) {
      return this.formBuilder.group({
        id: [data.id, Validators.required],
        name: [data.name, Validators.required],
      });
    } else {
      return this.formBuilder.group({
        id: [0, Validators.required],
        name: ['Country', Validators.required],
      });
    }
  }

  onSubmit() {
    this.category = this.categoryForm.value;
    if (this.category.id != 0) {
      this.listService.updateData(this.category).subscribe((res) => {
        this.getAllCategory();
      });
    } else {
      this.listService.addData(this.category).subscribe((res) => {
        this.getAllCategory();
      });
    }
    $('#myModal').modal('hide');
  }

  getAllCategory() {
    this.data.tableHead = {};
    this.data.tableBody = [];
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

  delete(data: any) {
    this.listService.deleteData(data).subscribe((res: any) => {
      this.getAllCategory();
    });
  }
}
