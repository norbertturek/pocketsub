import { IncomingHttpHeaders } from 'http';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook, WebhookRequiredHeaders } from 'svix';
import { prisma } from '../../../../lib/db';

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || '';

export async function POST(request: Request) {
  try {
    // Verify the webhook signature
    const payload = await request.json();
    const headersList = await headers();
    const heads = {
      'svix-id': headersList.get('svix-id'),
      'svix-timestamp': headersList.get('svix-timestamp'),
      'svix-signature': headersList.get('svix-signature'),
    };

    // Verify required headers are present
    if (!heads['svix-id'] || !heads['svix-timestamp'] || !heads['svix-signature']) {
      return NextResponse.json(
        { error: 'Missing required headers' },
        { status: 400 }
      );
    }

    const wh = new Webhook(webhookSecret);
    let evt: any = null;

    try {
      evt = wh.verify(
        JSON.stringify(payload),
        heads as IncomingHttpHeaders & WebhookRequiredHeaders
      );
    } catch (err) {
      console.error('Webhook verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle the webhook event
    const eventType = evt.type;
    
    if (eventType === 'user.created' || eventType === 'user.updated') {
      const { id, email_addresses, username, first_name, last_name } = evt.data;
      const email = email_addresses?.[0]?.email_address;
      const name = [first_name, last_name].filter(Boolean).join(' ') || username;

      console.log(`Processing ${eventType} for user:`, { id, email, name });

      await prisma.user.upsert({
        where: { id },
        create: {
          id,
          email: email || '',
          name: name || '',
        },
        update: {
          email: email || '',
          name: name || '',
        },
      });

      return NextResponse.json({ success: true });
    }

    // Return success for other event types we're not explicitly handling
    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Return 405 for non-POST methods
export async function GET() {
  return new Response('Method Not Allowed', { status: 405 });
}

export async function PUT() {
  return new Response('Method Not Allowed', { status: 405 });
}

// This ensures the route is dynamic and not cached
export const dynamic = 'force-dynamic';
