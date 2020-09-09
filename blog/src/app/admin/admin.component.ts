import { Blog } from './../blog';
import { Category } from '../model/category.model';
import { DataService } from './../service/data.service';
import { TableMetadata, ColumnMetadata } from '../model/metadata.model';
import { AdminService } from './admin.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [AdminService],
})
export class AdminComponent extends Blog implements OnInit {
  tables: TableMetadata[];
  categoryForm: FormGroup;
  category: any;
  loadData: boolean;

  constructor(
    private adminService: AdminService,
    public data: DataService,
    private formBuilder: FormBuilder
  ) {
    super();
    this.data.tableHead = [];
    this.data.tableBody = [];
    this.categoryForm = this.createData();
    this.category = new Category();
    this.tables = [];
    this.loadData = false;
  }

  ngOnInit(): void {
    this.tables = [];
    this.getBlog();
    this.getDataList('category');
    this.categoryForm = this.createData();
  }

  getBlog() {
    this.adminService.getBlog(this.metadata).subscribe((res: any) => {
      res.forEach((element) => {
        this.tables.push(element);
      });
    });
  }

  showList(table: string) {
    this.getDataList(table);
  }

  openModal(open: boolean, data?: any) {
    if (open) {
      this.categoryForm = this.createData(data);
      $('#myModal').modal('show');
    } else {
      this.categoryForm = this.createData(data);
      $('#myModal').modal('hide');
    }
  }

  createData(data?: any) {
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

  submitData() {
    this.category = this.categoryForm.value;
    if (this.category.id != 0) {
      this.adminService.updateData(this.category).subscribe((res) => {
        // this.getDataList();
      });
    } else {
      this.adminService.addData(this.category).subscribe((res) => {
        // this.getDataList();
      });
    }
    $('#myModal').modal('hide');
  }

  getDataList(table: string) {
    this.data.tableHead = [];
    this.data.tableBody = [];
    this.loadData = true;
    this.adminService.getMetadata(table).subscribe((res: any) => {
      res.forEach((element) => {
        this.data.tableHead.push(new ColumnMetadata(element));
      });
    });

    this.adminService.getDataList(table).subscribe(
      (res: any) => {
        res.content.forEach((element) => {
          this.data.tableBody.push(new Category(element));
          this.loadData = false;
        });
      },
      (error) => {}
    );
  }

  delete(data: any) {
    // this.adminService.deleteData(data).subscribe((res: any) => {
    //   this.getDataList();
    // });
  }
}
