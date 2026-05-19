export type GetEventList = {
  id: string;
  visibility?: string;
  activitytype?: string;
  status?: string;
  title: string;
  start: string;
  end?: string;
  color: string;
  module: string;
  modulelabel: string;
  moduleicon: string;
  isShowStatus: boolean;
  isShowCheckin: boolean;
  ctattendance_status?: boolean;
  attendance_status?: string;
  ctattendanceid?: string;
  isFutureEvents?: boolean;
  hour_format: string;
};

type EventStatus = {
  value: string;
  label: string;
  color: string;
};

type TaskStatus = {
  value: string;
  label: string;
  color: string;
};

export type CalendarResultType = {
  GetEventList: GetEventList[];
  message: string;
  eventstatus: EventStatus[];
  taskstatus: TaskStatus[];
};

export type EventListResponse = {
  success: boolean;
  result: CalendarResultType;
};
