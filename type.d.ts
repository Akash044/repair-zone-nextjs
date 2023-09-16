export interface IServices {
  title: string;
  symptoms: string;
  category: string;
  price: number;
  cause: string;
  img: string;
  _id: string;
}
export interface IReducers {
  services: IServices[];
  loadServices: IFetchData;
}
