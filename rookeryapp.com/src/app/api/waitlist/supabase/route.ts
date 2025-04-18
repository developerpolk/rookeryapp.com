import { NextResponse } from "next/server";
import supabase from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { email, utm_source, expo_opt_in, device_type } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const { error } = await supabase.from("waitlist_emails").insert([
      {
        email,
        utm_source,
        expo_opt_in: expo_opt_in || false,
        device_type
      },
    ]);

    // ✅ Handle duplicate email error from Supabase
    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "Thanks, but you're already on the waitlist!" },
          { status: 409 }
        );
      }

      console.error("Insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
