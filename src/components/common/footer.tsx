import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-card border-t mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-5">
            <div className="text-2xl font-black bg-linear-to-r from-[#0D9D9A] to-[#C89B14] dark:from-[#5FD0CD] dark:to-[#F0C75E] bg-clip-text text-transparent">
              Novyra Souq
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Your one-stop destination for the latest technology, fashion, and
              lifestyle products. Quality guaranteed with fast shipping.
            </p>
            <div className="space-y-3 text-muted-foreground text-sm">
              <div className="flex items-start gap-3 hover:text-primary transition-colors">
                <MapPin size={18} className="mt-0.5 shrink-0" />
                <span>123 Shop Street, Alexandria City, DC 12345</span>
              </div>
              <div className="flex items-center gap-3 hover:text-primary transition-colors">
                <Phone size={18} className="shrink-0" />
                <span>(+20) 1278396490</span>
              </div>
              <div className="flex items-center gap-3 hover:text-primary transition-colors">
                <Mail size={18} className="shrink-0" />
                <span>support@novyrasouq.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-5 text-foreground">SHOP</h3>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li>
                <Link
                  href="/products"
                  className="hover:text-[#d8a304] hover:dark:text-[#ecb100] hover:translate-x-1 transition-all inline-block"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-[#d8a304] hover:dark:text-[#ecb100] hover:translate-x-1 transition-all inline-block"
                >
                  Fashion
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-[#d8a304] hover:dark:text-[#ecb100] hover:translate-x-1 transition-all inline-block"
                >
                  Home & Garden
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-[#d8a304] hover:dark:text-[#ecb100] transition-all hover:translate-x-1 inline-block"
                >
                  Sports
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-[#d8a304] hover:dark:text-[#ecb100] hover:translate-x-1 transition-all inline-block"
                >
                  Deals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-5 text-foreground">
              CUSTOMER SERVICE
            </h3>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li>
                <Link
                  href="#"
                  className="hover:text-[#d8a304] hover:dark:text-[#ecb100] transition-all hover:translate-x-1 inline-block"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#d8a304] hover:dark:text-[#ecb100] transition-all hover:translate-x-1 inline-block"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#d8a304] hover:dark:text-[#ecb100] transition-all hover:translate-x-1 inline-block"
                >
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#d8a304] hover:dark:text-[#ecb100] transition-all hover:translate-x-1 inline-block"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#d8a304] hover:dark:text-[#ecb100] transition-all hover:translate-x-1 inline-block"
                >
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-5 text-foreground">POLICIES</h3>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li>
                <Link
                  href="#"
                  className="hover:text-[#d8a304] hover:dark:text-[#ecb100] transition-all hover:translate-x-1 inline-block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#d8a304] hover:dark:text-[#ecb100] transition-all hover:translate-x-1 inline-block"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#d8a304] hover:dark:text-[#ecb100] transition-all hover:translate-x-1 inline-block"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#d8a304] hover:dark:text-[#ecb100] transition-all hover:translate-x-1 inline-block"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#d8a304] hover:dark:text-[#ecb100] transition-all hover:translate-x-1 inline-block"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 Novyra Souq. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground dark:bg-amber-500/10 dark:text-[#ffbf00] hover:dark:text-white hover:dark:bg-[#be8f00] transition-all"
            >
              <Facebook size={18} />
            </Link>
            <Link
              href="#"
              className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground dark:bg-amber-500/10 dark:text-[#ffbf00] hover:dark:text-white hover:dark:bg-[#be8f00] transition-all"
            >
              <Instagram size={18} />
            </Link>
            <Link
              href="#"
              className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground dark:bg-amber-500/10 dark:text-[#ffbf00] hover:dark:text-white hover:dark:bg-[#be8f00] transition-all"
            >
              <Twitter size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
