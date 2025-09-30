import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import { auth } from "./firebase";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";

// ------------------------- Sample data -------------------------
const properties = [
  {
    id: "enugu-royal-hotel",
    name: "Enugu Royal Hotel",
    location: "Enugu, Enugu State",
    pricePerNight: 15000,
    type: "Hotel",
    images: ["https://source.unsplash.com/800x600/?hotel,Enugu"],
    description:
      "Comfortable stay near the city center. Fast wifi, breakfast included, airport shuttle available.",
    ownerId: "owner-1",
  },
  {
    id: "awka-luxe-apartment",
    name: "Awka Luxe Apartment",
    location: "Awka, Anambra State",
    pricePerNight: 12000,
    type: "Apartment",
    images: ["https://source.unsplash.com/800x600/?apartment,nigeria"],
    description: "Modern 2-bedroom apartment in Awka, perfect for short stays.",
    ownerId: "owner-2",
  },
  {
    id: "calabar-coastal-inn",
    name: "Calabar Coastal Inn",
    location: "Calabar, Cross River",
    pricePerNight: 10000,
    type: "Guest House",
    images: ["https://source.unsplash.com/800x600/?guesthouse,nigeria"],
    description: "A relaxed guest house near coastal attractions.",
    ownerId: "owner-3",
  },
];

// ------------------------- Utilities -------------------------
function currency(n: number) {
  return `₦${n.toLocaleString()}`;
}

// ------------------------- SwiftBot -------------------------
function SwiftBot() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {open && (
        <div className="mb-3 w-80 rounded-lg bg-white p-3 shadow-lg">
          <div className="flex items-center justify-between">
            <strong>SwiftBot</strong>
            <button onClick={() => setOpen(false)} className="text-sm">
              ✕
            </button>
          </div>
          <div className="mt-2 text-sm">
            Hi — I can help with search, bookings & FAQs. (Prototype only)
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg text-white"
      >
        🤖
      </button>
    </div>
  );
}

// ------------------------- Auth Hook -------------------------
function useAuthListener() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);
  return user;
}

// ------------------------- Header -------------------------
function Header({ user }: { user: User | null }) {
  const navigate = useNavigate();
  function handleLogout() {
    signOut(auth);
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 p-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-600 font-bold text-white">
            SS
          </div>
          <div>
            <div className="font-bold">SwiftStay Nigeria</div>
            <div className="text-xs text-gray-500">
              Book safe stays across SE Nigeria
            </div>
          </div>
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/properties" className="text-sm hover:underline">
            Explore
          </Link>
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="rounded border px-3 py-1 text-sm hover:bg-gray-100"
              >
                Dashboard
              </Link>
              <Link
                to="/admin"
                className="rounded border px-3 py-1 text-sm hover:bg-gray-100"
              >
                Admin
              </Link>
              <button
                onClick={handleLogout}
                className="rounded bg-red-600 px-3 py-1 text-sm text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

// ------------------------- Login Page -------------------------
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch {
      alert("Login failed. Try signing up.");
    }
  }

  async function handleSignup() {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch {
      alert("Signup failed.");
    }
  }

  async function handleGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch {
      alert("Google sign-in failed.");
    }
  }

  return (
    <main className="mx-auto max-w-sm p-6">
      <h1 className="text-2xl font-bold mb-4">Login / Sign up</h1>
      <form onSubmit={handleEmailLogin} className="space-y-3">
        <input
          className="w-full rounded border p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full rounded border p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full rounded bg-blue-600 px-4 py-2 text-white">
          Login
        </button>
        <button
          type="button"
          onClick={handleSignup}
          className="w-full rounded border px-4 py-2"
        >
          Sign Up
        </button>
        <button
          type="button"
          onClick={handleGoogle}
          className="w-full rounded bg-red-500 px-4 py-2 text-white"
        >
          Continue with Google
        </button>
      </form>
    </main>
  );
}

// ------------------------- Protected Routes -------------------------
function PrivateRoute({ user, children }: { user: User | null; children: JSX.Element }) {
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
function AdminRoute({ user, children }: { user: User | null; children: JSX.Element }) {
  const ADMIN_EMAIL = "youremail@example.com"; // replace with real admin email
  if (!user) return <Navigate to="/login" replace />;
  if (user.email !== ADMIN_EMAIL) return <div className="p-6">🚫 Access Denied</div>;
  return children;
}

// ------------------------- Booking & Confirmation -------------------------
function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find((p) => p.id === id);
  if (!property) return <div className="p-6">Property not found</div>;
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">{property.name}</h1>
      <p>{property.description}</p>
      <div className="mt-2 font-semibold">{currency(property.pricePerNight)} / night</div>
      <button
        onClick={() => navigate(`/booking/${property.id}`)}
        className="mt-4 rounded bg-green-600 px-4 py-2 text-white"
      >
        Book Now
      </button>
    </main>
  );
}
function BookingPage() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);
  if (!property) return <div className="p-6">Booking not available</div>;
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Booking {property.name}</h1>
      <p className="mt-2">Prototype booking flow — payment integration coming soon 🚀</p>
    </div>
  );
}
function ConfirmationPage() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);
  if (!property) return <div className="p-6">Property not found</div>;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-600">Booking Confirmed 🎉</h1>
      <p>You booked {property.name}!</p>
    </div>
  );
}

// ------------------------- Pages -------------------------
function DashboardPage({ user }: { user: User }) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Welcome {user.email}</h1>
      <p className="mt-2 text-gray-600">This is your dashboard.</p>
    </div>
  );
}
function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="mt-2">Manage properties and users here.</p>
    </div>
  );
}

// ------------------------- Root App -------------------------
export default function App() {
  const user = useAuthListener();
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header user={user} />
        <Routes>
          <Route path="/" element={<div className="p-6">🏠 Home Page</div>} />
          <Route path="/properties" element={<div className="p-6">Properties List</div>} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected Routes */}
          <Route
            path="/booking/:id"
            element={
              <PrivateRoute user={user}>
                <BookingPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/confirmation/:id"
            element={
              <PrivateRoute user={user}>
                <ConfirmationPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute user={user}>
                <DashboardPage user={user as User} />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute user={user}>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
        <SwiftBot />
      </div>
    </BrowserRouter>
  );
}
