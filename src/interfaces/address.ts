export interface AddressRootI {
  results: number;
  status: string;
  data: AddressI[];
}

export interface AddressI {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}
