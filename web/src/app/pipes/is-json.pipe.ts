import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isJson',
})
export class IsJsonPipe implements PipeTransform {
  transform(value: unknown): boolean {
    const _value = typeof value !== 'string' ? JSON.stringify(value) : value;
    try {
      const parsed = JSON.parse(_value) as unknown;
      return typeof parsed === 'object' && parsed !== null;
    } catch {
      return false;
    }
  }
}
