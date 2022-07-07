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
  managerID: string;
  users?: UserType[] | undefined;
  tickets?: TicketType[] | undefined;
  readonly createdAt: string;
};

export class ProjectClass implements ProjectType {
  id: string;
  projectName: string;
  description: string;
  managerID: string;
  readonly createdAt: string;
  users?: UserType[] | undefined;
  tickets?: TicketType[] | undefined;
  constructor(
    id: string,
    projectName: string,
    description: string,
    managerID: string,
    createdAt: string,
    users?: UserType[] | undefined,
    tickets?: TicketType[] | undefined
  ) {
    this.id = id;
    this.projectName = projectName;
    this.description = description;
    this.managerID = managerID;
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
  priority: "Low" | "Normal" | "Medium" | "High" | undefined;
  status: "New" | "New" | "Open" | "New" | "Closed" | undefined;
  type: "Task" | "Announcement" | "Issue" | undefined;
  readonly createdAt: string;
  projectID: string;
  submittedBy?: UserType;
  assignedTo?: UserType | UserType[];
  updatedAt?: string;
  comments?: CommentInterface[];
  history?: HistoryItemInterface[];
};

export interface AuthInterface {
  displayName: string;
  email: string;
  uid: string;
  authenticated: "authenticated" | "checking" | "unauthenticated";
}
