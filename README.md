<<<<<<< HEAD
# Code Explainer AI

A modern, futuristic web application for AI-powered code analysis featuring glassmorphism effects, 3D animations, and real-time code intelligence.

![Futuristic Code Explainer AI](https://img.shields.io/badge/Status-Live-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

Check it out:https://code-explainer-five.vercel.app/
## ✨ Features

### 🎨 **Futuristic Design**
- **Dark Theme** with striking aqua blue (#00ffff) highlights
- **Glassmorphism Effects** with backdrop blur on all components
- **3D Transformations** with depth and perspective on hover
- **Animated Particle System** with floating elements and lines
- **Matrix-Style Text** with animated gradient effects
- **Smooth Animations** and micro-interactions throughout

### 🤖 **AI-Powered Analysis**
- **Real AI Analysis** using OpenRouter API with GPT-4
- **Multi-Language Support** (Python, JavaScript, Java, C++, C#, Go, Rust)
- **Intelligent Code Explanation** with detailed breakdowns
- **Bug Detection** and issue identification
- **Optimization Suggestions** for better performance
- **Fallback Mode** with demo analysis if no API key

### 🎮 **Interactive Experience**
- **Theme Toggle** between dark and light modes
- **Keyboard Shortcuts** for power users
- **Responsive Design** that works on all devices
- **Real-time Counters** for lines and characters
- **Code Formatting** and clearing tools

## 🚀 Quick Start

### **Option 1: Direct File Opening**
1. Download the project files
2. Open `index.html` in your web browser
3. Start analyzing code immediately!

### **Option 2: Local Server (Recommended)**
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server -p 8000

# Using VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

Then visit: `http://localhost:8000`



## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Variables, Flexbox, Grid
- **Animations**: CSS3 Transforms, Keyframes, Transitions
- **API**: OpenRouter API with GPT-4
- **Storage**: LocalStorage for settings and API keys
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Orbitron (futuristic), Inter (modern)



### **API Models**
You can modify the AI model in `script.js` by changing the `model` parameter in the API call:
```javascript
model: 'openai/gpt-4'  // Change to your preferred model
```

### **Styling**
All visual effects can be customized by modifying CSS variables in the `:root` selector.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.








