# To-Do List Project

This To-Do List project is a simple web application that allows users to create, read, update, and delete tasks. It supports task management with various features such as filtering tasks by name or status, and marking tasks as complete or incomplete.

---

## Demo

[https://taskly-web-app.vercel.app/](https://taskly-web-app.vercel.app/)

## **Screenshots**

<img src="https://taskly-web-app.vercel.app/ss.png" alt="Screenshot" border="0">

---

## Key Features
- Add new tasks
- View the list of tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as complete or incomplete
- Filter tasks by name or status

---

## Technologies Used

![Next.js](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![NextUI](https://img.shields.io/badge/NextUI-black?style=for-the-badge&logo=nextui&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white)
![Axios](https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white)

- **Framework**: [Next.js](https://nextjs.org/) (v15.0.3)
- **UI Components**: [Next UI](https://nextui.org/)
- **Database**: [Prisma ORM](https://www.prisma.io/) with PostgreSQL.
- **State Management**: [React Query](https://tanstack.com/query)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Deployment**: [Vercel](https://vercel.com/)


---

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/todo-list-nextjs.git
    cd todo-list-nextjs
    ```

2. Install the backend dependencies:
    ```bash
    cd backend
    npm install
    ```

3. Create a .env file at the root of the project and configure the following:

```bash
    DATABASE_URL=your_database_connection_string
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Generate Prisma client:

```bash
    npx prisma generate
```

5. Run database migrations:

```bash
    npx prisma migrate dev
```

6. Start the development server:

```bash
    npm run dev
```

7. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).


---

## API Endpoints

The backend provides the following API endpoints (hosted on Vercel at `https://todo-list-nextjs.vercel.app/api/tasks`):

- **GET** `/api/tasks`: Fetch all tasks.
- **POST** `/api/tasks`: Create a new task.
- **PATCH** `/api/tasks/`: Mark all tasks as complete.
- **GET** `/api/tasks/:id`: Fetch a single task by ID.
- **PUT** `/api/tasks/:id`: Update a task by ID.
- **PATCH** `/api/tasks/:id`: Update the status of a task by ID.
- **DELETE** `/api/tasks/:id`: Delete a task by ID.


