export type UserType = {
  id: string;
  name: string;
  email: string;
  role: "user" | "manager" | "admin";
  readonly createdAt: string;
  projects?: string | string[];
};

export type ProjectType = {
  id?: string;
  projectName: string;
  description: string;
  manager: string;
  users?: UserType[] | undefined;
  tickets?: TicketType[] | undefined;
  readonly createdAt: string;
};

export class ProjectClass implements ProjectType {
  id: string;
  projectName: string;
  description: string;
  manager: string;
  readonly createdAt: string;
  users?: UserType[] | undefined;
  tickets?: TicketType[] | undefined;
  constructor(
    id: string,
    projectName: string,
    description: string,
    manager: string,
    createdAt: string,
    users?: UserType[] | undefined,
    tickets?: TicketType[] | undefined
  ) {
    this.id = id;
    this.projectName = projectName;
    this.description = description;
    this.manager = manager;
    this.createdAt = createdAt;
    this.users = users;
    this.tickets = tickets;
  }
}

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
  readonly createdAt: string;
  updatedAt?: Date;
  comments?: CommentInterface[];
  history?: HistoryItemInterface[];
};

export interface AuthInterface {
  displayName: string;
  email: string;
  uid: string;
  authenticated: "authenticated" | "checking" | "unauthenticated";
}
