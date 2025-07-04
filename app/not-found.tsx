import Link from 'next/link';
import css from './page.module.css';

export const metadata = {
  title: 'Page not found – NoteHub',
  description: 'Sorry, page not found.',
  openGraph: {
    title: '404 – Page not found',
    description: 'Sorry, the page you are looking for does not exist.',
    // url: 'https://your-vercel-url.vercel.app/not-found',
    url: ``,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub 404',
      },
    ],
  },
};

const NotFound = () => {
  return (
    <section>
      <div className={css.container}>
        <h1 className={css.title}>404 - Page not found</h1>
        <p className={css.description}>
          Sorry, the page you are looking for does not exist.
        </p>
        <Link href="/" className={css.buttonLink}>
          Go back home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;