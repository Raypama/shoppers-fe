// src/app/blog/[slug]/page.tsx

type Props = {
  params: { slug: string };
};

export default function BlogDetailPage({ params }: Props) {
  return (
    <div>
      <h1>Blog: {params.slug}</h1>
    </div>
  );
}
