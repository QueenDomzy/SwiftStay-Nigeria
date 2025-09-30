import React, { useState, useEffect } from "react"; import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";

// Single-file scaffold for SwiftStay Nigeria // Drop this into src/App.tsx (or replace your existing App) in a Vite + React + TypeScript project. // Requires: react-router-dom, qrcode.react, axios (optional)

// Install: npm i react-router-dom qrcode.react axios // Tailwind: ensure tailwind is configured in your project

// ------------------------- Sample data ------------------------- const sampleProperties = [ { id: "enugu-royal-hotel", name: "Enugu Royal Hotel", location: "Enugu, Enugu State", pricePerNight: 15000, type: "Hotel", images: [ "https://source.unsplash.com/800x600/?hotel,Enugu", "https://source.unsplash.com/800x600/?hotel,interior", ], description: "Comfortable stay near the city center. Fast wifi, breakfast included, airport shuttle available.", ownerId: "owner-1", }, { id: "awka-luxe-apartment", name: "Awka Luxe Apartment", location: "Awka, Anambra State", pricePerNight: 12000, type: "Apartment", images: ["https://source.unsplash.com/800x600/?apartment,nigeria"], description: "Modern 2-bedroom apartment in Awka, perfect for short stays.", ownerId: "owner-2", }, { id: "calabar-coastal-inn", name: "Calabar Coastal Inn", location: "Calabar, Cross River", pricePerNight: 10000, type: "Guest House", images: ["https://source.unsplash.com/800x600/?guesthouse,nigeria"], description: "A relaxed guest house near coastal attractions.", ownerId: "owner-3", }, ];

// ------------------------- Utilities ------------------------- function currency(n: number) { return ₦${n.toLocaleString()}; }

// ------------------------- SwiftBot (floating AI) ------------------------- function SwiftBot() { const [open, setOpen] = useState(false); return ( <> <div className="fixed bottom-6 right-6 z-50" style={{ fontFamily: "Inter, system-ui" }} > {open && ( <div className="mb-3 w-80 rounded-lg bg-white p-3 shadow-lg"> <div className="flex items-center justify-between"> <strong>SwiftBot</strong> <button onClick={() => setOpen(false)} className="text-sm">✕</button> </div> <div className="mt-2 text-sm">Hi — I can help with search, bookings & FAQs. (Placeholder)</div> <div className="mt-3 flex gap-2"> <input className="flex-1 rounded border p-2 text-sm" placeholder="Ask SwiftBot..." /> <button className="rounded bg-blue-600 px-3 py-2 text-sm text-white">Send</button> </div> </div> )} <button onClick={() => setOpen((s) => !s)} className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg text-white" aria-label="Open SwiftBot" > 🤖 </button> </div> </> ); }

// ------------------------- Components & Pages ------------------------- function Header() { return ( <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md"> <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 p-4"> <Link to="/" className="flex items-center gap-3"> <div className="h-10 w-10 rounded bg-blue-600 text-white flex items-center justify-center font-bold">SS</div> <div> <div className="font-bold">SwiftStay Nigeria</div> <div className="text-xs text-gray-500">Book safe stays across SE Nigeria</div> </div> </Link> <nav className="flex items-center gap-4"> <Link to="/properties" className="text-sm hover:underline">Explore</Link> <Link to="/admin" className="rounded border px-3 py-1 text-sm">Admin</Link> <Link to="/login" className="rounded bg-blue-600 px-3 py-1 text-sm text-white">Login</Link> </nav> </div> </header> ); }

function Home() { const navigate = useNavigate(); const [query, setQuery] = useState(""); const [maxPrice, setMaxPrice] = useState<number | "">("");

const featured = sampleProperties.slice(0, 3);

function onSearch(e: React.FormEvent) { e.preventDefault(); const q = encodeURIComponent(query); navigate(/properties?q=${q}&maxPrice=${maxPrice}); }

return ( <main className="mx-auto max-w-6xl p-6"> <section className="rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 p-10 text-white"> <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"> <div> <h1 className="text-4xl font-bold">Hello SwiftStay Nigeria 🚀</h1> <p className="mt-2 max-w-xl">Find trusted short-stays and hotels across Enugu and the Southeast.</p> <div className="mt-4 flex gap-3"> <button onClick={() => navigate('/properties')} className="rounded bg-white/90 px-4 py-2 font-semibold text-indigo-700">Explore Prototype</button> <button className="rounded border px-4 py-2">Book a Stay</button> </div> </div> <form onSubmit={onSearch} className="mt-4 w-full lg:mt-0 lg:max-w-md"> <div className="flex gap-2"> <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Location (e.g. Enugu)" className="w-full rounded p-3" /> <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))} placeholder="Max ₦" className="w-28 rounded p-3" /> <button type="submit" className="rounded bg-indigo-700 px-4 py-2 text-white">Search</button> </div> </form> </div> </section>

