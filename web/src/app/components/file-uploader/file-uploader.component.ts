import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { IconButtonComponent } from '../icon-button';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploaderComponent),
      multi: true,
    },
  ],
  imports: [IconButtonComponent],
})
export class FileUploaderComponent implements ControlValueAccessor {
  files: string[] = [];
  names: string[] = [];

  onChange: (file: string) => void = () => {};
  onTouched: () => void = () => {};

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files);
    } else {
      this.names = [];
      this.files = [];
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    (event.currentTarget as HTMLElement).classList.add('dragover');
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    (event.currentTarget as HTMLElement).classList.remove('dragover');
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    (event.currentTarget as HTMLElement).classList.remove('dragover');

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.handleFile(event.dataTransfer.files);
    }
  }

  private handleFile(files: FileList): void {
    for (const file of files) {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        this.names.push(file.name);
        this.files.push(fileReader.result as string);
        this.onChange(fileReader.result as string);
        this.onTouched();
      };

      fileReader.readAsDataURL(file);
    }
  }

  remove(index: number) {
    this.names.splice(index, 1);
    this.files.splice(index, 1);
    this.onChange(this.files.join(','));
    this.onTouched();
  }

  writeValue(file: string): void {
    //this.file = file;
    this.files.push(file);
  }

  registerOnChange(fn: (file: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
