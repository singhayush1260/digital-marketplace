import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { prisma } from "@/app/lib/db";
export async function POST(req: Request) {
  const body = await req.text();
  const headersObject = await headers();
  const signature = headersObject.get("Stripe-Signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_CONNECT_WEBHOOK_SECRET as string
    );
  } catch (error) {
    console.log("Stripe webhook error");
    console.log(error);
    return new Response("webhook error", { status: 400 });
  }
  switch (event.type) {
    case "account.updated": {
      const account = event.data.object;
      await prisma.user.update({
        where: {
          connectedAccountId: account.id,
        },
        data: {
          stripeConnectedLinked:
            account.capabilities?.transfers === "pending" ||
            account.capabilities?.transfers === "inactive"
              ? false
              : true,
        },
      });
      break;
    }

    default: {
      console.log("unhandled event");
    }
  }
  return new Response(null, { status: 200 });
}
