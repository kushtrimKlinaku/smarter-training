import Link from "next/link";

const footerLinks = {
  company: [
    { label: "Rreth Nesh", href: "/about" },
    { label: "Programet", href: "/services" },
    { label: "Kontakti", href: "/contact" },
  ],
  academy: [
    { label: "Soft Skills Academy", href: "/soft-skills-academy" },
    { label: "Adaptueshmëria Inteligjente", href: "/soft-skills-academy/adaptueshmeria-inteligjente" },
    { label: "Inteligjenca Sociale", href: "/soft-skills-academy/inteligjenca-sociale" },
    { label: "Lidershipi Transformues", href: "/soft-skills-academy/lidershpi-transformues" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white">
      {/* Main Footer */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <span className="text-[22px] font-bold tracking-[-0.02em] text-white">
                Smarter
              </span>
            </div>
            <p className="text-white/50 text-[14px] leading-relaxed mb-6">
              © {new Date().getFullYear()} Smarter Corporate Training. Të gjitha
              të drejtat e rezervuara.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.06em] text-white/40 mb-6">
              Kompania
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-[14px] transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academy Links */}
          <div>
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.06em] text-white/40 mb-6">
              Akademia
            </h3>
            <ul className="space-y-3">
              {footerLinks.academy.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-[14px] transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.06em] text-white/40 mb-6">
              Ligjore
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-white/60 hover:text-white text-[14px] transition-colors duration-200 cursor-pointer"
                >
                  Politika e Privatësisë
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-white/60 hover:text-white text-[14px] transition-colors duration-200 cursor-pointer"
                >
                  Kushtet e Shërbimit
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
