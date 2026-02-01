declare module "react-select-country-list" {
  type Country = {
    label: string;
    value: string;
  };

  export default function countryList(): {
    getData(): Country[];
  };
}
