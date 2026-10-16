import Section from "./ui/Section";
import Reveal from "./Reveal";
import ContactForm from "./ContactForm";

export default function Contact({ profile }) {
  return (
    <Section id="contact">
      <div className="grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <h2 className="section-title">
            Let&apos;s talk<span className="text-sky-500">.</span>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            Have a project, a role or a question in mind? Send a message{profile.email ? " or write to " : "."}
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="font-medium underline underline-offset-4">
                {profile.email}
              </a>
            )}
          </p>
        </Reveal>
        <Reveal delay={100} className="lg:col-span-7">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
