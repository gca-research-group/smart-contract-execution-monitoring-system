import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { CrudService, FindAllResponse, SmartContract } from '@app/models';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SmartContractService implements CrudService<SmartContract> {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/smart-contract/`;

  findAll(params?: object) {
    return this.http.get<FindAllResponse<SmartContract>>(this.url, {
      params: { ...params },
    });
  }

  findById(id: number) {
    return this.http.get<SmartContract>(`${this.url}${id}`);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.url}${id}`);
  }

  save(item: SmartContract) {
    if (item.id) {
      return this.http.put<SmartContract>(`${this.url}${item.id}`, item);
    }

    return this.http.post<SmartContract>(this.url, item);
  }
}
