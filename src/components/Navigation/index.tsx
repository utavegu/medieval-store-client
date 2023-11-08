import Link from 'next/link';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">О нас</Link>
        </li>
        <li>
          <Link href="/catalog">Каталог</Link>
        </li>
        <li>
          <Link href="/news">Новости и акции</Link>
        </li>
        <li>
          <Link href="/contacts">Контакты</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
