export type HandleInputChangeType = {
  target:
    | (EventTarget & { name: string; value: string | number; checked: boolean; type: string })
    | { name: string; value: string; checked: boolean; type: string };
};
