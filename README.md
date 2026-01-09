# 📊 Consistency Tracker

A beautiful, modern habit tracking application to help you monitor daily goals, visualize progress with interactive charts, and boost your consistency with actionable insights.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.5-646CFF?style=flat&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## ✨ Features

### 🎯 Core Functionality
- **Interactive Calendar** - Track your daily habits with an intuitive monthly calendar view
- **Multiple Goals** - Add and manage multiple fitness/habit goals simultaneously
- **Visual Tracking** - Check off completed days with a simple click
- **Day Indicators** - Easily identify weekends, current day, and day names (Mon, Tue, etc.)

### 📈 Analytics Dashboard
- **Performance Overview** - View your overall consistency score and statistics
- **Multiple Views** - Switch between Daily, Weekly, and Monthly analytics
- **Beautiful Charts** - Visualize your progress with Line, Bar, and Pie charts powered by Recharts
- **Goal-by-Goal Analysis** - Individual performance metrics for each habit
- **Streak Tracking** - Monitor current and longest streaks for each goal

### 💡 Smart Insights
- **Key Focus Areas** - Get quick highlights on your performance
- **Improvement Suggestions** - Receive personalized, actionable tips for goals with low consistency
- **Pattern Detection** - Identify weak days (e.g., Sunday slumps) and broken streaks
- **Categorized Feedback** - Critical, warning, and moderate alerts with specific recommendations

### 🎨 User Experience
- **Light & Dark Theme** - Toggle between themes with a beautiful animated switch
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Professional UI** - Modern gradient-based design with smooth animations
- **Achievement Badges** - Earn rewards based on your consistency level

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/davekahan/consistency-tracker.git
cd consistency-tracker
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

## 🛠️ Tech Stack

- **Framework**: React 19.2.0
- **Build Tool**: Vite (Rolldown) 7.2.5
- **Routing**: React Router DOM 7.12.0
- **Charts**: Recharts 3.6.0
- **Styling**: CSS3 with CSS Variables
- **State Management**: React Hooks (useState, useEffect)
- **Storage**: LocalStorage for theme persistence

## 📖 Usage

### Adding Goals
1. Enter your fitness/habit goal in the input field
2. Click "Add Goal" or press Enter
3. Your goal appears in the tracking table

### Tracking Progress
1. Click on any day's checkbox to mark it complete
2. The consistency percentage updates automatically
3. View your progress in the calendar

### Analyzing Performance
1. Click "View Analysis" button
2. Explore different views: Daily, Weekly, Monthly
3. Review your Key Focus Areas
4. Read improvement suggestions for underperforming goals
5. Check individual goal statistics and streaks

### Theme Toggle
- Click the sun/moon toggle button in the top-right corner
- Your preference is saved automatically

## 📂 Project Structure

```
consistency-tracker/
├── src/
│   ├── components/
│   │   ├── Home.jsx          # Main tracker page
│   │   └── Analysis.jsx      # Analytics dashboard
│   ├── App.jsx               # Root component with routing
│   ├── App.css               # All styles
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── public/
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Features in Detail

### Improvement Suggestions
The app analyzes your consistency and provides grouped suggestions:
- **🔴 Critical** - Goals below 30% with foundational tips
- **🟡 Warning** - Goals below 50% with habit-building strategies
- **🟠 Moderate** - Goals 50-69% with optimization tips
- **📊 Pattern Analysis** - Identifies weak days of the week
- **🔗 Streak Analysis** - Highlights broken streaks with recovery tips
- **📉 Overall Guidance** - General consistency improvement advice

### Analytics Views
- **Daily View**: Line chart showing day-by-day completion percentage
- **Weekly View**: Bar chart breaking down performance by week
- **Monthly View**: Goal comparison with projected month-end statistics

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Dave Kahan**
- GitHub: [@davekahan](https://github.com/davekahan)
- Repository: [consistency-tracker](https://github.com/davekahan/consistency-tracker)

## 🙏 Acknowledgments

- Built with React and Vite
- Charts powered by Recharts
- Icons and design inspired by modern UI/UX principles

---

⭐ Star this repo if you find it helpful!
