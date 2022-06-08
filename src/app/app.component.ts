import { Component, Input } from '@angular/core';
import { FileType } from './models/fileType.model';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @Input() selectedFileData!: FileType;
}
