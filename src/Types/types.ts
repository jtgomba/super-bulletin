export type UserType = {
  id: string;
  name: string;
  email: string;
  role: "user" | "manager" | "admin";
  readonly createdAt: string;
};

export class UserClass implements UserType {
  id: string;
  name: string;
  email: string;
  role: "user" | "manager" | "admin";
  readonly createdAt: string;
  constructor(
    id: string,
    name: string,
    email: string,
    role: "user" | "manager" | "admin",
    createdAt: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.createdAt = createdAt;
  }
}

export type ProjectType = {
  id?: string;
  projectName: string;
  description: string;
  managerID: string;
  users?: string[] | undefined;
  tickets?: TicketType[] | undefined;
  readonly createdAt: string;
};

export class ProjectClass implements ProjectType {
  id: string;
  projectName: string;
  description: string;
  managerID: string;
  readonly createdAt: string;
  users?: string[] | undefined;
  tickets?: TicketType[] | undefined;
  constructor(
    id: string,
    projectName: string,
    description: string,
    managerID: string,
    createdAt: string,
    users?: string[] | undefined,
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
  | "Checking"
  | "Closed"
  | undefined;

export type TicketPriorityType = "Low" | "Medium" | "High" | "None";

export type TicketTypeType = "Task" | "Announcement" | "Issue" | undefined;

export type TicketType = {
  id: string;
  title: string;
  description: string;
  priority: TicketPriorityType;
  status: TicketStatusType;
  type: TicketTypeType;
  readonly createdAt: string;
  projectID: string;
  submittedByID?: string;
  assignedTo?: string | string[] | undefined;
  updatedAt?: string;
  comments?: CommentInterface[];
  history?: HistoryItemInterface[];
};

export class TicketClass implements TicketType {
  id: string;
  title: string;
  description: string;
  priority: TicketPriorityType;
  status: TicketStatusType;
  type: TicketTypeType;
  createdAt: string;
  projectID: string;
  submittedByID?: string;
  assignedTo?: string | string[] | undefined;
  updatedAt?: string | undefined;
  comments?: CommentInterface[] | undefined;
  history?: HistoryItemInterface[] | undefined;

  constructor(
    id: string,
    title: string,
    description: string,
    priority: TicketPriorityType,
    status: TicketStatusType,
    type: TicketTypeType,
    createdAt: string,
    projectID: string,
    submittedByID?: string | undefined,
    assignedTo?: string | string[] | undefined,
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
