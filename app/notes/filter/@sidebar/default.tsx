import Link from 'next/link';
import css from './SidebarNotes.module.css';
import { noteTags } from '@/types/note';

export default async function SidebarNotes() {
  return (
    <div>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href="/notes/filter/All" className={css.menuLink}>
            All notes
          </Link>
        </li>
        {noteTags.map(tag => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
