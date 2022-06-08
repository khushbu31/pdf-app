import { Injectable } from '@angular/core';
import { FileType } from '../models/fileType.model';

@Injectable({
  providedIn: 'root',
})
export class PdfFileService {
  constructor() {}
  files: FileType[] = [];
  setData(data: FileType) {
    this.files = this.getData();
    if (!this.files) {
      this.files = [];
    }
    this.files.push(data);
    localStorage.setItem('fileData', JSON.stringify(this.files));
  }

  getData(): FileType[] {
    const rawData = localStorage.getItem('fileData') as string;
    this.files = JSON.parse(rawData);
    return this.files;
  }
}
