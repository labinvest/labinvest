import { NextResponse, type NextRequest } from "next/server";

const BACKEND = process.env.BACKEND_URL ?? "http://localhost:3001/api";

function forwardAuth(req: NextRequest): HeadersInit {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const auth = req.headers.get("Authorization");
  if (auth) headers["Authorization"] = auth;
  return headers;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const qs = searchParams.toString();
    const res = await fetch(`${BACKEND}/voluntarios${qs ? `?${qs}` : ""}`, {
      headers: forwardAuth(request),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ erro: "Backend indisponível" }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await fetch(`${BACKEND}/voluntarios`, {
      method: "POST",
      headers: forwardAuth(request),
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ erro: "Backend indisponível" }, { status: 503 });
  }
}
