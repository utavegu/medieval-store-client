import { authSlice } from '@/store/auth.slice';

const UserMenu = ({ user }: { user: any }) => {
  return (
    <>
      {user ? (
        <div>
          <b>Здравствуйте, {user.firstName}!</b>
          <br />
          <a>Войти в личный кабинет (переход на страницу профиля, защищенный роут)</a>
          <br />
          <button
            type="button"
            onClick={() => authSlice.logout()}
          >
            Разлогиниться
          </button>
          <a>КОРЗИНА</a>
          <button>ЧАТ ПОДДЕРЖКИ</button>
        </div>
      ) : (
        <div>
          <a>Регистрация (переход на страницу с формой регистрации)</a>
          <br />
          Вызов формы входа (переход на страницу с формой входа)
          <a>Вход</a>
        </div>
      )}
    </>
  );
};

export default UserMenu;
