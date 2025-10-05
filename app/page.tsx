import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { createClient } from "@/lib/supabase";

export default async function Page() {
  const supabase = await createClient()
  console.log(supabase)

  return (
    <div className="">
      <Header />
      <Hero />
    </div>
  );
}