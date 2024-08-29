# Super Bulletin - Next-gen Project Management

<!-- ![image](img_url) -->

**Technologies Used**
---------------------

-   TypeScript
-   React
-   Nextjs
-   React TanStack Query
-   Tailwind
-   Shadcn
-   Prisma
-   PostgreSQL

**Overview**
------------

This is an application meticulously crafted to facilitate the seamless creating, monitoring, and prioritization of tasks throughout the project lifecycle.
This tool empowers users with a clear and intuitive interface, providing real-time status updates on all logged tasks.
Foster collaboration effortlessly through an integrated comment system within each task, enabling teams to collectively address them.
Additionally, users can enhance issue resolution by uploading relevant files and pictures directly within the platform.
Embrace a more efficient task and resolution process with this user-friendly and feature-rich application.

**Functionality**
-----------------
- Authentication 
- Organizations / Workspaces
- Board creation
- Unsplash API for random beautiful cover images
- Activity log for entire organization
- Board rename and delete
- List creation
- List rename, delete, drag & drop reorder and copy
- Card creation
- Card description, rename, delete, drag & drop reorder and copy
- Card activity log
- Landing page
- PostgreSQL DB
- Prisma ORM
- shadcnUI & TailwindCSS

### Prerequisites

**Node version 18.x.x**

### Cloning the repository

```shell
git clone https://github.com/jtgomba/super-bulletin.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=

DATABASE_URL=

NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=

NEXT_PUBLIC_APP_URL=

```

### Setup Prisma

Add a PostgreSql Database (I used Neon to host it)

```shell
npx prisma generate
npx prisma db push

```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command | description                              |
| :------ | :--------------------------------------- |
| `dev`   | Starts a development instance of the app |
