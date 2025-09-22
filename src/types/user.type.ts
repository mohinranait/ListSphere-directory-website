// type for API response
export interface IUser  {
  _id: string;
  fullName: string;
  email: string;
  role: "user" | "admin";
  phone?: string;
  verifyEmail: boolean;
  package: "free" | "silver" | "premium";
  createdAt: Date;
  updatedAt: Date;
};
