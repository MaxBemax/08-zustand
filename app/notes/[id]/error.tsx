'use client';
import css from './error.module.css';

export default function Error({ error }: { error: Error }) {
  return (
    <p className={css.text}>Could not fetch note details. {error.message}</p>
  );
}