<section className="mt-8">
    <h2 className="text-xl font-semibold">Featured Properties</h2>
    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {featured.map((p) => (
        <article key={p.id} className="rounded border p-3">
          <img src={p.images[0]} alt={p.name} className="h-40 w-full rounded object-cover" />
          <div className="mt-2 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{p.name}</h3>
              <div className="text-sm text-gray-500">{p.location}</div>
            </div>
            <div className="text-right">
              <div className="font-bold">{currency(p.pricePerNight)}</div>
              <button onClick={() => window.location.assign(`/property/${p.id}`)} className="mt-2 rounded bg-indigo-600 px-3 py-1 text-sm text-white">View Details</button>
            </div>
          </div>
        </article>
      ))}
    </div>
  </section>
</main>

); }

function PropertiesPage() { const [propsList, setPropsList] = useState(sampleProperties);

// Basic query parsing useEffect(() => { // Could parse search params to filter }, []);

return ( <main className="mx-auto max-w-6xl p-6"> <h2 className="text-2xl font-semibold">Properties</h2> <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"> {propsList.map((p) => ( <article key={p.id} className="rounded border p-3"> <img src={p.images[0]} alt={p.name} className="h-40 w-full rounded object-cover" /> <h3 className="mt-2 font-semibold">{p.name}</h3> <div className="text-sm text-gray-500">{p.location}</div> <div className="mt-2 flex items-center justify-between"> <div className="font-bold">{currency(p.pricePerNight)}</div> <Link to={/property/${p.id}} className="rounded bg-indigo-600 px-3 py-1 text-sm text-white">View Details</Link> </div> </article> ))} </div> </main> ); }

function PropertyDetails() { const { id } = useParams(); const property = sampleProperties.find((p) => p.id === id); const navigate = useNavigate();

if (!property) return <div className="p-6">Property not found</div>;

return ( <main className="mx-auto max-w-4xl p-6"> <div className="grid gap-4 lg:grid-cols-2"> <div> <img src={property.images[0]} alt={property.name} className="rounded object-cover" /> </div> <div> <h1 className="text-2xl font-bold">{property.name}</h1> <div className="text-gray-500">{property.location}</div> <p className="mt-4">{property.description}</p> <div className="mt-4 flex items-center gap-4"> <div className="text-2xl font-bold">{currency(property.pricePerNight)}</div> <button onClick={() => navigate(/booking/${property.id})} className="rounded bg-blue-600 px-4 py-2 text-white">Book Now</button> </div> </div> </div> </main> ); }

function BookingPage() { const { id } = useParams(); const property = sampleProperties.find((p) => p.id === id); const [checkIn, setCheckIn] = useState(""); const [checkOut, setCheckOut] = useState(""); const [guests, setGuests] = useState(1); const [status, setStatus] = useState("");

if (!property) return <div className="p-6">Property not found</div>;

const nights = checkIn && checkOut ? Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))) : 0; const total = nights * property.pricePerNight;

function onPay() { // Placeholder payment flow: integrate Paystack / Flutterwave here setStatus("processing"); setTimeout(() => { setStatus("paid"); // In real app: create booking, call backend, send email, redirect to dashboard alert("Payment simulated: booking confirmed (placeholder)"); }, 1200); }

return ( <main className="mx-auto max-w-4xl p-6"> <h2 className="text-xl font-semibold">Booking — {property.name}</h2> <div className="mt-4 grid gap-6 lg:grid-cols-2"> <form onSubmit={(e) => { e.preventDefault(); onPay(); }} className="rounded border p-4"> <label className="block text-sm">Check-in</label> <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="mt-1 w-full rounded border p-2" />

<label className="mt-3 block text-sm">Check-out</label>
      <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="mt-1 w-full rounded border p-2" />

      <label className="mt-3 block text-sm">Guests</label>
      <input type="number" min={1} value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="mt-1 w-full rounded border p-2" />

      <div className="mt-4 flex items-center justify-between">
        <div className="font-bold">Total: {currency(total)}</div>
        <button type="submit" className="rounded bg-green-600 px-4 py-2 text-white">Pay (placeholder)</button>
      </div>
      <div className="mt-2 text-sm text-gray-500">Status: {status || 'idle'}</div>
    </form>

    <aside className="rounded border p-4">
      <h3 className="font-semibold">Summary</h3>
      <div className="mt-2">Nights: {nights}</div>
      <div>Guests: {guests}</div>
      <div className="mt-2 font-bold">{currency(total)}</div>
    </aside>
  </div>
</main>

); }

