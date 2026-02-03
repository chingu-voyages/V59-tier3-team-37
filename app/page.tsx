import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <section className="flex flex-col items-center justify-center px-4 py-16">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
          Interview Questions Generator
        </p>

        <Link
          href="/how-it-works"
          aria-label="Go to How It Works page"
          className="group cursor-pointer"
        >
          <div className="rounded-3xl border-4 border-slate-300 bg-white/80 p-4 transition-colors duration-200 group-hover:border-purple-500 dark:border-slate-600 dark:bg-slate-900/80">
            <Image
              src="/hero_logo1.jpg"
              alt="Interview Questions Generator logo"
              width={320}
              height={320}
              className="h-auto w-64 sm:w-80"
              priority
            />
          </div>
        </Link>

        <p className="mt-6 max-w-xl text-center text-sm text-slate-600 dark:text-slate-400">
          Click the logo to jump into smart, role-based interview question
          practice.
        </p>
      </section>
    </div>
  );
}
