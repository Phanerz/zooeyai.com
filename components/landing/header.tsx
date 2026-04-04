import Image from 'next/image';
import { StarButton } from '@/components/ui/star-button';

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 pointer-events-none opacity-0 -translate-y-4 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
      <div className="shell pt-4">
        <div className="panel-surface flex items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <Image
              src="/zooey-icon.png"
              alt="Zooey"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <div>
              <p className="font-display text-lg font-semibold tracking-tight text-white">
                Zooey
              </p>
              <p className="text-xs uppercase tracking-[0.28em] text-white/45">
                Desktop Companion
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-white/65 md:flex">
            <a href="#features" className="transition hover:text-white">
              Features
            </a>
            <a href="#testimonials" className="transition hover:text-white">
              Proof
            </a>
            <a href="#download" className="transition hover:text-white">
              Download
            </a>
          </nav>

          <StarButton href="#download">Get Zooey</StarButton>
        </div>
      </div>
    </header>
  );
}
