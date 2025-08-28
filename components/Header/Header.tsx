import Link from 'next/link';
import css from './Header.module.css';
import TagsMenu from '../TagsMenu/TagsMenu';
import { noteTags } from '@/types/note';

export default function Header() {
  return (
    <>
      <header className={css.header}>
        <Link href="/" aria-label="Home">
          NoteHub
        </Link>
        <nav aria-label="Main Navigation">
          <ul className={css.navigation}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <TagsMenu tags={noteTags} />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
