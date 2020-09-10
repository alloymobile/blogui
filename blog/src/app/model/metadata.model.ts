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
  readOnly: boolean;
  constructor(columnMetadata?: any) {
    if (columnMetadata) {
      this.name = columnMetadata.name;
      this.dataType = columnMetadata.dataType;
      this.readOnly = columnMetadata.readOnly;
    } else {
      this.name = '';
      this.dataType = '';
      this.readOnly = true;
    }
  }
}
