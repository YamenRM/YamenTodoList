# YamenTodoList

A cross-platform (Android/iOS) Todo List application built with **React Native** and **TypeScript**, using **Supabase** for authentication. This document is a technical report covering the architecture, stack, and implementation decisions behind the app.

---

## 1. Overview

YamenTodoList lets a user sign up, log in, and manage a personal task list — creating, editing, and deleting todo items, each with a name, description, and optional image. The app uses a three-layer navigation system (Stack → Drawer → Bottom Tabs) and a custom-fonted, card-based UI.

| | |
|---|---|
| **Platform** | Android & iOS (React Native) |
| **Language** | TypeScript |
| **Backend** | Supabase (Auth REST API) |
| **Navigation** | React Navigation v7 (Native Stack + Drawer + Bottom Tabs) |

---

## 2. Tech Stack

### Core
- **React Native `0.86.0`**
- **React `19.2.3`**
- **TypeScript `5.8`** 
- **Node.js `>= 22.11.0`**

### Navigation — [React Navigation v7](https://reactnavigation.org/)
- `@react-navigation/native` — core navigation container
- `@react-navigation/native-stack` — auth flow + root stack (native, hardware-accelerated transitions)
- `@react-navigation/drawer` — side drawer (Dashboard / About Us)
- `@react-navigation/bottom-tabs` — main app tabs (Home / Profile / Settings)
- `react-native-screens`, `react-native-safe-area-context`, `react-native-gesture-handler` — native navigation performance & gesture primitives required by React Navigation
- `react-native-reanimated` + `react-native-worklets` — animation driver used by the drawer/stack transitions

### Backend / Auth — [Supabase](https://supabase.com/)
- Authentication is handled by calling the **Supabase Auth REST API directly via `fetch`**, against two endpoints:
  - `POST /auth/v1/token?grant_type=password` — login
  - `POST /auth/v1/signup` — registration (with `username` passed as user metadata)
- Config lives in `src/config/supabase.ts`, exposing the project URL, anon key, and a `getHeaders()` helper that sets `Content-Type` and `apikey`.

### Tooling
- **Metro** — JS bundler (`metro.config.js`)
- **Babel** — `@react-native/babel-preset`
- **ESLint** + **Prettier** — linting/formatting (`@react-native/eslint-config`)
- **Jest** + **react-test-renderer** — unit testing setup
- **CocoaPods** (`ios/Podfile`, `Gemfile`) — iOS native dependency management
- **Gradle** (`android/build.gradle`) — Android native build

### Fonts
- Custom font **"Yuyu"** (`src/assets/fonts/Yuyu-Regular.ttf`) applied consistently across all screens for headings and body text.

---

## 3. Architecture

### 3.1 Navigation Tree

The app nests three navigator types to separate concerns cleanly:

```
Stack.Navigator (root, initialRoute: Login)
├── Login
├── SignUp
├── DrawerRoot
│   └── Drawer.Navigator
│       ├── MainTabs
│       │   └── Tab.Navigator
│       │       ├── Home
│       │       ├── Profile
│       │       └── Settings
│       └── AboutUs
└── TaskDetailes (params: name, description, imageUrl)
```

- **Stack** handles the unauthenticated → authenticated transition (`Login`/`SignUp` → `DrawerRoot`) and the modal-like `TaskDetailes` screen, which sits outside the tab/drawer flow so it can receive route params (task name, description, image).
- **Drawer** wraps the main tabs and adds a secondary destination (`AboutUs`) that doesn't belong in the bottom tab bar.
- **Tabs** hold the three core, always-accessible sections: Home, Profile, Settings.

Screen prop types are composed with `CompositeScreenProps` (e.g. in `Home.tsx` and `Settings.tsx`) to type-check navigation calls that need to reach **both** the tab navigator and the root stack (e.g. a tab screen navigating to `TaskDetailes`, which lives on the stack, not the tabs).

Logout is implemented via `navigation.dispatch(CommonActions.reset(...))` rather than a simple `navigate`, so the auth stack is reset and the user can't "back" into the app after logging out.

### 3.2 Authentication Flow

1. `Login.tsx` / `SignUp.tsx` collect credentials and POST directly to Supabase's Auth REST endpoints using `fetch` + the shared `getHeaders()`.
2. On success, the app navigates to `DrawerRoot`.
3. On failure, Supabase's `error_description`/`message` is surfaced inline as form validation text.

### 3.3 Todo Data Model

Todos are managed entirely in local component state inside `Home.tsx`:

```ts
interface TodoItem {
  id: string;         
  name: string;
  description: string;
  imageUrl: string;   
}
```

Create/Update/Delete all operate on this in-memory array via `setTodos`. Tapping a card navigates to `TaskDetailes` with the item's data passed as route params.

### 3.4 Component Structure

```
src/
├── assets/fonts/        
├── components/
│   └── CustomButton.tsx  
├── config/
│   └── supabase.ts       
└── screens/
    ├── Login.tsx
    ├── SignUp.tsx
    ├── Home.tsx          
    ├── Task-Detailes.tsx 
    ├── profile.tsx
    ├── Settings.tsx      
    └── AboutUs.tsx
```

`CustomButton` is the single shared UI primitive — every screen composes it with different `backgroundColor`/`textColor` props rather than duplicating button styling.

---

## 4. Getting Started

### Prerequisites
Complete the React Native [environment setup guide](https://reactnative.dev/docs/set-up-your-environment) for your OS/target platform (Android Studio + SDKs, or Xcode + CocoaPods).

### Install dependencies
```bash
npm install
```

### iOS only — install native pods
```bash
bundle install
bundle exec pod install
```

### Run
```bash
# Start Metro
npm start

# Android
npm run android

# iOS
npm run ios
```

### Lint & test
```bash
npm run lint
npm test
```

---

## 5. Author

**YamenRM** — AI Engineering Student
