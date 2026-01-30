"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSessionStore } from "@/store/useSessionStore";
import { Role, ROLES } from "@/types";
import { Button } from "@/components/ui/button";

interface RoleOption { // this is kept for testing for now (i don't want to ruin your testing)
  value: string | null;
  label: string;
}

interface RoleSelectProps {
  options?: RoleOption[]; // this is kept for testing for now (i don't want to ruin your testing)
  placeholder?: string;
  label?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
}

export function isRole(value: unknown): value is Role {
  return Object.values(ROLES).includes(value as Role);
}

export function RoleSelect({
  options,
  placeholder = "Select an option",
  label,
  onValueChange,
  defaultValue,
}: RoleSelectProps) {
  const router = useRouter();
  const {role, setRole, getAvailableRoles, roles, setResettingSession} = useSessionStore();

  const handleValueChange = (value: Role ) => {
      setRole(value)
      onValueChange?.(value);
  };

    useEffect(() => {
      setResettingSession()
      getAvailableRoles();
    }, [getAvailableRoles, setResettingSession]);

  return (
    <div className="max-w-48 space-y-4 mx-auto mt-8">
    <Select value={role ?? undefined} onValueChange={handleValueChange}  >
      <SelectTrigger className="w-full" >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent position="popper" className="z-50">
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {roles.map((option) => (
            <SelectItem key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
        <Button
        disabled={!role}
        onClick={() => {
          router.push('/questions')
        }}
        className="mt-4 w-full  py-2 rounded bg-blue-600 text-white disabled:opacity-50"
      >
        Continue
      </Button>
          </div>
  );
}
