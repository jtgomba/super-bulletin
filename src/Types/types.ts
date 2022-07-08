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

export type TicketStatusType =
  | "New"
  | "Waiting"
  | "Open"
  | "Check"
  | "Closed"
  | undefined;

export type TicketType = {
  id: string;
  title: string;
  description: string;
  priority: "Low" | "Normal" | "Medium" | "High" | undefined;
  status: TicketStatusType;
  type: "Task" | "Announcement" | "Issue" | undefined;
  readonly createdAt: string;
  projectID: string;
  submittedByID?: string;
  assignedTo?: UserType | UserType[];
  updatedAt?: string;
  comments?: CommentInterface[];
  history?: HistoryItemInterface[];
};

export class TicketClass implements TicketType {
  id: string;
  title: string;
  description: string;
  priority: "Low" | "Normal" | "Medium" | "High" | undefined;
  status: TicketStatusType;
  type: "Task" | "Announcement" | "Issue" | undefined;
  createdAt: string;
  projectID: string;
  submittedByID?: string;
  assignedTo?: UserType | UserType[] | undefined;
  updatedAt?: string | undefined;
  comments?: CommentInterface[] | undefined;
  history?: HistoryItemInterface[] | undefined;

  constructor(
    id: string,
    title: string,
    description: string,
    priority: "Low" | "Normal" | "Medium" | "High" | undefined,
    status: TicketStatusType,
    type: "Task" | "Announcement" | "Issue" | undefined,
    createdAt: string,
    projectID: string,
    submittedByID?: string | undefined,
    assignedTo?: UserType | UserType[] | undefined,
    updatedAt?: string | undefined,
    comments?: CommentInterface[] | undefined,
    history?: HistoryItemInterface[] | undefined
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.status = status;
    this.type = type;
    this.createdAt = createdAt;
    this.projectID = projectID;
    this.submittedByID = submittedByID;
    this.assignedTo = assignedTo;
    this.updatedAt = updatedAt;
    this.comments = comments;
    this.history = history;
  }
}

export interface AuthInterface {
  displayName: string;
  email: string;
  uid: string;
  authenticated: "authenticated" | "checking" | "unauthenticated";
}
