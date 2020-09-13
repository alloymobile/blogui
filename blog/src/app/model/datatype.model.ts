export class TextMetadata {
  id: string;
  type: string;
  name: string;
  value: string;
  readOnly: boolean;
  constructor(text?: any) {
    if (text) {
      this.id = text.id;
      this.name = text.name;
      this.type = text.type;
      this.value = text.value;
      this.readOnly = text.readOnly;
    } else {
      this.id = '';
      this.name = '';
      this.type = '';
      this.value = '';
      this.readOnly = false;
    }
  }
}

export class NumberMetaData {
  id: string;
  type: string;
  name: string;
  constructor(text?: any) {
    if (text) {
      this.id = text.id;
      this.name = text.name;
      this.type = text.type;
    } else {
      this.id = '';
      this.name = '';
      this.type = '';
    }
  }
}
