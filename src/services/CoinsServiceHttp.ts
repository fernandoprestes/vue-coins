/* eslint-disable @typescript-eslint/no-explicit-any */
import type HttpClient from '~/infra/HttpClient';
import type CoinsService from './CoinsService';

export default class CoinsServiceHttp implements CoinsService {
  constructor(readonly httpClient: HttpClient) {}

  async getCoinsById(id: string) {
    const response = await this.httpClient.get(`coins/${id}`);
    return response;
  }

  async getCoinsHistoricalByDate(id: string, date: string) {
    const response = await this.httpClient.get(`coins/${id}/history?date=${date}`);
    return response;
  }

  async getCoinsMarketsList(query: string) {
    const response = await this.httpClient.get(`coins/markets?${query}`);
    return response;
  }
}
