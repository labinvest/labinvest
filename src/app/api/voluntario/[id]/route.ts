import { NextResponse, type NextRequest } from "next/server";

const BACKEND = process.env.BACKEND_URL ?? "http://localhost:3001/api";

function forwardAuth(req: NextRequest): HeadersInit {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const auth = req.headers.get("Authorization");
  if (auth) headers["Authorization"] = auth;
  return headers;
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const res = await fetch(`${BACKEND}/voluntarios/${id}`, {
      headers: forwardAuth(request),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ erro: "Backend indisponível" }, { status: 503 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const res = await fetch(`${BACKEND}/voluntarios/${id}`, {
      method: "PUT",
      headers: forwardAuth(request),
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ erro: "Backend indisponível" }, { status: 503 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const res = await fetch(`${BACKEND}/voluntarios/${id}`, {
      method: "DELETE",
      headers: forwardAuth(request),
    });
    if (res.status === 204) return new NextResponse(null, { status: 204 });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ erro: "Backend indisponível" }, { status: 503 });
  }
}
