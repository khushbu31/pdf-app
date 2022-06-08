import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { FileType } from 'src/app/models/fileType.model';
import { PdfFileService } from 'src/app/services/pdf-file.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss'],
})
export class FileListComponent implements OnInit, OnChanges {
  fileNames: FileType[] = [];
  @Output() selectedFile = new EventEmitter<FileType>();
  @Input() fileData!: FileType;
  constructor(private pdfFileService: PdfFileService) {}

  ngOnInit(): void {
    this.getFiles();
  }

  getFiles() {
    this.fileNames = this.pdfFileService.getData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fileData'].currentValue) {
      this.getFiles();
    }
  }

  selectFile(event: MatSelectionListChange) {
    this.selectedFile.emit(event.options[0].value);
    this.fileNames = this.pdfFileService.getData();
  }
}
