import { TableDetailMetadata } from './../model/datatype.model';
import { Table } from './../model/object.model';
import { Blog } from './../blog';
import { Page, TableMetadata, Active } from '../model/metadata.model';
import { AdminService } from './admin.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
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

  postForm: FormData;

  hasFile: boolean;

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
    this.hasFile = false;
    this.active = new Active();
    this.postForm = new FormData();
  }

  ngOnInit(): void {
    this.getBlog();
  }

  //Get all the table names for the blog and definition
  getBlog() {
    this.adminService.getBlog(this.tableName).subscribe((res: any) => {
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
    this.hasFile = false;
    this.page = new Page();
    this.columnData = new Table(this.capitalize(this.table.name));
    this.getData();
    this.getColumnMetadata();
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
            this.tableBody.push(
              new Table(this.capitalize(this.table.name), element)
            );
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
            this.tableBody.push(
              new Table(this.capitalize(this.table.name), element)
            );
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
  getColumnMetadata() {
    this.loadData = true;
    //Fetching all the table fields and properties
    this.adminService.getMetadata(this.table.name).subscribe(
      (res: any) => {
        this.columns = new TableDetailMetadata(
          this.capitalize(this.table.name + 'Metadata'),
          res
        );
        this.dataForm = this.createData();
      },
      (error) => {
        this.loadData = false;
      }
    );
  }

  getData() {
    this.tableBody = [];
    this.adminService.getDataList(this.table.name, this.page).subscribe(
      (res: any) => {
        this.page = new Page(res);
        res.content.forEach((element) => {
          this.tableBody.push(
            new Table(this.capitalize(this.table.name), element)
          );
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
      Object.entries(data).forEach((column: any) => {
        if (this.isObject(column[1])) {
          group[column[0]] = new FormControl(column[1].id);
        } else {
          if (column[0] === 'image') {
            group[column[0]] = new FormControl(null);
            this.hasFile = true;
            this.postForm = new FormData();
          } else {
            group[column[0]] = new FormControl(column[1]);
          }
        }
      });
      return new FormGroup(group);
    } else {
      let group = {};
      Object.entries(this.columns).forEach((column: any) => {
        if (column[0] === 'image') {
          group[column[0]] = new FormControl(null);
          this.hasFile = true;
          this.postForm = new FormData();
        } else {
          group[column[0]] = new FormControl(column[1].value);
        }
      });
      return new FormGroup(group);
    }
  }

  //Submit user changes and updates
  submitData() {
    this.columnData = this.dataForm.value;
    if (this.hasFile) {
      this.createMultipartFormData();
    }
    if (this.columnData.id == 0 || this.columnData.id == null) {
      this.adminService
        .addData(this.table.name, this.columnData, this.postForm)
        .subscribe((res) => {
          this.getData();
        });
    } else {
      if (this.modalType === 'Update') {
        this.adminService
          .updateData(this.table.name, this.columnData, this.postForm)
          .subscribe((res) => {
            this.getData();
          });
      } else if (this.modalType === 'Delete') {
        this.adminService
          .deleteData(this.table.name, this.columnData)
          .subscribe((res: any) => {
            this.getData();
          });
      }
    }
    $('#myModal').modal('hide');
  }

  //used where there is a image
  createMultipartFormData() {
    let metadata = JSON.stringify(this.columnData);
    this.postForm.append('metadata', metadata);
    // Object.entries(this.columnData).forEach((element: any) => {
    //   if (element[0] !== 'image') {
    //     this.postForm.append(element[0], element[1]);
    //   }
    // });
  }

  //called to create form data when there is a file
  onFileChange(event) {
    let file = event.target.files[0];
    let fileName = event.target.files[0].name;
    this.postForm.append('image', file, fileName);
  }
}
