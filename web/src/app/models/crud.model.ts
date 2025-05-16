import { Observable } from 'rxjs';

import { FindAllResponse } from './response.model';

export interface CrudService<T> {
  findAll(params?: object): Observable<FindAllResponse<T>>;
  findById(id: number | string): Observable<T>;
  delete(id: number | string): Observable<void>;
  save(obj: T): Observable<T>;
}
