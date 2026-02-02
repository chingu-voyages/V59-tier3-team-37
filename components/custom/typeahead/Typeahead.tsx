"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { useSessionStore } from "@/store/useSessionStore";

export function Typeahead() {
  const { roles, role, setRole } = useSessionStore();

  return (
    <div className="max-w-48 space-y-4 mx-auto mt-8">
      <Combobox items={roles} value={role ?? ""} onValueChange={setRole}>
        <ComboboxInput placeholder="Select a role" />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
