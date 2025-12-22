export default function ContactPage() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <p className="text-stone-700 mb-10 max-w-2xl">
        Feel free to reach out to us with any questions regarding your orders,
        shipping, or products. Our team will get back to you within 24 hours.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* CONTACT FORM */}
        <form className="bg-stone-200 p-6 rounded-lg shadow-md space-y-6">
          <div>
            <label className="block mb-2 font-medium">Your Name</label>
            <input
              type="text"
              className="w-full border border-stone-400 rounded px-3 py-2"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              className="w-full border border-stone-400 rounded px-3 py-2"
              placeholder="example@mail.com"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Message</label>
            <textarea
              rows={5}
              className="w-full border border-stone-400 rounded px-3 py-2"
              placeholder="How can we help you?"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-stone-900 text-white px-6 py-2 rounded hover:bg-stone-700 transition"
          >
            Send Message
          </button>
        </form>

        {/* CONTACT INFO */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Customer Support</h2>

          <p className="text-stone-700">
            <strong>Email:</strong> support@shop.com
          </p>
          <p className="text-stone-700">
            <strong>Phone:</strong> +1 234 567 890
          </p>
          <p className="text-stone-700">
            <strong>Business Hours:</strong> Mon–Fri / 9AM – 6PM
          </p>

          <p className="text-stone-700 max-w-md">
            For inquiries about bulk orders or partnerships, please email our
            business department at <strong>business@shop.com</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}
