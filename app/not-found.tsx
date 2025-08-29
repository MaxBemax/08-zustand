import { Metadata } from 'next';
import css from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Not-Found Page',
  description: 'The page displayed on a route that does not exist',
  openGraph: {
    title: 'Not-Found Page',
    description: 'The page displayed on a route that does not exist.',
    url: 'https://08-zustand-six-zeta.vercel.app/notification',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: '404 - Page not found',
      },
    ],
  },
};

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
