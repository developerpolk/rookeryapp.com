import { NextResponse } from "next/server";
import supabase from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { email, utm_source, expo_opt_in } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const { error } = await supabase.from("waitlist_emails").insert([
      {
        email,
        utm_source,
        expo_opt_in: expo_opt_in || false,
      },
    ]);

    if (error) {
      console.error("Insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
