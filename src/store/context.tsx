'use client';

import Store from '@/store/store';
import { createContext } from 'react';

interface State {
  store: Store;
}

const store = new Store();

export const Context = createContext<State>({
  store,
});

export default function MobxProvider({ children }: { children: React.ReactNode }) {
  return <Context.Provider value={{ store }}>{children}</Context.Provider>;
}
