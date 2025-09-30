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
const properties = [
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
          <Link to="/admin" className="text-sm hover:underline">
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

  const featured = properties.slice(0, 3);

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = encodeURIComponent(query);
    navigate(`/properties?q=${q}&maxPrice=${maxPrice}`);
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Hello SwiftStay Nigeria 🚀</h1>
      <p className="mb-4">
        Find trusted short-stays and hotels across Enugu and the Southeast.
      </p>
      <div className="flex gap-2 mb-6">
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
      <form onSubmit={onSearch} className="flex gap-2 mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Location (e.g. Enugu)"
          className="w-full rounded p-3 border"
        />
        <input
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))
          }
          placeholder="Max ₦"
          className="w-28 rounded p-3 border"
        />
        <button className="rounded bg-indigo-600 px-4 py-2 text-white">
          Search
        </button>
      </form>

      <section>
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

// ------------------------- Properties Page -------------------------
function PropertiesPage() {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get("q")?.toLowerCase() || "";
  const maxPrice = Number(searchParams.get("maxPrice")) || Infinity;

  const filtered = properties.filter((p) => {
    const matchesQuery =
      p.name.toLowerCase().includes(query) ||
      p.location.toLowerCase().includes(query);
    const matchesPrice = p.pricePerNight <= maxPrice;
    return matchesQuery && matchesPrice;
  });

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Available Properties</h1>
      {filtered.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article key={p.id} className="rounded border p-3">
              <h3 className="font-semibold text-lg">{p.name}</h3>
              <p className="text-gray-500">{p.location}</p>
              <div className="mt-2 font-bold">{currency(p.pricePerNight)}</div>
              <button
                onClick={() => navigate(`/property/${p.id}`)}
                className="mt-2 rounded bg-indigo-600 px-3 py-1 text-sm text-white"
              >
                View Details
              </button>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

// ------------------------- Property Details -------------------------
function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find((p) => p.id === id);

  if (!property) return <p className="p-6">Property not found</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">{property.name}</h1>
      <p className="text-gray-500">{property.location}</p>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {property.images.map((src, i) => (
          <img key={i} src={src} alt={property.name} className="rounded" />
        ))}
      </div>
      <p className="mt-4">{property.description}</p>
      <div className="mt-2 font-bold">{currency(property.pricePerNight)} / night</div>
      <button
        onClick={() => navigate(`/booking/${property.id}`)}
        className="mt-4 rounded bg-green-600 px-4 py-2 text-white"
      >
        Book Now
      </button>
    </main>
  );
}

// ------------------------- Booking Page -------------------------
function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find((p) => p.id === id);

  const [nights, setNights] = useState(1);

  if (!property) return <p className="p-6">Booking not available</p>;

  const total = nights * property.pricePerNight;

  function handleBooking(e: React.FormEvent) {
    e.preventDefault();
    navigate(`/confirmation/${property.id}?nights=${nights}`);
  }

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">Book {property.name}</h1>
      <form onSubmit={handleBooking} className="space-y-3 mt-4">
        <label className="block">
          Nights
          <input
            type="number"
            min="1"
            value={nights}
            onChange={(e) => setNights(Number(e.target.value))}
            className="w-full rounded border p-2"
          />
        </label>
        <div>Total: {currency(total)}</div>
        <button className="w-full rounded bg-green-600 px-4 py-2 text-white">
          Proceed to Payment
        </button>
      </form>
    </main>
  );
}

// ------------------------- Confirmation Page -------------------------
function ConfirmationPage() {
  const { id } = useParams();
  const query = new URLSearchParams(window.location.search);
  const nights = Number(query.get("nights") || "1");

  const property = properties.find((p) => p.id === id);

  if (!property) return <p className="p-6">Property not found</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold text-green-600">Booking Confirmed 🎉</h1>
      <p className="mt-2">
        You booked <strong>{property.name}</strong> in {property.location}.
      </p>
      <p className="mt-2">
        Nights: {nights} | Total:{" "}
        <strong>{currency(nights * property.pricePerNight)}</strong>
      </p>
      <p className="mt-4 text-gray-500">
        This is a prototype — payment integration coming soon.
      </p>
      <Link
        to="/properties"
        className="mt-4 inline-block rounded bg-indigo-600 px-4 py-2 text-white"
      >
        Back to Explore
      </Link>
    </main>
  );
}

// ------------------------- Placeholders -------------------------
function ComingSoon({ title }: { title: string }) {
  return (
    <main className="p-6 text-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-2">🚧 This feature is under development. Stay tuned!</p>
      <Link
        to="/"
        className="mt-4 inline-block rounded bg-indigo-600 px-4 py-2 text-white"
      >
        Back Home
      </Link>
    </main>
  );
}

function LoginPage() {
  return <ComingSoon title="Login / Sign Up" />;
}
function DashboardPage() {
  return <ComingSoon title="Dashboard" />;
}
function AdminDashboard() {
  return <ComingSoon title="Admin Dashboard" />;
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
          <Route path="/confirmation/:id" element={<ConfirmationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <SwiftBot />
      </div>
    </BrowserRouter>
  );
}
