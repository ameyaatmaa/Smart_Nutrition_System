# Smart Nutrition - AI-Powered Nutrition Suggestion System

A modern, responsive web application that provides personalized nutrition recommendations using AI technology. Built with React.js, Tailwind CSS, and Framer Motion for stunning animations.

## ✨ Features

- **🎨 Modern Dark Theme UI** - Beautiful glassmorphism design with smooth animations
- **🤖 AI-Powered Recommendations** - Personalized nutrition suggestions based on user data
- **📊 Comprehensive Analytics** - BMI, BMR, TDEE calculations with macronutrient breakdown
- **👤 User Authentication** - Secure login/signup with profile management
- **📱 Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices
- **🎭 Smooth Animations** - Powered by Framer Motion for engaging user experience
- **🌙 Dark/Light Mode** - Toggle between themes with persistent preferences
- **🔔 Toast Notifications** - Real-time feedback for user actions
- **⚡ Performance Optimized** - Fast loading with modern React patterns

## 🚀 Tech Stack

- **Frontend**: React.js 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Particles**: react-tsparticles
- **Build Tool**: Create React App

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-nutrition-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.js       # Custom button component
│   ├── Card.js         # Glassmorphism card component
│   ├── InputField.js   # Form input with floating labels
│   ├── Navbar.js       # Navigation bar
│   ├── ProtectedRoute.js # Route protection
│   └── Toast.js        # Notification component
├── contexts/           # React Context providers
│   ├── AuthContext.js  # Authentication state
│   └── ThemeContext.js # Theme management
├── pages/              # Page components
│   ├── Home.js         # Landing page with hero section
│   ├── About.js        # About page
│   ├── Features.js     # Features showcase
│   ├── Login.js        # Authentication page
│   ├── Signup.js       # Registration page
│   └── Dashboard.js    # User dashboard
├── utils/              # Utility functions
│   └── nutritionCalculations.js # Nutrition formulas
├── App.js              # Main application component
├── index.js            # Application entry point
└── index.css           # Global styles
```

## 🎯 Key Features Explained

### 1. **Nutrition Calculations**
- **BMI (Body Mass Index)**: Calculates and categorizes body mass index
- **BMR (Basal Metabolic Rate)**: Determines daily calorie needs at rest
- **TDEE (Total Daily Energy Expenditure)**: Calculates total daily calorie requirements
- **Macronutrients**: Provides protein, carbs, and fat recommendations

### 2. **User Experience**
- **Glassmorphism Design**: Modern glass-like UI elements
- **Smooth Animations**: Page transitions and hover effects
- **Responsive Design**: Optimized for all screen sizes
- **Dark Theme**: Eye-friendly dark mode with accent colors

### 3. **Authentication System**
- **User Registration**: Complete signup with health data
- **Login System**: Secure authentication
- **Profile Management**: Edit personal information
- **Protected Routes**: Secure dashboard access

## 🎨 Design System

### Color Palette
- **Primary**: Purple gradient (`#a855f7` to `#ec4899`)
- **Background**: Dark theme (`#020617` to `#0f172a`)
- **Accent Colors**: Purple, Pink, Cyan, Emerald
- **Text**: White with opacity variations

### Typography
- **Headings**: Bold, large fonts with gradient text effects
- **Body**: Clean, readable text with proper contrast
- **Interactive**: Hover effects and smooth transitions

## 🔧 Customization

### Adding New Features
1. Create new components in `src/components/`
2. Add routes in `src/App.js`
3. Update navigation in `src/components/Navbar.js`

### Styling Changes
1. Modify `src/index.css` for global styles
2. Update `tailwind.config.js` for theme customization
3. Use Tailwind classes for component-specific styling

### Nutrition Calculations
1. Add new formulas in `src/utils/nutritionCalculations.js`
2. Import and use in dashboard or other components
3. Update UI to display new metrics

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Framer Motion** for smooth animations
- **Tailwind CSS** for utility-first styling
- **React Icons** for beautiful icons
- **React Router** for navigation
- **TSParticles** for interactive backgrounds

## 📞 Support

For support, email support@smartnutrition.com or create an issue in the repository.

---
