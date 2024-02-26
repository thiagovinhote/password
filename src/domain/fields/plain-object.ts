import { URL } from "url";

type Unpacked<T> = T extends (infer U)[] ? U : T;
type Packed<T, U> =
  T extends ReadonlyRequired<any[]>
    ? U[]
    : T extends ReadonlyRequired<infer X>
      ? X
      : T;
type TypeName<T> = T extends Date ? string : T;
export type ReadonlyRequired<T> = { readonly [P in keyof T]-?: TypeName<T[P]> };

export class PlainObject {
  static serializer<Instance, Value = Unpacked<Instance>>(
    instance: Instance,
  ): ReadonlyRequired<Value> {
    if (Array.isArray(instance)) {
      return instance.map(
        PlainObject.serializer,
      ) as unknown as ReadonlyRequired<Value>;
    }

    const newEntries = Object.entries(instance).map(([key, value]) => {
      if (value === undefined) {
        return [key, null];
      }
      if (value instanceof Date) {
        return [key, value.toISOString()];
      }
      if (value instanceof URL) {
        return [key, value.toString()];
      }
      if (Array.isArray(value)) {
        return [key, value.map(PlainObject.serializer)];
      }
      return [key, value];
    });
    return Object.fromEntries(newEntries);
  }

  static deserializer<
    T extends (...args: any) => any,
    Instance,
    Value = Packed<Instance, ReturnType<T>>,
  >(factory: T, value: Instance): Value {
    if (Array.isArray(value)) {
      return value.map(factory) as unknown as Value;
    }
    return factory(value);
  }
}
