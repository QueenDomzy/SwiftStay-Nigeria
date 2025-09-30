import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import { properties, Property } from "./data/properties";

// ------------------------- Utilities -------------------------
function currency(n: number) {
  return `₦${n.toLocaleString()}`;
}

// ------------------------- Header -------------------------
function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white shadow">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded bg-blue-600 flex items-center justify-center text-white font-bold">
            SS
          </div>
          <span className="font-bold">SwiftStay Nigeria</span>
        </Link>
        <nav className="flex gap-4 text-sm">
          <Link to="/properties" className="hover:underline">
            Explore
          </Link>
          <Link to="/login" className="rounded bg-blue-600 px-3 py-1 text-white">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}

// ------------------------- Home -------------------------
function Home() {
  const navigate = useNavigate();
  const featured = properties.slice(0, 2);

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="text-3xl font-bold">Welcome to SwiftStay 🚀</h1>
      <p className="mt-2 text-gray-600">
        Find trusted hotels and apartments across Enugu & Southeast Nigeria.
      </p>
      <div className="mt-4 flex gap-3">
        <button
          onClick={() => navigate("/properties")}
          className="rounded bg-indigo-600 px-4 py-2 text-white"
        >
          Explore Stays
        </button>
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Featured</h2>
        <div className="grid gap-4 sm:grid-cols-2 mt-4">
          {featured.map((p) => (
            <div key={p.id} className="rounded border p-3">
              <img
                src={p.images[0]}
                alt={p.name}
                className="h-40 w-full rounded object-cover"
              />
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-sm text-gray-500">{p.location}</p>
                </div>
                <button
                  onClick={() => navigate(`/property/${p.id}`)}
                  className="rounded bg-indigo-600 px-3 py-1 text-white text-sm"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

// ------------------------- Properties Page -------------------------
function PropertiesPage() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="text-2xl font-bold">Available Properties</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        {properties.map((p) => (
          <div key={p.id} className="rounded border p-3">
            <img
              src={p.images[0]}
              alt={p.name}
              className="h-40 w-full rounded object-cover"
            />
            <div className="mt-2">
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-sm text-gray-500">{p.location}</p>
              <p className="font-bold">{currency(p.pricePerNight)}</p>
              <Link
                to={`/property/${p.id}`}
                className="mt-2 inline-block rounded bg-indigo-600 px-3 py-1 text-white text-sm"
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

// ------------------------- Property Details -------------------------
function PropertyDetails() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);

  if (!property) return <p className="p-6">Property not found</p>;

  return (
    <main className="mx-auto max-w-4xl p-6">
      <img
        src={property.images[0]}
        alt={property.name}
        className="h-64 w-full rounded object-cover"
      />
      <h1 className="text-2xl font-bold mt-4">{property.name}</h1>
      <p className="text-gray-600">{property.location}</p>
      <p className="mt-2">{property.description}</p>
      <p className="mt-2 font-bold">{currency(property.pricePerNight)} / night</p>
      <Link
        to={`/booking/${property.id}`}
        className="mt-4 inline-block rounded bg-green-600 px-4 py-2 text-white"
      >
        Book Now
      </Link>
    </main>
  );
}

// ------------------------- Booking Page -------------------------
function BookingPage() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);

  const [nights, setNights] = useState(1);

  if (!property) return <p className="p-6">Property not found</p>;

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-bold">Booking: {property.name}</h1>
      <p className="mt-2">Price: {currency(property.pricePerNight)} / night</p>

      <div className="mt-4 flex items-center gap-2">
        <label>Nights:</label>
        <input
          type="number"
          min={1}
          value={nights}
          onChange={(e) => setNights(Number(e.target.value))}
          className="border rounded p-1 w-20"
        />
      </div>

      <p className="mt-2 font-bold">
        Total: {currency(nights * property.pricePerNight)}
      </p>

      <button className="mt-4 rounded bg-blue-600 px-4 py-2 text-white">
        Proceed to Payment
      </button>
    </main>
  );
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}
