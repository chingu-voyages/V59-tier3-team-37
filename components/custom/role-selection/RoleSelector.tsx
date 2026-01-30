"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

interface RoleOption {
  value: string;
  label: string;
}

interface RoleSelectProps {
  options: RoleOption[];
  placeholder?: string;
  label?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
}

export function RoleSelect({
  options,
  placeholder = "Select an option",
  label,
  onValueChange,
  defaultValue,
}: RoleSelectProps) {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    defaultValue,
  );

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    onValueChange?.(value);
  };

  //   const router = useRouter();

  // const {role, setRole, getAvailableRoles, roles} = useSessionStore();

  //        useEffect(() => {
  //     getAvailableRoles();
  //   }, [getAvailableRoles]);

  return (
    <Select value={selectedValue} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
