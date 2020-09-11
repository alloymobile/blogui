import { Table, Category } from './../model/object.model';
import { Page } from './../model/metadata.model';
import { Blog } from './../blog';
import { TableMetadata, ColumnMetadata } from '../model/metadata.model';
import { AdminService } from './admin.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { titleCase } from 'title-case';
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
  table: TableMetadata;
  tableBody: any[];
  tableHead: ColumnMetadata[];
  modalType: string;

  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder
  ) {
    super();
    this.tableHead = [];
    this.tableBody = [];
    this.categoryForm = this.createData();
    this.category = new Category();
    this.tables = [];
    this.table = new TableMetadata();
    this.loadData = false;
    this.modalType = '';
  }

  ngOnInit(): void {
    this.tables = [];
    this.getBlog();
    this.categoryForm = this.createData();
  }

  getBlog() {
    this.adminService.getBlog(this.metadata).subscribe((res: any) => {
      res.forEach((element) => {
        this.tables.push(element);
      });
    });
  }

  showList(table: TableMetadata) {
    this.table = table;
    this.getDataList(this.table.name);
  }

  openModal(open: boolean, modalType?: string, data?: any) {
    if (open) {
      this.categoryForm = this.createData(data);
      $('#myModal').modal('show');
    } else {
      this.categoryForm = this.createData(data);
      $('#myModal').modal('hide');
    }
    modalType ? (this.modalType = modalType) : (this.modalType = '');
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
      if (this.modalType === 'Update') {
        this.adminService
          .updateData(this.table.name, this.category)
          .subscribe((res) => {
            this.getDataList(this.table.name);
          });
      } else if (this.modalType === 'Delete') {
        this.adminService
          .deleteData(this.table.name, this.category)
          .subscribe((res: any) => {
            this.getDataList(this.table.name);
          });
      }
    } else {
      this.adminService
        .addData(this.table.name, this.category)
        .subscribe((res) => {
          this.getDataList(this.table.name);
        });
    }
    $('#myModal').modal('hide');
  }

  getDataList(tableName: string) {
    this.tableHead = [];
    this.tableBody = [];
    this.loadData = true;
    this.adminService.getMetadata(tableName).subscribe((res: any) => {
      res.forEach((element) => {
        this.tableHead.push(new ColumnMetadata(element));
      });
    });
    let page = new Page();
    this.adminService.getDataList(tableName, page).subscribe(
      (res: any) => {
        res.content.forEach((element) => {
          this.tableBody.push(new Table(titleCase(tableName), element));
          this.loadData = false;
        });
      },
      (error) => {}
    );
  }
}
