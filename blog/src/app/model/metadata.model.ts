export class TableMetadata {
  name: string;
  constructor(tableMetadata?: TableMetadata) {
    if (tableMetadata) {
      this.name = tableMetadata.name;
    } else {
      this.name = '';
    }
  }
}
export class ColumnMetadata {
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
