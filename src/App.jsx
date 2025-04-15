import { Route } from "react-router";
import { Routes } from "react-router";
import { Home } from "./pages/Home";
import { Articles } from "./pages/Articles";
import { Articel } from "./pages/Articel";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AuthContextProvider } from "./Context/AuthContext";
import { UnauthenticatedRoute } from "./components/UnAuthenticatedRoute";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { EditorPage } from "./pages/EditorPage";
import { Write } from "./pages/Write";
import { Profile } from "./pages/Profile";
import { ManageArticles } from "./pages/ManageArticles";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthContextProvider>
      <div>
        <Header />
        <main className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="articles" element={<Articles />} />
            <Route path="/article/:id" element={<Articel />} />

            {/* Unauthenticated Routes (redirect to home if logged in) */}

            <Route
              path="signIn"
              element={
                <UnauthenticatedRoute>
                  <SignIn />
                </UnauthenticatedRoute>
              }
            />
            <Route
              path="signUp"
              element={
                <UnauthenticatedRoute>
                  <SignUp />
                </UnauthenticatedRoute>
              }
            />

            {/* protected Route */}
            <Route
              path="/editor"
              element={
                <ProtectedRoutes>
                  <EditorPage />
                </ProtectedRoutes>
              }
            />

            <Route
              path="/editor/:id"
              element={
                <ProtectedRoutes>
                  <EditorPage />
                </ProtectedRoutes>
              }
            />

            <Route
              path="/write"
              element={
                <ProtectedRoutes>
                  <Write />
                </ProtectedRoutes>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoutes>
                  <Profile />
                </ProtectedRoutes>
              }
            />

            <Route
              path="/manage-articles"
              element={
                <ProtectedRoutes>
                  <ManageArticles />
                </ProtectedRoutes>
              }
            />
            
          </Routes>
        </main>
        <Footer />
      </div>
      
      <Toaster />
    </AuthContextProvider>
  );
}

export default App;
