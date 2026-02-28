# Profile App - Complete Lab Implementation Summary

## Project Overview
A multi-page React application for managing user profiles with features including filtering, search, dark/light mode toggle, edit mode with delete functionality, and dynamic profile routing. Fully optimized for performance with React best practices.

---

## Lab Summaries

### Lab 6: Mode State, Conditional Rendering, CSS Modules, Dynamic Styling
Implemented light/dark mode state management using `useState` and created conditional rendering based on mode selection throughout the application. Converted CSS to CSS Modules (App.module.css) and applied dynamic class names to components that change appearance based on the current mode. Added a mode toggle button in the Navbar that switches between light and dark themes, with all components reflecting the selected theme through conditional styling and dark mode classes.

### Lab 7: Form Validation and Success Messages
Created the AddProfilePage component with a controlled form that includes Name, Email, Title, Bio, and Image fields, all managed through local state. Implemented front-end validation using regex patterns and conditional checks that display clear error messages below each field when inputs are invalid. Added a success message that appears after successful form submission, then redirects the user back to the homepage after a brief delay to confirm the profile was added.

### Lab 8: React Router and Multi-Page Navigation
Refactored the application to use React Router v6 with `<BrowserRouter>`, `<Routes>`, and `<Route>` components to manage page navigation instead of manual state-based routing. Created dedicated page components for Home, About, Add Profile, Other Profiles, Profile Detail, and a catch-all 404 Not Found page with a warning triangle icon. Replaced all `<a>` tags with React Router's `<Link>` component in the Navbar and profile cards to enable client-side navigation without full page reloads.

### Lab 9: Dynamic Routes and Nested Layouts
Implemented dynamic profile detail routes with the pattern `/profile/:id` that read the profile ID from URL parameters using `useParams()`. Created a ProfileLayout component as a nested route wrapper that provides a shared "Go Back" button using `useNavigate(-1)` to return to the previous page. Added profile links in HomePage that navigate to `/profile/{id}` and refactored AddProfilePage to redirect users back to the homepage using `navigate("/", { replace: true })` after successful form submission.

### Lab 10: Not Found Page with Warning Indicator
Created a NotFoundPage component that displays a 404 message with a small orange warning triangle (⚠️) button fixed to the top-right corner. The warning button uses state to toggle visibility of the full 404 error details, allowing users to click the icon to see the error message and a link back to the homepage. The triangle contains a white exclamation mark and uses absolute positioning with inline styles to remain visible as a subtle indicator even when the main error message is hidden.

### Lab 11: Context API for Global State Management
Created ModeContext using `createContext()` to manage `mode` and `isEditMode` states globally, eliminating prop drilling through multiple component levels. Wrapped the application with a ModeProvider that exposes `mode`, `toggleMode`, `isEditMode`, `setIsEditMode`, and `toggleEditMode` through Context. Updated Navbar and other components to use `useContext(ModeContext)` instead of receiving mode and isEditMode as props, centralizing theme and edit mode logic in a single Context source.

### Lab 12: Scaling State Management with useReducer, useRef, and useLayoutEffect
Refactored HomePage to use `useReducer` for managing interconnected filter state (roleFilter, searchText, viewMode, cardWidth) with defined action types (SET_ROLE_FILTER, SET_SEARCH_TEXT, RESET_FILTERS, etc.) instead of multiple useState calls. Added `useRef` for cardContainerRef and cardRefs array to access DOM elements without triggering re-renders, enabling efficient measurement of card dimensions. Implemented `useLayoutEffect` to synchronously measure card widths before the browser paints, preventing layout shifts and storing measurements in the reducer state for responsive adjustments.

### Lab 14: Custom Hooks Implementation
Created two reusable custom hooks to encapsulate complex state and side-effect logic: `useProfileData` manages all profile API fetching, loading states, and profile CRUD operations (add, delete, reset), while `useFilterState` handles role filter and search text state with a convenient reset function. Integrated both hooks into the `AppContent` component, reducing boilerplate code by ~150 lines and improving separation of concerns by extracting data-fetching and filter logic into independent, testable utilities. Fixed a critical routing bug caused by nested `<Router>` components that was causing a white screen error, ensuring only one `HashRouter` exists at the application root in `main.jsx`. Added GitHub Pages deployment configuration with a GitHub Actions workflow that automatically builds and deploys the app on push to the `main` branch, and updated `vite.config.js` with the proper base path for subpath deployments on GitHub Pages.

---

## Key Features
- 🎨 Light/Dark mode theme switching (Context API)
- ✏️ Edit mode for profile management with deletion
- 🔍 Advanced filtering and search functionality
- 🎯 Dynamic profile routing with nested layouts
- 📱 Responsive grid layout (3 columns, 2 columns, 1 column)
- 🔗 React Router for multi-page navigation
- 📦 API integration with fallback local data
- ⚡ Performance optimized with React.memo, useCallback, useMemo, and React.lazy
- 🖼️ Image imports from assets folder for proper bundling

## Tech Stack
- React 18+ with Hooks (useReducer, useRef, useLayoutEffect, useContext, useCallback, useMemo)
- React Router v6
- Context API (ModeContext)
- CSS Modules
- Lazy loading with Suspense
- Performance optimization: React.memo, useCallback, useMemo

## File Structure

