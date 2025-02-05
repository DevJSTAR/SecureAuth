# SecureAuth - Modern Authentication Template

![SecureAuth Demo 1](https://i.imgur.com/3Tq3dv3.png)
<img src="https://i.imgur.com/Z9fKAir.png" height="120px" width="auto"> <img src="https://i.imgur.com/fVc7vcx.png" height="120px" width="auto">
<img src="https://i.imgur.com/62jrYwD.png" height="120px" width="auto"> <img src="https://i.imgur.com/Za7V1SC.png" height="120px" width="auto">

## 🔥 What is SecureAuth?

**Building authentication from scratch?** Stop reinventing the wheel!  
SecureAuth is a production-ready authentication template made from vanilla HTML, CSS, and JS, featuring:

- Modern UI/UX design
- Full authentication workflow (Signup/Login/Password Reset)
- Session management
- Email verification
- Dashboard with user analytics
- Built with Supabase + JavaScript
- Responsive & customizable components

**Perfect for:** Startups, SaaS apps, personal projects, and prototypes.  
**Deploy in minutes** - Focus on your core features instead of auth logic!

---

## 🚀 Features

| Category          | Features                                                                 |
|-------------------|--------------------------------------------------------------------------|
| **Core Auth**      | Email/password auth, Session persistence, Email verification            |
| **Security**       | Password hashing, Automatic token refresh, CSRF protection              |
| **UI Components**  | Animated toasts, Loading states, Password visibility toggle             |
| **Dashboard**      | User profile overview                                                   |
| **Integrations**   | Supabase backend, Ready for social logins (OAuth)                       |

---

## ⚙️ Setup Guide (3 Steps)

### 1. Supabase Configuration

1. **Create Supabase Project**  
   Go to [Supabase Dashboard](https://supabase.com/dashboard) → "New Project"  
   - Name: `SecureAuth-Prod`
   - Database Password: `Choose strong password`
   - Region: `Pick closest to users`

2. **Configure Authentication**  
   In your Supabase project:  
   - **Authentication → Providers**  
     Enable "Email" provider
   - **Authentication → URL Configuration**  
     Add redirect URLs:
     ```text
     http://localhost:3000/*  
     https://yourdomain.com/*
     ```

3. **Create Profiles Table**  
   In **SQL Editor**, run:
   ```sql
   CREATE TABLE public.profiles (
     id uuid REFERENCES auth.users NOT NULL PRIMARY KEY,
     display_name text,
     created_at timestamp with time zone DEFAULT now()
   );
   ```
   Enable RLS (Row Level Security) and create policies.

---

### 2. Local Development Setup

1. **Clone Repository**
   ```bash
   git clone https://github.com/DevJSTAR/SecureAuth.git
   cd secureauth-template
   ```

2. **Configure Environment**  
   Edit `app.js`:
   ```javascript
   const supabase = window.supabase.createClient(
     'YOUR_SUPABASE_URL',  // Get from Supabase → Settings → API
     'YOUR_ANON_KEY'       // Get from Supabase → Settings → API
   );
   ```

3. **Launch Development Server**  
   ```bash
   npm install serve
   serve -l 3000
   ```

---

### 3. Production Deployment

1. **Hosting Recommendations**  
   - Vercel (Static Hosting)  
   - Netlify (Static Hosting)  
   - Supabase Hosting (Full-stack)

2. **Required Configurations**  
   - Set redirect URLs in Supabase Dashboard  
   - Enable CORS for your domain  
   - Configure custom domain (optional)

---

## 🎨 Customization Guide

| Component         | Customization Options                                  |
|-------------------|--------------------------------------------------------|
| **Theming**       | Edit CSS variables in `styles.css`                     |
| **Branding**      | Replace logo in `nav` component                        |
| **Email**         | Customize email templates in Supabase Dashboard        |
| **Dashboard**     | Modify `dashboard.html` layout                         |

---

## 📚 Database Schema

```text
auth.users (Supabase default)  
├── id  
├── email  
├── last_sign_in_at  
└── email_confirmed_at  

public.profiles (Custom table)  
├── id (FK to auth.users)  
├── display_name  
└── created_at  
```

---

## 🛠️ Troubleshooting

| Issue                      | Solution                                  |
|----------------------------|-------------------------------------------|
| "User already exists"      | Check Supabase Auth → Users table         |
| Emails not sending         | Verify SMTP settings in Supabase          |
| Redirect loop              | Confirm session persistence configuration |
| CORS errors                | Whitelist domains in Supabase Dashboard   |

---

## 📜 License

MIT License - Free for personal and commercial use.  
**Attribution appreciated** but not required.

---

## 🌟 Why Choose SecureAuth?

- **100+ Hours Saved** - No need to build auth from scratch
- **Security First** - Built following OWASP best practices
- **Modern Stack** - Uses Supabase's scalable backend
- **Customizable** - Full control over UI and logic

**[⬆️ Get Started Now](#-setup-guide-3-steps)**
