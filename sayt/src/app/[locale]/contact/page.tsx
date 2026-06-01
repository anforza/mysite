import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <section className="grid gap-6 md:grid-cols-2">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold">Contact</h1>
        <p>Email: info@edu-portal.uz</p>
        <p>Phone: +998 90 000 00 00</p>
        <iframe
          title="map"
          className="h-64 w-full rounded-lg border"
          src="https://maps.google.com/maps?q=Tashkent&t=&z=13&ie=UTF8&iwloc=&output=embed"
        />
      </div>
      <ContactForm />
    </section>
  );
}
