export default class {
  constructor(data = {}) {
    this.id = data.id || 0;
    this.title = data.title || '';
    this.content = data.content || '';
    this.created = data.created || new Date().getTime();
    this.updated = data.updated || new Date().getTime();
    this.deleted = data.deleted || false;
  }

  get createdDate() {
    return new Date(this.created).toDateString();
  }
}