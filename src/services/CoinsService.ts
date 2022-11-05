/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface SimpleService {
  getCoinsMarketsList(query: string): Promise<any>;
  getCoinsById(id: string): Promise<any>;
  getCoinsHistoricalByDate(id: string, date: string): Promise<any>;
}
