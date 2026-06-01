import { AdmissionForm } from "@/components/AdmissionForm";

export default function AdmissionPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admission</h1>
        <p className="mt-2 text-slate-700">
          Requirements: passport copy, diploma/transcript, photo, and language certificate (if available).
        </p>
      </div>
      <AdmissionForm />
    </section>
  );
}
