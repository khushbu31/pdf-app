import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileType } from 'src/app/models/fileType.model';
import { PdfFileService } from 'src/app/services/pdf-file.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  @Output() selectedFile = new EventEmitter<FileType>();
  constructor(
    private pdfFileService: PdfFileService,
    private snackbar: MatSnackBar
  ) {}
  file: any;
  dragAreaClass!: string;

  fileChange(event: any) {
    const file = event.target.files[0];
    this.saveFileData(file);
  }

  saveFileData(file: File) {
    if (file.name.split('.')[1] !== 'pdf') {
      this.snackbar.open('Only PDF file allowed', 'OK', { duration: 4000 });
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      this.file = reader.result;
      const fileObj = {
        name: file.name,
        data: reader.result as string,
      };
      this.pdfFileService.setData(fileObj);
      this.selectedFile.emit(fileObj);
    };
    reader.readAsDataURL(file);
    this.snackbar.open('Successfull', 'OK', { duration: 4000 });
  }

  onFileChange(event: any) {
    let files: FileList = event.target.files;
    this.saveFiles(files);
  }
  ngOnInit() {
    this.dragAreaClass = 'dragarea';
  }
  @HostListener('dragover', ['$event']) onDragOver(event: any) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }
  @HostListener('dragenter', ['$event']) onDragEnter(event: any) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }
  @HostListener('dragend', ['$event']) onDragEnd(event: any) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }
  @HostListener('dragleave', ['$event']) onDragLeave(event: any) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }
  @HostListener('drop', ['$event']) onDrop(event: any) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      let files: FileList = event.dataTransfer.files;
      this.saveFiles(files);
    }
  }

  saveFiles(files: FileList) {
    if (files.length > 1) {
      this.snackbar.open('Cannot select multiple files', 'OK', {
        duration: 4000,
      });
    } else {
      this.saveFileData(files[0]);
    }
  }
}
