# 🔐 NextAuth.js Demo

A beautiful, modern Next.js application demonstrating authentication with NextAuth.js and GitHub OAuth.

## ✨ Features

- **GitHub OAuth Authentication** - Sign in with your GitHub account
- **Session Management** - Secure session handling with NextAuth.js
- **Protected Routes** - Dashboard page that requires authentication
- **Modern UI** - Beautiful, responsive design with Tailwind CSS
- **TypeScript** - Full TypeScript support for better development experience

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd nextauth
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

### 3. GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the details:
   - **Application name**: NextAuth Demo
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Copy the Client ID and Client Secret to your `.env.local` file

### 4. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to see the authentication in action!

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts          # NextAuth API route
│   ├── dashboard/
│   │   └── page.tsx                  # Protected dashboard page
│   ├── layout.tsx                    # Root layout with SessionProvider
│   └── page.tsx                      # Home page with auth UI
├── globals.css                       # Global styles
└── ...
```

## 🔧 Key Components

### NextAuth Configuration (`src/app/api/auth/[...nextauth]/route.ts`)

```typescript
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  // ... additional configuration
});

export { handler as GET, handler as POST };
```

### Session Provider (`src/app/layout.tsx`)

```typescript
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
```

### Authentication UI (`src/app/page.tsx`)

```typescript
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  
  // Render different UI based on authentication status
  return (
    // ... beautiful UI with sign in/out functionality
  );
}
```

### Protected Route (`src/app/dashboard/page.tsx`)

```typescript
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // ... protected dashboard content
}
```

## 🎨 UI Features

- **Responsive Design** - Works perfectly on desktop and mobile
- **Loading States** - Smooth loading animations during authentication
- **Modern Gradients** - Beautiful background gradients
- **Interactive Elements** - Hover effects and transitions
- **Session Display** - Shows user profile picture and information
- **Protected Dashboard** - Demonstrates route protection

## 🔒 Security Features

- **OAuth 2.0** - Secure authentication with GitHub
- **Session Management** - Secure session handling
- **Route Protection** - Automatic redirects for unauthenticated users
- **Environment Variables** - Secure configuration management

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📚 Next Steps

This demo covers the basics of NextAuth.js. You can extend it with:

- **Multiple Providers** - Add Google, Facebook, Twitter, etc.
- **Database Sessions** - Store sessions in PostgreSQL, MongoDB, etc.
- **Custom Credentials** - Email/password authentication
- **Role-based Access** - Different user roles and permissions
- **API Route Protection** - Secure your API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this code in your own projects!

## 🙏 Acknowledgments

- [NextAuth.js](https://next-auth.js.org/) - The amazing authentication library
- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - The utility-first CSS framework

---

**Happy coding! 🚀**
