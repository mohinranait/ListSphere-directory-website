import { JWT_LOGIN } from "@/lib/access-env";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  id: string;
  role: string;
}

// GET TOKEN INFORMATION
export const isAuth = async (): Promise<DecodedToken | null> => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  if (!token) {
    return {
      id: "",
      role: "",
    };
  }

  const decoded = jwt.verify(token, JWT_LOGIN) as DecodedToken;
  return decoded;
};
