import HttpStatusCode from '@/enums/http-status-codes';
import {
  createMessageFromWebhook,
  sendDiscordNotification
} from '@/lib/notify';
import { verifySignature } from '@/lib/verify';
import { webhookSchema } from '@/schemas/vercel';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-vercel-signature');

    if (!verifySignature(rawBody, signature)) {
      return Response.json(
        {
          success: false,
          code: 'invalid_signature',
          error: 'Signature verification failed'
        },
        { status: HttpStatusCode.UNAUTHORIZED_401 }
      );
    }

    const payload = JSON.parse(rawBody);
    const webhook = webhookSchema.parse(payload);

    const embed = createMessageFromWebhook(webhook);
    await sendDiscordNotification(embed);

    return Response.json({ success: true, message: 'Webhook processed' });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return Response.json(
        { success: false, error: error.message },
        { status: HttpStatusCode.BAD_REQUEST_400 }
      );
    }

    return Response.json(
      { success: false, error: 'Internal server error' },
      { status: HttpStatusCode.INTERNAL_SERVER_ERROR_500 }
    );
  }
}

export async function GET() {
  try {
    return Response.json(
      {
        success: false,
        message:
          'This endpoint only accepts POST requests from verified Vercel webhooks'
      },
      { status: HttpStatusCode.METHOD_NOT_ALLOWED_405 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        { success: false, error: error.message },
        { status: HttpStatusCode.INTERNAL_SERVER_ERROR_500 }
      );
    }

    return Response.json(
      { success: false, error: 'Internal server error' },
      { status: HttpStatusCode.INTERNAL_SERVER_ERROR_500 }
    );
  }
}
