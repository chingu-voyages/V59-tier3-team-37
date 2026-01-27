import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";

async function InstrumentsData() {
  const supabase = await createClient();
  console.log(supabase);
  const { data: instruments, error } = await supabase
    .from("instruments")
    .select();
  console.log(instruments, error);

  return <pre>{JSON.stringify(instruments, null, 2)}</pre>;
}

export default function Instruments() {
  return (
    <Suspense fallback={<div>Loading instruments...</div>}>
      <InstrumentsData />
    </Suspense>
  );
}
