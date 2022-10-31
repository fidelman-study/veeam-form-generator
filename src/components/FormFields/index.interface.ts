import { OptionField } from "../../generated-types/form-generation.interface";

export interface IFormFieldWithoutOptions {
  name: string;
  label: string;
}

export interface IFormFieldWithOptions {
  name: string;
  label?: string;
  options: OptionField[];
}

// Black magic
type Subtract<A, C> = A extends C ? never : A;
type AllKeys<T> = T extends any ? keyof T : never;
type CommonKeys<T extends object> = keyof T;
type NonCommonKeys<T extends object> = Subtract<AllKeys<T>, CommonKeys<T>>;
type PickType<T, K extends AllKeys<T>> = T extends { [k in K]?: any }
  ? T[K]
  : undefined;
type PickTypeOf<T, K extends string | number | symbol> = K extends AllKeys<T>
  ? PickType<T, K>
  : never;

export type Merge<T extends object> = {
  [k in CommonKeys<T>]: PickTypeOf<T, k>;
} & {
  [k in NonCommonKeys<T>]?: PickTypeOf<T, k>;
};
