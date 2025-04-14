import { v4 } from "uuid";

/**
 * Adds a `uniqueId` property to each object in the provided array if it does not already exist.
 * The `uniqueId` is generated using the `v4` function.
 *
 * @param data - An array of objects to process.
 * @returns A new array of objects with the `uniqueId` property added where necessary.
 */
export function fillIds<T>(data: T[]) {
  return data.map((row: any) => {
    return {
      ...row,
      uniqueId: row.uniqueId || v4(),
    } as T & { uniqueId: string };
  });
}
