import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { CrudService, FindAllResponse, ExecutionResult } from '@app/models';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExecutionResultService implements CrudService<ExecutionResult> {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/execution-result/`;

  findAll(params?: object) {
    return this.http.get<FindAllResponse<ExecutionResult>>(this.url, {
      params: { ...params },
    });
  }

  findById(id: number) {
    return this.http.get<ExecutionResult>(`${this.url}${id}`);
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.url}${id}`);
  }

  deleteAll() {
    return this.http.delete<void>(`${this.url}`);
  }

  save(item: ExecutionResult) {
    if (item._id) {
      return this.http.put<ExecutionResult>(`${this.url}${item._id}`, item);
    }

    return this.http.post<ExecutionResult>(this.url, item);
  }
}
