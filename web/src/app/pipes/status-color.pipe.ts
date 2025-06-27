import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'statusColor' })
export class StatusColorPipe implements PipeTransform {
  transform(key: string) {
    switch (key) {
      case 'PENDING':
        return 'orange';
      case 'SUCCESS':
        return 'green';
      default:
        return 'red';
    }
  }
}
