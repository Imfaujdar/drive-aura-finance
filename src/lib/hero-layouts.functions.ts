import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const layoutsSchema = z.record(z.string(), z.any());

const saveSchema = z.object({
  slideId: z.string().min(1).max(120),
  layouts: layoutsSchema,
});

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input: RequestInfo | URL, init?: RequestInit) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const listHeroLayouts = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = publicClient();
  const { data, error } = await supabase
    .from("hero_slide_layouts")
    .select("slide_id, layouts");
  if (error) throw new Error(error.message);
  const map: Record<string, string> = {};
  for (const row of data ?? []) map[row.slide_id as string] = JSON.stringify(row.layouts ?? {});
  return map;
});

export const amIHeroAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (error) throw new Error(error.message);
    return { isAdmin: Boolean(data) };
  });

export const saveHeroLayout = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => saveSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");

    const { error } = await context.supabase
      .from("hero_slide_layouts")
      .upsert(
        {
          slide_id: data.slideId,
          layouts: data.layouts,
          updated_by: context.userId,
        },
        { onConflict: "slide_id" },
      );
    if (error) throw new Error(error.message);
    return { ok: true };
  });
