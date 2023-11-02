'use client';

import { createContext } from 'react';
import OldAuthSlice from './old-auth.slice';

interface IStore {
  oldAuthSlice: OldAuthSlice;
}

const oldAuthSlice = new OldAuthSlice();

export const StoreContext = createContext<IStore>({
  oldAuthSlice,
});

export default function MobxProvider({ children }: { children: React.ReactNode }) {
  return <StoreContext.Provider value={{ oldAuthSlice }}>{children}</StoreContext.Provider>;
}

/*
Эксперименты показали, что наличие или отсутствие провайдера ни на что не влияет, потому в главном лэйауте я его закомментирую. Если что, в компонентах схема использования была такая:
1) import { useContext } from 'react';
2) import { StoreContext } from '@/store';
3) const { oldAuthSlice } = useContext(StoreContext);
4) oldAuthSlice.login(email, password);

А this терялся из-за того, что я в слайсе значения инициировал в конструкторе. Как сейчас - всё работает.
Именованный экспорт / экспорт по-умолчанию также ни на что не повлияли, потому оставляю именованный, чтобы было меньше хаоса.
При использовании провайдера экземпляр класса создаю прямо тут, без него - прямо в слайсе.
И не забывай обсерверов оборачивать компоненты, где используешь значения из стора:
1) import { observer } from 'mobx-react-lite';
2) export default observer(LoginForm);
*/
