'use client';

import css from './error.module.css';

export default function Error({ error }: { error: Error }) {
  return (
    <p className={css.text}>
      Could not fetch the list of notes. {error.message}
    </p>
  );
}
