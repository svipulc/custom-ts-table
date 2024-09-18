// get nested keys of an object
export type DeepKeys<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? K | `${K}.${DeepKeys<T[K]>}`
          : K
        : never;
    }[keyof T]
  : never;

//string & auto complete type handler
export type HandleAutoComplete<T extends string> = T | Omit<string, T>;

//user data type
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: {
    city: string;
    country: string;
    postalCode: string;
  };
  avatar: string;
  Extract: {
    Level1: {
      Level2: {
        Level3: string;
      };
    };
  };
}
