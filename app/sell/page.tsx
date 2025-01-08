import { Card } from "@/components/ui/card";
import  SellForm  from "../components/forms/sell-form";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "../lib/db";
import { redirect } from "next/navigation";
import {unstable_noStore as noStore} from "next/cache";

const redirectToBillingIfNoStripe = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      stripeConnectedLinked: true,
    },
  });

  if (data?.stripeConnectedLinked === false) {
    return redirect("/billing");
  }

  return null;
};

const SellRoute = async () => {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }
  await redirectToBillingIfNoStripe(user.id);
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-10">
      <Card>
        <SellForm />
      </Card>
    </section>
  );
};
export default SellRoute;
