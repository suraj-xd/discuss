import Head from 'next/head';

export default function Metatags({
  title = 'Discuss / crackDSA',
  description = '',
  image = 'https://firebasestorage.googleapis.com/v0/b/discuss-62d55.appspot.com/o/cracklogo.png?alt=media&token=32d38331-28ef-48e0-8574-820885a0771a',
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@fireship_dev" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
}
