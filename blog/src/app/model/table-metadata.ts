export class TableMetadata {
  name: string;
  columns: ColumnMetadata[];
  constructor(tableMetadata?: TableMetadata) {
    if (tableMetadata) {
      this.name = tableMetadata.name;
      this.columns = [];
      if (tableMetadata.columns && tableMetadata.columns.length > 0) {
        tableMetadata.columns.forEach((col) => {
          let column = new ColumnMetadata(col);
          this.columns.push(column);
        });
      }
    } else {
      this.name = '';
      this.columns = [];
    }
  }
}
class ColumnMetadata {
  name: string;
  dataType: string;
  constructor(columnMetadata?: any) {
    if (columnMetadata) {
      this.name = columnMetadata.name;
      this.dataType = columnMetadata.dataType;
    } else {
      this.name = '';
      this.dataType = '';
    }
  }
}
