import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase";
import type { PriceRange } from "@/types/database";

export async function GET() {
  const supabase = createClient();
  const { data } = await supabase.from("PriceRange").select("*");
  return NextResponse.json(data as PriceRange[]);
}

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const payload = await request.json();
  const { data: user } = await supabase.auth.getUser();
  if (user?.user?.id) {
    await supabase.from("Settings").insert(payload);
  }
  return NextResponse.json(
    { message: "Successfully added price range." },
    { status: 200 }
  );
}

export async function PUT(request: NextRequest) {
  const supabase = createClient();
  const payload = await request.json();
  if (!payload.id) {
    return NextResponse.json(
      { message: "Please provide an ID." },
      { status: 400 }
    );
  }
  await supabase.from("PriceRange").upsert(payload);
  return NextResponse.json(
    { message: "Successfully updated price range." },
    { status: 200 }
  );
}
