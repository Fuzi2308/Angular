export interface Address {
  city?: string;
  street?: string;
  postCode?: string;
}

export interface Person {
  id?: number;
  firstName?: string;
  familyName?: string;
  age?: number;
  address?: Address;
}
