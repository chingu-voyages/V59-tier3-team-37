import Image from "next/image";
import Link from "next/link";

interface NavLink {
  href: string;
  label: string;
}

const navigationLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/roles", label: "Roles" },
  { href: "/questions", label: "Questions" },
];

const Header: React.FC = () => {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  return (
    <header className="border-b border-gray-200 bg-white dark:bg-black px-[15px] py-[15px] flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      {/* Logo / App Name */}
      <div>
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Interview Flashcards Logo"
            width={100}
            height={80}
          />
        </Link>
      </div>

      {/* Date + Navigation */}
      <div className="flex flex-col gap-6 w-full sm:items-end text-gray-900 dark:text-white">
        <time className="hidden sm:block font-bold text-[22px] leading-none">
          {formattedDate}
        </time>

        <nav>
          <ul className="flex justify-center sm:justify-end items-center gap-6 text-base sm:text-[20px] font-normal whitespace-nowrap">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors duration-200 hover:text-emerald-500"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
