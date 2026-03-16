# BookWise - Library Management System

BookWise is a modern, full-stack library management application built with the latest web technologies. It allows users to browse books, manage their accounts, and borrow books, while providing administrators with a comprehensive dashboard to manage users, books, and borrow requests.

## 🚀 Technologies Used

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Database:** [PostgreSQL](https://www.postgresql.org/) (via [Neon](https://neon.tech/))
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication:** [NextAuth.js](https://authjs.dev/) (v5)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Image & Video Storage:** [ImageKit](https://imagekit.io/)
- **Language:** TypeScript

## ✨ Features

### User Features

- **Browse Books:** View a collection of books with details like author, genre, and rating.
- **Search & Filter:** Find books easily (implementation pending).
- **Borrowing System:** Request to borrow books (with availability tracking).
- **Authentication:** Secure sign-up and sign-in with email/password.
- **Profile Management:** View borrowed books and account status.
- **Responsive Design:** Optimized for both desktop and mobile devices.

### Admin Features

- **Dashboard:** Overview of total users, books, and borrowing stats.
- **User Management:** View and manage user accounts (approve/reject requests).
- **Book Management:** Add, edit, and delete books.
- **Borrow Requests:** Approve or deny borrow requests.
- **Real-time Updates:** (Planned)

## 🛠️ Getting Started

First, clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/library-management-app.git
cd library-management-app
npm install
```

### Environment Setup

Create a `.env.local` file in the root directory and add the following variables:

```env
# Database (Neon)
DATABASE_URL="postgresql://user:password@host/db?sslmode=require"

# ImageKit
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY="your_public_key"
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT="your_url_endpoint"
IMAGEKIT_PRIVATE_KEY="your_private_key"

# App
NEXT_PUBLIC_API_ENDPOINT="http://localhost:3000"
NEXT_PUBLIC_PROD_API_ENDPOINT="https://your-domain.com"

# Auth.js / NextAuth
AUTH_SECRET="your_generated_secret" # run `npx auth secret`
NEXTAUTH_URL="http://localhost:3000"
AUTH_TRUST_HOST="true"

```

### Running the App

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 Database Schema

The application uses PostgreSQL with Drizzle ORM. The main tables are:

- **users:** Stores user information, roles (USER/ADMIN), and status (PENDING/APPROVED).
- **books:** Stores book details, copy counts, and media URLs.
- **borrow_records:** Tracks book borrowing history and due dates.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## 📄 License

This project is licensed under the MIT License.
