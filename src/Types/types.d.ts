export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "student" | "teacher" | "admin";
  readonly createdAt: Date;
};

export type Class = {
  id: string;
  teacher: User;
  students: User[];
  readonly createdAt: Date;
};

interface Comment {
  id: string;
  commenter: User;
  message: string;
  readonly createdAt: Date;
}

interface HistoryItem {
  id: string;
  property: string;
  oldValue: string;
  newValue: string;
  dateChanged: Date;
}

export type Ticket = {
  id: string;
  title: string;
  description: string;
  assignedTo?: User | User[];
  submittedBy?: string;
  priority: "low" | "normal" | "medium" | "high";
  status: "open" | "closed";
  type: "task" | "announcement" | "issue";
  readonly createdAt?: Date;
  updatedAt?: Date;
  comments?: Comment[];
  history?: HistoryItem[];
};

interface BoardList {
  title: string;
  tickets: Ticket[];
}

export type Board = {
  id: string;
  name: string;
  tiedTo: Class | User;
  lists: BoardList[];
};
