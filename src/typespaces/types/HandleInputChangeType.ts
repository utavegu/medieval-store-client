export type HandleInputChangeType = {
  target:
    | (EventTarget & { name: string; value: string | number | boolean })
    | { name: string; value: boolean | string | [] };
};
