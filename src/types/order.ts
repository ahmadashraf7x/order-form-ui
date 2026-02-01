export type StudentInfo = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
};

export type DurationOption = 6 | 9 | 12 | 18 | 24 | 36;

export type CardData = {
  number: string;
  expiry: string;
  cvv: string;
};

export type BankData = {
  name: string;
  account: string;
};