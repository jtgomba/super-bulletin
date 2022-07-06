import { faker } from "@faker-js/faker";
import { ProjectType, TicketType } from "../Types/types";

const createTickets = (amount: number): TicketType[] => {
  const tickets: TicketType[] = [
    {
      id: faker.random.alpha(10),
      title: faker.lorem.sentence(3),
      description: faker.lorem.sentence(5),
      priority: faker.helpers.arrayElement([
        "Low",
        "Normal",
        "Medium",
        "High",
        undefined,
      ]),
      status: faker.helpers.arrayElement(["Open", "Closed", undefined]),
      type: faker.helpers.arrayElement([
        "Task",
        "Announcement",
        "Issue",
        undefined,
      ]),
      createdAt: faker.date
        .between("2020-01-01T00:00:00.000Z", "2030-01-01T00:00:00.000Z")
        .toUTCString(),
    },
  ];

  for (let index = 0; index < amount; index++) {
    tickets.push({
      id: faker.random.alpha(10),
      title: faker.lorem.sentence(3),
      description: faker.lorem.sentence(5),
      priority: faker.helpers.arrayElement([
        "Low",
        "Normal",
        "Medium",
        "High",
        undefined,
      ]),
      status: faker.helpers.arrayElement(["Open", "Closed", undefined]),
      type: faker.helpers.arrayElement([
        "Task",
        "Announcement",
        "Issue",
        undefined,
      ]),
      createdAt: faker.date
        .between("2020-01-01T00:00:00.000Z", "2030-01-01T00:00:00.000Z")
        .toUTCString(),
    });
  }
  return tickets;
};

const fakeProject = (): ProjectType => {
  const fakeProject: ProjectType = {
    id: faker.random.alpha(10),
    projectName: "Test Project",
    description: faker.lorem.sentence(5),
    manager: "",
    users: [],
    createdAt: faker.date
      .between("2020-01-01T00:00:00.000Z", "2030-01-01T00:00:00.000Z")
      .toUTCString(),
    tickets: createTickets(10),
  };
  return fakeProject;
};

export default fakeProject;
