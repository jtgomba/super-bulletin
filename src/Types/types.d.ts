export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "manager" | "admin";
  readonly createdAt: Date;
  classes: Class | Class[];
  board: Board;
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
  submittedBy?: User;
  priority: "low" | "normal" | "medium" | "high" | undefined;
  status: "open" | "closed" | undefined;
  type: "task" | "announcement" | "issue" | undefined;
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