function LoginPage() { const navigate = useNavigate(); const [email, setEmail] = useState(""); const [password, setPassword] = useState("");

function onLogin(e: React.FormEvent) { e.preventDefault(); // Placeholder auth: replace with real auth call localStorage.setItem("ss_user", JSON.stringify({ email, role: "guest" })); navigate("/dashboard"); }

return ( <main className="mx-auto max-w-md p-6"> <h2 className="text-xl font-semibold">Login</h2> <form onSubmit={onLogin} className="mt-4 flex flex-col gap-3"> <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded border p-2" /> <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="rounded border p-2" /> <button className="rounded bg-blue-600 px-4 py-2 text-white">Login</button> </form> </main> ); }

function Dashboard() { const [user] = useState(() => JSON.parse(localStorage.getItem("ss_user") || "null"));

if (!user) return <div className="p-6">Please login</div>;

// Placeholder bookings const bookings = [ { id: "b1", propertyName: "Enugu Royal Hotel", checkIn: "2025-10-01", checkOut: "2025-10-04", status: "upcoming" }, ];

return ( <main className="mx-auto max-w-4xl p-6"> <h2 className="text-xl font-semibold">Dashboard</h2> <div className="mt-4"> <h3 className="font-semibold">Upcoming Bookings</h3> {bookings.map((b) => ( <div key={b.id} className="mt-2 rounded border p-3"> <div className="flex items-center justify-between"> <div> <div className="font-semibold">{b.propertyName}</div> <div className="text-sm text-gray-500">{b.checkIn} → {b.checkOut}</div> </div> <div className="text-sm">{b.status}</div> </div> </div> ))} </div> </main> ); }

function AdminDashboard() { const [list, setList] = useState(sampleProperties); const [editing, setEditing] = useState(null as any);

function onAdd() { const id = p-${Date.now()}; const newProp = { id, name: "New Property", location: "Enugu", pricePerNight: 5000, images: ["https://source.unsplash.com/800x600/?hotel"], description: "", type: "Hotel", ownerId: "owner-x" }; setList((s) => [newProp, ...s]); }

function onDelete(id: string) { setList((s) => s.filter((p) => p.id !== id)); }

return ( <main className="mx-auto max-w-6xl p-6"> <div className="flex items-center justify-between"> <h2 className="text-xl font-semibold">Admin Dashboard</h2> <div> <button onClick={onAdd} className="rounded bg-green-600 px-3 py-1 text-white">Add Property</button> </div> </div>

<div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
    {list.map((p: any) => (
      <div key={p.id} className="rounded border p-3">
        <img src={p.images[0]} alt={p.name} className="h-40 w-full rounded object-cover" />
        <div className="mt-2 flex items-center justify-between">
          <div>
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm text-gray-500">{p.location}</div>
          </div>
          <div className="flex flex-col gap-2">
            <button onClick={() => setEditing(p)} className="rounded border px-2 py-1 text-sm">Edit</button>
            <button onClick={() => onDelete(p.id)} className="rounded bg-red-600 px-2 py-1 text-sm text-white">Delete</button>
          </div>
        </div>
      </div>
    ))}
  </div>

  {editing && (
    <div className="mt-6 rounded border p-4">
      <h3 className="font-semibold">Edit {editing.name}</h3>
      {/* Add form fields for editing. In real app, this posts to backend */}
      <div className="mt-2 text-sm text-gray-500">This is a local edit placeholder.</div>
      <div className="mt-3 flex gap-2">
        <button onClick={() => setEditing(null)} className="rounded bg-gray-200 px-3 py-1">Close</button>
      </div>
    </div>
  )}
</main>

); }

// ------------------------- Root App ------------------------- export default function App() { return ( <BrowserRouter> <div className="min-h-screen bg-gray-50"> <Header /> <Routes> <Route path="/" element={<Home />} /> <Route path="/properties" element={<PropertiesPage />} /> <Route path="/property/:id" element={<PropertyDetails />} /> <Route path="/booking/:id" element={<BookingPage />} /> <Route path="/login" element={<LoginPage />} /> <Route path="/dashboard" element={<Dashboard />} /> <Route path="/admin" element={<AdminDashboard />} /> <Route path="*" element={<div className="p-6">Not found</div>} /> </Routes> <SwiftBot /> </div> </BrowserRouter> ); }

