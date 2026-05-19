export type JobValues = {
  position: string;
  company: string;
  image: string;
  location: string;
  positionType: string;
  start_date: string;
  end_date: string | null;
  positionId: string;
  link: string;
  responsibilities: string[];
};

export type EducationValues = {
  university: string;
  major: string;
  image: string;
  location: string;
  degree: string;
  start_year: string;
  end_year: string | null;
  link: string;
};

export type AboutPageValues = {
  aboutHtml: string;
  resumeFileBase64: string;
  resumeLink: string;
  jobs: JobValues[];
  educations: EducationValues[];
};

export type AboutDoc = AboutPageValues & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type AboutApiEnvelope = {
  success: boolean;
  statusCode: number;
  message: string;
  data: AboutDoc;
};
