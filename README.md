# MARAGANI MOHANA VENKATA SAI - Portfolio Website

A modern, responsive portfolio website built with HTML5, Tailwind CSS, and vanilla JavaScript. This portfolio showcases my skills, projects, and achievements as a Frontend Developer & Java Full Stack Developer.

## 🚀 Features

### ✨ Design & UI
- **Premium Dark Theme**: Modern SaaS-inspired design with glassmorphism effects
- **Responsive Design**: Mobile-first approach, works seamlessly on all devices
- **Smooth Animations**: Scroll reveals, hover effects, and micro-interactions
- **Modern Typography**: Clean Inter font with proper hierarchy
- **Gradient Accents**: Beautiful gradient buttons and text effects

### 📱 Sections
1. **Hero Section**: Eye-catching introduction with animated typing effect
2. **About Section**: Professional summary with tech stack showcase
3. **Skills Section**: Categorized skills with interactive cards
4. **Featured Projects**: Highlighted projects with modern cards
5. **Achievements**: Certifications and accomplishments
6. **Contact Section**: Functional contact form with EmailJS integration

### 🛠️ Technical Features
- **GitHub API Integration**: Dynamic project fetching from GitHub
- **EmailJS Integration**: Contact form without backend
- **Smooth Scrolling**: Navigation with active state highlighting
- **Mobile Menu**: Hamburger menu for mobile devices
- **Form Validation**: Real-time validation with error handling
- **Loading States**: Professional loading animations
- **SEO Optimized**: Proper meta tags and semantic HTML

## 🎨 Design System

### Colors
- **Background**: `#0F172A` (Slate-900)
- **Section Background**: `#111827` (Slate-800)
- **Card Background**: `#1E293B` (Slate-700)
- **Primary Accent**: `#6366F1` (Indigo-500)
- **Secondary Accent**: `#22D3EE` (Cyan-400)
- **Text Primary**: `#F8FAFC` (Slate-50)
- **Text Secondary**: `#94A3B8` (Slate-400)
- **Borders**: `#334155` (Slate-600)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold weights (600-800)
- **Body Text**: Regular weight (400)
- **Accent Text**: Gradient effect

## 📁 Project Structure

```
Portfolio/
├── index.html              # Main portfolio page
├── projects.html           # Projects page with GitHub integration
├── js/
│   ├── main.js            # Main JavaScript functionality
│   ├── github.js          # GitHub API integration
│   └── email.js           # EmailJS contact form
├── assets/
│   └── resume.pdf         # Resume file
└── README.md              # This file
```

## 🛠️ Technologies Used

### Frontend
- **HTML5**: Semantic markup with accessibility in mind
- **Tailwind CSS**: Utility-first CSS framework via CDN
- **Vanilla JavaScript**: No frameworks, pure JS implementation
- **Font Awesome**: Icon library
- **Google Fonts**: Inter font family

### APIs & Services
- **GitHub API**: Fetch repository data dynamically
- **EmailJS**: Contact form handling without backend

### Development Tools
- **Responsive Design**: Mobile-first approach
- **Performance**: Optimized animations and lazy loading
- **Accessibility**: Semantic HTML and keyboard navigation

## 🚀 Getting Started

### Prerequisites
- Modern web browser
- Text editor (for customization)
- GitHub account (for projects page)
- EmailJS account (for contact form)

### Installation
1. Clone or download the repository
2. Update configuration files:
   - Set your GitHub username in `js/github.js`
   - Configure EmailJS in `js/email.js`
   - Add your resume to `assets/resume.pdf`
3. Open `index.html` in your browser

### Configuration

#### GitHub API Setup
1. Update `GITHUB_USERNAME` in `js/github.js`
2. The projects page will automatically fetch your repositories
3. Projects are categorized based on languages and topics

#### EmailJS Setup
1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create an email service and template
3. Update the following in `js/email.js`:
   - `YOUR_PUBLIC_KEY`: Your EmailJS public key
   - `EMAILJS_SERVICE_ID`: Your service ID
   - `EMAILJS_TEMPLATE_ID`: Your template ID

#### Personalization
1. Update personal information in `index.html`
2. Replace social media links
3. Update project descriptions and links
4. Customize colors and fonts in the CSS

## 📱 Features Breakdown

### Hero Section
- Animated typing effect for skills
- Call-to-action buttons with hover effects
- Social media links with icons
- Gradient text effects

### About Section
- Professional summary
- Tech stack grid with icons
- Skill tags and badges

### Skills Section
- Categorized skills (Programming, Frontend, Backend, Tools)
- Interactive cards with hover effects
- Progress indicators

### Projects Page
- Dynamic GitHub repository fetching
- Filter by category (Frontend, Full Stack, Backend)
- Search functionality
- Language badges and statistics
- Responsive grid layout

### Contact Section
- Real-time form validation
- EmailJS integration
- Loading states and success messages
- Character counter for message field
- Auto-save form data

## 🎯 Performance Features

- **Optimized Animations**: CSS transforms for smooth 60fps animations
- **Lazy Loading**: Images and content load as needed
- **Debounced Events**: Optimized scroll and resize handlers
- **Intersection Observer**: Efficient scroll reveal animations
- **Minified Assets**: Optimized for production

## 🔧 Customization

### Adding New Projects
1. Projects are automatically fetched from GitHub
2. Manual projects can be added to the featured section
3. Update project categories and descriptions

### Modifying Colors
1. Update CSS custom properties in the `<style>` section
2. Modify gradient colors for different themes
3. Adjust hover states and transitions

### Adding New Sections
1. Follow the existing HTML structure
2. Use semantic tags (`<section>`, `<article>`, etc.)
3. Add reveal animations with the `.reveal` class

## 📊 Browser Support

- Chrome/Chromium 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile browsers (iOS Safari, Android Chrome)

## 🤝 Contributing

This is a personal portfolio project. For suggestions or improvements:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: your-email@example.com
- **GitHub**: https://github.com/your-username
- **LinkedIn**: https://linkedin.com/in/your-profile

---

Built with ❤️ using HTML5, Tailwind CSS, and Vanilla JavaScript
