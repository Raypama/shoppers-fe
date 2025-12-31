// src/app/blog/[slug]/page.tsx

type Props = {
  params: { slug: string };
};

export default function offlineStoreDetailPage({ params }: Props) {
  return (
    <div>
      <h1>store: {params.slug}</h1>
    </div>
  );
}
