export default function BlogPage() {
  const samplePosts = [
    {
      title: "Top Fashion Trends 2025",
      excerpt: "See the latest fashion inspirations dominating the industry this year...",
      date: "Jan 10, 2025",
    },
    {
      title: "How to Choose the Best Shoes",
      excerpt: "Learn the essentials when picking the perfect footwear for your daily needs.",
      date: "Dec 22, 2024",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-10">Blog</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {samplePosts.map((post, index) => (
          <div
            key={index}
            className="border border-stone-400 p-6 rounded-lg bg-stone-200 hover:shadow-lg transition"
          >
            <h2 className="font-semibold text-xl mb-2">{post.title}</h2>
            <p className="text-sm text-stone-600 mb-4">{post.date}</p>
            <p className="text-stone-700 mb-4">{post.excerpt}</p>
            <button className="text-stone-900 underline font-medium">
              Read More →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
