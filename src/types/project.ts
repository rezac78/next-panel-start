export type ProjectTool = {
  _id: string;
  name: string;
  slug: string;
  image: string | null;
};

export type ProjectLink = {
  name: string;
  url: string;
};

export type Project = {
  _id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  image: string | null;
  tools: ProjectTool[];
  links: ProjectLink[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type GetProjectsResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Project[];
  errors: null | unknown;
};
