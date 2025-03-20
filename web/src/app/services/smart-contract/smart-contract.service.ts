import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { SmartContract } from '@app/models';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SmartContractService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/smart-contract/`;

  findAll(params?: object) {
    return this.http.get<{ data: SmartContract[]; hasMore: boolean }>(
      this.url,
      {
        params: { ...params },
      },
    );
  }

  findById(id: number) {
    return this.http.get<SmartContract>(`${this.url}${id}`);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}${id}`);
  }

  save(item: SmartContract) {
    if (item.id) {
      return this.http.put(`${this.url}${item.id}`, item);
    }

    return this.http.post(this.url, item);
  }
}
