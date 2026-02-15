"use client";

interface Props {
  title: string;
  text: string;
}

export default function AboutSection({ title, text }: Props) {
  return (
    <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">{title}</h2>

        <p className="text-gray-700 leading-relaxed text-lg">{text}</p>
      </div>
    </section>
  );
}
