import { NextResponse } from 'next/server';
import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.TOKEN_ENCRYPTION_KEY || 'dev-key-change-in-production!!';
const IV_LENGTH = 16;

function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text: string): string {
  const parts = text.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const encryptedText = Buffer.from(parts[1], 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

const tokens = new Map<string, {
  id: string;
  customerId: string;
  serviceName: string;
  encryptedToken: string;
  label: string;
  isActive: boolean;
  lastUsedAt: string | null;
  expiresAt: string | null;
  createdAt: string;
}>();

export async function GET() {
  const allTokens = Array.from(tokens.values()).map(t => ({
    id: t.id,
    serviceName: t.serviceName,
    label: t.label,
    isActive: t.isActive,
    lastUsedAt: t.lastUsedAt,
    maskedToken: '••••••••' + t.encryptedToken.slice(-4),
    createdAt: t.createdAt,
  }));
  return NextResponse.json({ tokens: allTokens });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { serviceName, token, label, expiresAt } = body;
  
  if (!serviceName || !token) {
    return NextResponse.json({ error: 'serviceName and token are required' }, { status: 400 });
  }

  const id = crypto.randomUUID();
  const encryptedToken = encrypt(token);
  const now = new Date().toISOString();
  
  const newToken = {
    id,
    customerId: 'demo-user',
    serviceName,
    encryptedToken,
    label: label || serviceName,
    isActive: true,
    lastUsedAt: null,
    expiresAt: expiresAt || null,
    createdAt: now,
  };
  
  tokens.set(id, newToken);
  
  return NextResponse.json({
    id,
    serviceName,
    label: newToken.label,
    isActive: true,
    maskedToken: '••••••••' + encryptedToken.slice(-4),
    createdAt: now,
  }, { status: 201 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id || !tokens.has(id)) {
    return NextResponse.json({ error: 'Token not found' }, { status: 404 });
  }
  
  tokens.delete(id);
  return NextResponse.json({ success: true });
}
