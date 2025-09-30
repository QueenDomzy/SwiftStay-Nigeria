// src/pages/BookingPage.tsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function BookingPage() {
  const { id } = useParams(); // propertyId
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  // 🔹 Replace with actual fetched property later
  const property = {
    id,
    name: "Nike Lake Resort Hotel",
    price: 25000,
    location: "Enugu, Nigeria",
    image: "https://source.unsplash.com/600x400/?hotel,enugu"
  };

  const totalCost = guests * property.price;

  const handlePaystack = async () => {
    alert(`Paystack checkout for ₦${totalCost}. (Backend needed!)`);
    // TODO: call backend /payment/paystack/init
  };

  const handleFlutterwave = async () => {
    alert(`Flutterwave checkout for ₦${totalCost}. (Backend needed!)`);
    // TODO: call backend /payment/flutterwave/init
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Book {property.name}</h1>

      <img
        src={property.image}
        alt={property.name}
        className="w-full h-64 object-cover rounded-2xl shadow mb-6"
      />

      <div className="grid gap-4">
        <label className="flex flex-col">
          <span className="mb-1">Check-in Date</span>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="p-2 border rounded"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1">Check-out Date</span>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="p-2 border rounded"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1">Guests</span>
          <input
            type="number"
            value={guests}
            min="1"
            onChange={(e) => setGuests(Number(e.target.value))}
            className="p-2 border rounded"
          />
        </label>
      </div>

      {/* Booking Summary */}
      <div className="mt-6 p-4 bg-gray-100 rounded-xl shadow">
        <p className="font-medium">{property.name}</p>
        <p>{property.location}</p>
        <p className="mt-2">
          <strong>₦{property.price}</strong> per guest
        </p>
        <p>
          <strong>Total: ₦{totalCost}</strong>
        </p>
      </div>

      {/* Payment Buttons */}
      <div className="mt-6 flex gap-4">
        <Button className="bg-green-600 hover:bg-green-700" onClick={handlePaystack}>
          Pay with Paystack
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleFlutterwave}>
          Pay with Flutterwave
        </Button>
      </div>
    </div>
  );
}
