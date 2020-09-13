import { Table } from './../model/object.model';
import { Blog } from './../blog';
import {
  Page,
  TableMetadata,
  ColumnMetadata,
  Active,
} from '../model/metadata.model';
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
  columnName: any;
  //holds all the columns and their metadata used for forms
  columns: any;
  //holds all the columns for a specific table used in crud
  columnData: any;
  //spinner used to show when data loading from backend
  loadData: boolean;

  //specifies the crud modals
  modalType: string;

  //Search String
  search: string;

  //Select the active table
  active: Active;

  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder
  ) {
    super();
    this.columns = {};
    this.dataForm = this.createData();
    this.tables = [];
    this.table = new TableMetadata();
    this.loadData = false;
    this.modalType = '';
    this.search = '';
    this.active = new Active();
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
    this.active.table = table.name;
    this.active.page = 0;
    this.page = new Page();
    this.columnData = new Table(titleCase(this.table.name));
    this.getDataHead();
  }

  getSearchDataList(pageNumber?: number, search?: string) {
    this.tableBody = [];
    this.loadData = true;
    if (search === '') {
      this.search = search;
    }
    pageNumber
      ? (this.page.pageNumber = pageNumber)
      : (this.page.pageNumber = 0);
    this.adminService
      .getSearchDataList(this.table.name, this.page, this.search, this.columns)
      .subscribe(
        (res: any) => {
          this.page = new Page(res);
          res.content.forEach((element) => {
            this.tableBody.push(new Table(titleCase(this.table.name), element));
          });
          this.loadData = false;
          if (this.tableBody && this.tableBody.length > 0) {
            this.columnName = this.tableBody[0];
          }
        },
        (error) => {
          this.loadData = false;
        }
      );
  }

  getFilterDataList(pageNumber?: number, column?: any) {
    this.active.page = pageNumber;
    this.tableBody = [];
    this.loadData = true;
    if (column) {
      if (this.sortColumn.name === column.key) {
        this.sortColumn.sort = !this.sortColumn.sort;
      } else {
        this.sortColumn.name = column.key;
        this.sortColumn.sort = false;
      }
    }
    pageNumber
      ? (this.page.pageNumber = pageNumber)
      : (this.page.pageNumber = 0);
    this.adminService
      .getDataList(this.table.name, this.page, this.sortColumn)
      .subscribe(
        (res: any) => {
          this.page = new Page(res);
          res.content.forEach((element) => {
            this.tableBody.push(new Table(titleCase(this.table.name), element));
          });
          this.loadData = false;
          if (this.tableBody && this.tableBody.length > 0) {
            this.columnName = this.tableBody[0];
          }
        },
        (error) => {
          this.loadData = false;
        }
      );
  }

  //Fetch the data list
  getDataHead() {
    this.loadData = true;
    //Fetching all the table head fields and properties
    this.adminService.getMetadata(this.table.name).subscribe(
      (res: any) => {
        this.columns = new Table(titleCase(this.table.name), res);
        this.dataForm = this.createData();
        this.getDataBody();
      },
      (error) => {
        this.loadData = false;
      }
    );
  }

  getDataBody() {
    this.tableBody = [];
    this.adminService.getDataList(this.table.name, this.page).subscribe(
      (res: any) => {
        this.page = new Page(res);
        res.content.forEach((element) => {
          this.tableBody.push(new Table(titleCase(this.table.name), element));
        });
        this.loadData = false;
        if (this.tableBody && this.tableBody.length > 0) {
          this.columnName = this.tableBody[0];
        }
      },
      (error) => {
        this.loadData = false;
      }
    );
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
      Object.entries(this.columns).forEach((column: any) => {
        group[column[0]] = new FormControl(column[1].value);
      });
      return new FormGroup(group);
    }
  }

  //Submit user changes and updates
  submitData() {
    this.columnData = this.dataForm.value;
    if (this.columnData.id == 0 || this.columnData.id == null) {
      this.adminService
        .addData(this.table.name, this.columnData)
        .subscribe((res) => {
          this.getDataBody();
        });
    } else {
      if (this.modalType === 'Update') {
        this.adminService
          .updateData(this.table.name, this.columnData)
          .subscribe((res) => {
            this.getDataBody();
          });
      } else if (this.modalType === 'Delete') {
        this.adminService
          .deleteData(this.table.name, this.columnData)
          .subscribe((res: any) => {
            this.getDataBody();
          });
      }
    }
    $('#myModal').modal('hide');
  }
}
