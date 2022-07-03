export type UserType = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "manager" | "admin";
  readonly createdAt: Date;
  projects?: string | string[];
};

export type ProjectType = {
  id: string;
  projectName: string;
  description: string;
  manager: UserType;
  users: UserType[];
  readonly createdAt: Date;
  tickets: TicketType[];
};

interface CommentInterface {
  id: string;
  commenter: UserType;
  message: string;
  readonly createdAt: Date;
}

interface HistoryItemInterface {
  id: string;
  property: string;
  oldValue: string;
  newValue: string;
  dateChanged: Date;
}

export type TicketType = {
  id: string;
  title: string;
  description: string;
  assignedTo?: UserType | UserType[];
  submittedBy?: UserType;
  priority: "Low" | "Normal" | "Medium" | "High" | undefined;
  status: "Open" | "Closed" | undefined;
  type: "Task" | "Announcement" | "Issue" | undefined;
  readonly createdAt: Date;
  updatedAt?: Date;
  comments?: CommentInterface[];
  history?: HistoryItemInterface[];
};
