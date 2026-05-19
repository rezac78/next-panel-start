export type AdminProfileResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: AdminProfile;
  errors: Record<string, string> | null;
};
export type AdminProfile = {
  _id: string;
  name: string;
  email: string;
  githubLink: string;
  LinkDinLink: string;
  username: string;
  age: number | null;
  city: string | null;
  country: string | null;
  description: string | null;
  whatIveBeenWorkingOn: string | null;
  image: string | null;
  jobStatus: string | null;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
  refreshToken: string;
  sessionId: string;
  __v: number;
};
