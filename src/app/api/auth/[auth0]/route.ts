export async function GET(req: Request) {
  return new Response(JSON.stringify({ status: 'ok' }), { 
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST(req: Request) {
  return new Response(JSON.stringify({ status: 'ok' }), { 
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
