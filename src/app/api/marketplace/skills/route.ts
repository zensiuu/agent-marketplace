import { NextResponse } from 'next/server';

const skills = [
  { id: 'stripe-integration', name: 'Stripe Integration', price: 29, installs: 2341 },
  { id: 'auth-system', name: 'Auth System', price: 39, installs: 1892 },
  { id: 'blog-writer', name: 'Blog Writer', price: 19, installs: 3456 },
  { id: 'seo-audit', name: 'SEO Audit', price: 24, installs: 1234 },
  { id: 'kubernetes-deploy', name: 'Kubernetes Deploy', price: 49, installs: 876 },
];

export async function GET() {
  return NextResponse.json({ skills });
}
