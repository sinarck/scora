# Scora

Scora is a modern, beautiful app for students to check their grades, track academic progress, and gain insights into their educational journey. Built with React Native and Expo, Scora aims to provide an intuitive, visually appealing, and seamless experience for connecting with your school's grade portal.

---

## ✨ Features

- **Grade Tracking:** Connect to your school's portal and view your grades in real time.
- **District Search:** Easily find and select your school district from a comprehensive list.
- **Elegant Visualizations:** See your progress and achievements with beautiful charts and animations.
- **Modern UI:** Clean, responsive design with custom fonts and theming.
- **Cross-Platform:** Works on iOS, Android, and Web (via Expo).
- **Haptics & Animations:** Enjoy smooth feedback and delightful transitions.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (20+ recommended)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/scora.git
   cd scora
   ```
2. **Install dependencies:**
   ```sh
   yarn install
   # or
   npm install
   ```
3. **Start the development server:**
   ```sh
   yarn start
   # or
   npm run start
   ```
4. **Run on your device or simulator:**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Press `w` for web
   - Or scan the QR code with the Expo Go app

---

## 🛠️ Tech Stack

- **React Native** (0.76+)
- **Expo** (SDK 52+)
- **TypeScript**
- **Expo Router** (for navigation)
- **twrnc** (Tailwind CSS for React Native)
- **react-hook-form** (forms & validation)
- **zod** (schema validation)
- **@tanstack/react-query** (data fetching & caching)
- **@expo/vector-icons** (icons)
- **@legendapp/list** (virtualized lists)
- **Burnt** (toast notifications)
- **Custom fonts** (Satoshi)

---

## 📁 Folder Structure

```
scora/
  assets/           # Fonts and images
  src/
    app/            # App entry points and screens
    components/     # Reusable UI components
    config/         # App configuration and constants
    hooks/          # Custom React hooks
    lib/            # Utilities and libraries
    schema/         # Zod schemas and types
  app.config.ts     # Expo app configuration
  package.json      # Project dependencies and scripts
  tailwind.config.js# Tailwind CSS config for twrnc
  README.md         # This file
```

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit and push (`git commit -am 'Add new feature' && git push origin feature/your-feature`)
5. Open a Pull Request

Please follow the code style and conventions used in the project.

---

> Scora is a work in progress. Stay tuned for more features and improvements!
