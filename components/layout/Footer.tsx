import { Github } from "lucide-react";
import Link from "next/link";

import { teamMembers } from "@/data/teamMembers";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[var(--border)] bg-[var(--primary)]">
      <div className="mx-auto px-4 sm:px-6 lg:px-24 py-6 flex flex-col gap-3 items-center text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} Chingu, Inc. This work is licensed
          under the GNU General Public License v3.0.
        </p>

        <p className="flex gap-2 items-center justify-center">
          <Github />
          <Link
            href="https://github.com/chingu-voyages/V59-tier3-team-37"
            className="underline hover:no-underline"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chingu V59 Team 37 GitHub Repository"
          >
            GitHub Project Repository
          </Link>
        </p>

        <p>
          Team members:{" "}
          {teamMembers.map((member, index) => (
            <span key={member.name}>
              <Link
                href={member.href}
                className="underline hover:no-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {member.name}
              </Link>
              {index < teamMembers.length - 1 && ", "}
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}
