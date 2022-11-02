/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface SimpleService {
  getSimplePrice(ids: string, currencies: string): Promise<any>;
}
