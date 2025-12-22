export default function FAQsPage() {
  const faqs = [
    {
      q: "How long does shipping take?",
      a: "Shipping usually takes 3–7 business days depending on your location.",
    },
    {
      q: "Can I return an item?",
      a: "Yes, we accept returns within 14 days as long as the product is unworn and in original packaging.",
    },
    {
      q: "Do you ship internationally?",
      a: "Yes, we ship to most countries worldwide with additional international rates.",
    },
    {
      q: "How can I track my order?",
      a: "After your order is shipped, you will receive a tracking number via email.",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-10">Frequently Asked Questions</h1>

      <div className="space-y-6">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="border border-stone-400 rounded-lg p-6 bg-stone-200 shadow-sm"
          >
            <h3 className="font-semibold text-lg mb-2">{item.q}</h3>
            <p className="text-stone-700">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
