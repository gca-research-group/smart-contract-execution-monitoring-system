import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Blockchain } from '@app/models';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlockchainService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/blockchain/`;

  config(platform: string) {
    return this.http.get<{ field: string; type: string }[]>(
      `${this.url}config`,
      {
        params: { platform },
      },
    );
  }

  findAll(params?: object) {
    return this.http.get<{ data: Blockchain[]; hasMore: boolean }>(this.url, {
      params: { ...params },
    });
  }

  findById(id: number) {
    return this.http.get<Blockchain>(`${this.url}${id}`);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}${id}`);
  }

  save(item: Blockchain) {
    if (item.id) {
      return this.http.put(`${this.url}${item.id}`, item);
    }

    return this.http.post(this.url, item);
  }
}
