import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Chat } from "./pages/Chat";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F8FAFC" }}>
      <div className="text-center">
        <h1 style={{ color: "#023E62", fontSize: "4rem", fontWeight: 800 }}>404</h1>
        <p style={{ color: "#6B7280" }}>Page not found</p>
        <a
          href="/"
          className="mt-4 inline-block px-6 py-3 rounded-xl text-white"
          style={{ backgroundColor: "#023E62", fontWeight: 600 }}
        >
          Go Home
        </a>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/chat",
    Component: Chat,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
