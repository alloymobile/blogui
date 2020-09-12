import { Table, Category } from './../model/object.model';
import { Page } from './../model/metadata.model';
import { Blog } from './../blog';
import { TableMetadata, ColumnMetadata } from '../model/metadata.model';
import { AdminService } from './admin.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { titleCase } from 'title-case';
declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [AdminService],
})
export class AdminComponent extends Blog implements OnInit {
  //Stores all the names of table
  tables: TableMetadata[];
  //Holds the current table
  table: TableMetadata;

  //reactive form for data input
  dataForm: FormGroup;

  //Holds the list data fetch from server
  tableBody: any[];
  //Contains all metadata for the table columns
  tableHead: ColumnMetadata[];
  //holds all the columns for a specific table used in crud
  columns: any;

  //spinner used to show when data loading from backend
  loadData: boolean;

  //specifies the crud modals
  modalType: string;

  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder
  ) {
    super();
    this.tableHead = [];
    this.dataForm = this.createData();
    this.tables = [];
    this.table = new TableMetadata();
    this.loadData = false;
    this.modalType = '';
    this.page = new Page();
  }

  ngOnInit(): void {
    this.getBlog();
  }

  //Get all the table names for the blog
  getBlog() {
    this.adminService.getBlog(this.metadata).subscribe((res: any) => {
      res.forEach((element) => {
        this.tables.push(element);
      });
    });
  }

  //Get all pagignated data for the current table
  showList(table: TableMetadata) {
    this.table = table;
    this.columns = new Table(titleCase(table.name));
    this.getDataList();
  }

  //Used to open add,update or delete modal
  openModal(open: boolean, modalType?: string, data?: any) {
    if (open) {
      this.dataForm = this.createData(data);
      $('#myModal').modal('show');
    } else {
      this.dataForm = this.createData(data);
      $('#myModal').modal('hide');
    }
    modalType ? (this.modalType = modalType) : (this.modalType = '');
  }

  //Used to create the form group
  createData(data?: any) {
    if (data) {
      let group = {};
      Object.entries(data).forEach((column) => {
        group[column[0]] = new FormControl(column[1]);
      });
      return new FormGroup(group);
    } else {
      let group = {};
      this.tableHead.forEach((column) => {
        group[column.name] = new FormControl();
      });
      return new FormGroup(group);
    }
  }

  //Submit user changes and updates
  submitData() {
    this.columns = this.dataForm.value;
    if (this.columns.id != 0) {
      if (this.modalType === 'Update') {
        this.adminService
          .updateData(this.table.name, this.columns)
          .subscribe((res) => {
            this.getDataList();
          });
      } else if (this.modalType === 'Delete') {
        this.adminService
          .deleteData(this.table.name, this.columns)
          .subscribe((res: any) => {
            this.getDataList();
          });
      }
    } else {
      this.adminService
        .addData(this.table.name, this.columns)
        .subscribe((res) => {
          this.getDataList();
        });
    }
    $('#myModal').modal('hide');
  }

  //Fetch the data list
  getDataList(pageNumber?: number, column?: string) {
    this.tableHead = [];
    this.tableBody = [];
    this.loadData = true;
    // this.page.sort.direction = !this.page.sort.direction;
    pageNumber
      ? (this.page.pageNumber = pageNumber)
      : (this.page.pageNumber = 0);
    //Fetching all the table head fields and properties
    this.adminService.getMetadata(this.table.name).subscribe((res: any) => {
      res.forEach((element) => {
        this.tableHead.push(new ColumnMetadata(element));
      });
      this.dataForm = this.createData();
      //Fetching the actual data based page and sort
      if (column) {
        this.adminService
          .getDataList(this.table.name, this.page, column)
          .subscribe(
            (res: any) => {
              this.page = new Page(res);
              res.content.forEach((element) => {
                this.tableBody.push(
                  new Table(titleCase(this.table.name), element)
                );
                this.loadData = false;
              });
            },
            (error) => {}
          );
      } else {
        this.adminService.getDataList(this.table.name, this.page).subscribe(
          (res: any) => {
            this.page = new Page(res);
            res.content.forEach((element) => {
              this.tableBody.push(
                new Table(titleCase(this.table.name), element)
              );
              this.loadData = false;
            });
          },
          (error) => {}
        );
      }
    });
  }
}
