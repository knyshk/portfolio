# 🌐 Portfolio - Kanishk Jain

### Built with React, GSAP, Three.js, TailwindCSS

A fully animated, interactive developer portfolio featuring 3D elements, smooth scroll animations, and a professional contact form. Built with modern web technologies and deployed on Netlify.

> ⚡ Production-ready portfolio with React (Vite), TailwindCSS, GSAP, React Three Fiber, and Netlify Forms integration.

---

## 🚀 Tech Stack

| Technology       | Description                             |
| ---------------- | --------------------------------------- |
| **React (Vite)** | Fast dev server and production bundling |
| **Tailwind CSS** | Utility-first styling for components    |
| **GSAP**         | Scroll-based animation and motion logic |
| **Three.js**     | 3D scenes powered by React Three Fiber  |
| **Drei**         | Useful helpers for 3D rendering         |
| **Netlify Forms**| Built-in form handling with email notifications |

---

## 📁 Features

- 🔥 3D Hero Section with animated planet and golden ring
- 🧩 Smooth slide-in Navbar with staggered link animations
- 👨‍💻 About section with professional CV data and bio
- 🎯 Services section showcasing technical skills
- 🏆 Experience timeline with professional history
- 🖼️ Works section with project showcases
- 📧 Contact form with Netlify Forms integration (no backend needed)
- 💼 Fully responsive and accessible on all screen sizes

---

## 📦 Setup & Installation

```bash
git clone https://github.com/knyshk/portfolio.git
cd portfolio
npm install
npm run dev
```

> Open http://localhost:5173 in your browser.

---

## 🚀 Deployment (Netlify)

**Build for production:**
```bash
npm run build
```

**Deploy to Netlify:**

1. Go to [app.netlify.com](https://app.netlify.com)
2. Sign up/login (free)
3. Drag and drop the `dist` folder, or:
4. Connect your GitHub repo
5. Set build command: `npm run build`
6. Set publish directory: `dist`
7. Deploy!

**Enable Contact Form:**
- Forms are automatically detected by Netlify
- Set up email notifications in Site Settings → Forms
- View submissions in Netlify dashboard

---

## 🛠️ Customization

- Update personal info in `/src/constants/index.js`
- Modify 3D models in `/src/sections/Hero.jsx`
- Edit contact details in `/src/sections/Contact.jsx`
- Customize colors/fonts in `tailwind.config.js`
- Replace project images in `/public/assets/projects/`

---

## 📧 Contact Form Setup

The contact form uses **Netlify Forms** (completely free):

1. Form automatically works when deployed to Netlify
2. No backend server or SMTP configuration needed
3. View submissions: Netlify Dashboard → Forms
4. Email notifications: Site Settings → Forms → Add notification
5. Includes honeypot spam protection

---

## 📝 License

This project is open source and available for personal and commercial use.

---

**Built by Kanishk Jain** | [GitHub](https://github.com/kanishk-jain) | [LinkedIn](https://www.linkedin.com/in/kanishk-jain)
