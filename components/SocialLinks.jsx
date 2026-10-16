import { Github, Globe, Linkedin, Mail, Twitter } from "lucide-react";
import { asArray } from "@/lib/format";

const ICONS = { github: Github, linkedin: Linkedin, email: Mail, twitter: Twitter, website: Globe };

export default function SocialLinks({ socials, className = "" }) {
  const links = asArray(socials);
  if (!links.length) return null;
  return (
    <ul className={`flex gap-3 ${className}`}>
      {links.map(({ type, label, url }) => {
        const Icon = ICONS[type] ?? Globe;
        return (
          <li key={`${type}-${url}`}>
            <a
              href={url}
              target={type === "email" ? undefined : "_blank"}
              rel="noreferrer noopener"
              aria-label={label}
              className="glass glass-hover grid h-11 w-11 place-items-center rounded-xl hover:scale-105"
            >
              <Icon className="h-5 w-5" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
