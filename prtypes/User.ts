export default interface User {
  uid: string;
  email: string | null;
  accessToken?: string;
  emailVerified?: boolean;
}
