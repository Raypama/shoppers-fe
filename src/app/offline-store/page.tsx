import Image from "next/image";

export default function OfflineStorePage() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Our Offline Store</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* STORE IMAGE */}
        <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/images/store.jpg"
            alt="Offline Store"
            fill
            className="object-cover"
          />
        </div>

        {/* STORE INFORMATION */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Visit Us in Person</h2>
          <p className="text-stone-700 max-w-md">
            Experience our full collection offline in our physical store. Try
            items, get personalized styling, and enjoy premium customer service.
          </p>

          <p className="text-stone-700">
            <strong>Address:</strong> 123 Fashion Street, New York, USA
          </p>

          <p className="text-stone-700">
            <strong>Opening Hours:</strong> Mon–Sun / 10AM – 9PM
          </p>
        </div>
      </div>

      {/* GOOGLE MAPS */}
      <div className="mt-12 w-full h-96 rounded-lg overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.976054117022!2d-73.9902976845921!3d40.74881717932795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259af123456!2sH&M%20Store!5e0!3m2!1sen!2sus!4v1700000000000"
          width="100%"
          height="100%"
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}
