import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

// ------------------------- Sample data -------------------------
const sampleProperties = [
  {
    id: "enugu-royal-hotel",
    name: "Enugu Royal Hotel",
    location: "Enugu, Enugu State",
    pricePerNight: 15000,
    type: "Hotel",
    images: [
      "https://source.unsplash.com/800x600/?hotel,Enugu",
      "https://source.unsplash.com/800x600/?hotel,interior",
    ],
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
            Hi — I can help with search, bookings & FAQs. (Placeholder)
          </div>
          <div className="mt-3 flex gap-2">
            <input
              className="flex-1 rounded border p-2 text-sm"
              placeholder="Ask SwiftBot..."
            />
            <button className="rounded bg-blue-600 px-3 py-2 text-sm text-white">
              Send
            </button>
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

// ------------------------- Components & Pages -------------------------
function Header() {
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
          <Link
            to="/admin"
            className="rounded border px-3 py-1 text-sm hover:bg-gray-100"
          >
            Admin
          </Link>
          <Link
            to="/login"
            className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}

// ------------------------- Home Page -------------------------
function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const featured = sampleProperties.slice(0, 3);

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = encodeURIComponent(query);
    navigate(`/properties?q=${q}&maxPrice=${maxPrice}`);
  }

  return (
    <main className="mx-auto max-w-6xl p-6">
      <section className="rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 p-10 text-white">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Hello SwiftStay Nigeria 🚀</h1>
            <p className="mt-2 max-w-xl">
              Find trusted short-stays and hotels across Enugu and the Southeast.
            </p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => navigate("/properties")}
                className="rounded bg-white/90 px-4 py-2 font-semibold text-indigo-700"
              >
                Explore Prototype
              </button>
              <button
                onClick={() => navigate("/properties")}
                className="rounded border px-4 py-2"
              >
                Book a Stay
              </button>
            </div>
          </div>
          <form
            onSubmit={onSearch}
            className="mt-4 w-full lg:mt-0 lg:max-w-md"
          >
            <div className="flex gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Location (e.g. Enugu)"
                className="w-full rounded p-3"
              />
              <input
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))
                }
                placeholder="Max ₦"
                className="w-28 rounded p-3"
              />
              <button
                type="submit"
                className="rounded bg-indigo-700 px-4 py-2 text-white"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Featured Properties</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <article key={p.id} className="rounded border p-3">
              <img
                src={p.images[0]}
                alt={p.name}
                className="h-40 w-full rounded object-cover"
              />
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{p.name}</h3>
                  <div className="text-sm text-gray-500">{p.location}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{currency(p.pricePerNight)}</div>
                  <button
                    onClick={() => navigate(`/property/${p.id}`)}
                    className="mt-2 rounded bg-indigo-600 px-3 py-1 text-sm text-white"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

// ------------------------- Properties Listing Page -------------------------
function PropertiesPage() {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get("q")?.toLowerCase() || "";
  const maxPrice = Number(searchParams.get("maxPrice")) || Infinity;

  const filtered = sampleProperties.filter((p) => {
    const matchesQuery =
      p.name.toLowerCase().includes(query) ||
      p.location.toLowerCase().includes(query);
    const matchesPrice = p.pricePerNight <= maxPrice;
    return matchesQuery && matchesPrice;
  });

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="text-2xl font-bold">Available Properties</h1>
      {filtered.length === 0 ? (
        <p className="mt-4 text-gray-600">No properties found.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article key={p.id} className="rounded border p-3">
              <img
                src={p.images[0]}
                alt={p.name}
                className="h-40 w-full rounded object-cover"
              />
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{p.name}</h3>
                  <div className="text-sm text-gray-500">{p.location}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{currency(p.pricePerNight)}</div>
                  <button
                    onClick={() => navigate(`/property/${p.id}`)}
                    className="mt-2 rounded bg-indigo-600 px-3 py-1 text-sm text-white"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

// ------------------------- Booking Page -------------------------
function BookingPage() {
  const { id } = useParams();
  const property = sampleProperties.find((p) => p.id === id);

  if (!property) return <div className="p-6">Booking not available</div>;

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-xl font-bold">Book {property.name}</h1>
      <form className="mt-4 space-y-4">
        <div>
          <label className="block text-sm">Check-in</label>
          <input type="date" className="w-full rounded border p-2" />
        </div>
        <div>
          <label className="block text-sm">Check-out</label>
          <input type="date" className="w-full rounded border p-2" />
        </div>
        <div>
          <label className="block text-sm">Guests</label>
          <input type="number" className="w-full rounded border p-2" min="1" />
        </div>
        <div className="font-semibold">
          Price per night: {currency(property.pricePerNight)}
        </div>
        <button
          type="submit"
          className="rounded bg-green-600 px-4 py-2 text-white"
        >
          Confirm Booking
        </button>
      </form>
    </main>
  );
}

// ------------------------- Placeholders for other pages -------------------------
function PropertiesPage() {
  return <div className="p-6">Properties Listing (coming soon)</div>;
}
function LoginPage() {
  return <div className="p-6">Login Page (coming soon)</div>;
}
function DashboardPage() {
  return <div className="p-6">User Dashboard (coming soon)</div>;
}
function AdminDashboard() {
  return <div className="p-6">Admin Dashboard (coming soon)</div>;
}

// ------------------------- Root App -------------------------
export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <SwiftBot />
      </div>
    </BrowserRouter>
  );
    }
