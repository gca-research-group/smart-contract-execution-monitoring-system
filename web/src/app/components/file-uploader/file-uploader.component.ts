import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { IconButtonComponent } from '../icon-button';

type File = {
  name: string;
  content: string;
};

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
  files: File[] = [];

  onChange: (files: File[]) => void = () => {};
  onTouched: () => void = () => {};

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files);
    } else {
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
        const name = file.name;
        const content = fileReader.result as string;
        this.files.push({ name, content });
        this.onChange(this.files);
        this.onTouched();
      };

      fileReader.readAsDataURL(file);
    }
  }

  remove(index: number) {
    this.files.splice(index, 1);
    this.onChange(this.files);
    this.onTouched();
  }

  writeValue(files: File[]): void {
    if (files?.length) {
      this.files = files;
    }
  }

  registerOnChange(fn: (files: File[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
