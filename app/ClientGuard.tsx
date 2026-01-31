"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSessionStore } from "@/store/useSessionStore";

export default function ClientGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sessionStarted, sessionEnded } = useSessionStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (sessionStarted && !sessionEnded && pathname !== "/questions") {
      router.replace("/questions");
    }
  }, [sessionStarted, sessionEnded, pathname, router]);

  const blocked = sessionStarted && !sessionEnded && pathname !== "/questions";

  useEffect(() => {
    if (blocked) {
      router.replace("/questions");
    }
  }, [blocked, router]);

  if (blocked) return null; // 👈 prevents flash

  return <>{children}</>;
}
