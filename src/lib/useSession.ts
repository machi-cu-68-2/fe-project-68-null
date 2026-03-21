import { useSession as useNextAuthSession } from "next-auth/react";

export function useSession() {
  const { data: session } = useNextAuthSession();
  return { session, isLoggedIn: !!session };
}
