import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Blockchain, CrudService, FindAllResponse } from '@app/models';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlockchainService implements CrudService<Blockchain> {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/blockchain/`;

  config(platform: string) {
    return this.http.get<
      { field: string; type: string; description: string }[]
    >(`${this.url}config`, {
      params: { platform },
    });
  }

  findAll(params?: object) {
    return this.http.get<FindAllResponse<Blockchain>>(this.url, {
      params: { ...params },
    });
  }

  findById(id: number) {
    return this.http.get<Blockchain>(`${this.url}${id}`);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.url}${id}`);
  }

  save(item: Blockchain) {
    if (item._id) {
      return this.http.put<Blockchain>(`${this.url}${item._id}`, item);
    }

    return this.http.post<Blockchain>(this.url, item);
  }
}
