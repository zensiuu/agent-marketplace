import { NextResponse } from 'next/server';
import { z } from 'zod';

const PurchaseSchema = z.object({
  templateId: z.string().min(1, 'Template ID is required'),
  paymentMethod: z.union([
    z.literal('stripe'),
    z.literal('card'),
    z.literal('paypal')
  ]),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = PurchaseSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    
    const { templateId, paymentMethod } = result.data;
    
    return NextResponse.json({
      orderId: crypto.randomUUID(),
      templateId,
      paymentMethod,
      status: 'processing',
      downloadUrl: `/download/${templateId}`,
      createdAt: new Date().toISOString(),
    }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
