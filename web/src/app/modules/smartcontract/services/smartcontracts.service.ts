import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { SmartContract } from '@app/models';

@Injectable({
  providedIn: 'root',
})
export class SmartContractsService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/smartcontract/`;

  findAll(params?: object) {
    return this.http.get<{ data: SmartContract[]; hasMore: boolean }>(this.url, {
      params: { ...params },
    });
  }

  findById(id: number) {
    return this.http.get<SmartContract>(`${this.url}${id}`);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}${id}`);
  }

  save(item: SmartContract) {
    if (item.id) {
      return this.http.put(`${this.url}`, item);
    }

    return this.http.post(this.url, item);
  }
}
