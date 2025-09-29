import React from "react";

export default function Home() {
  return (
    <div>
      <section className="hero">
        <h1>💼 From busy cities to quiet towns, SwiftStay will connect Nigeria—one stay at a time.</h1>
        <button>Explore Prototype</button>
        <button>Book a Stay</button>
      </section>
      <section className="search">
        <input type="text" placeholder="Search by location or price..." />
        <button>Search</button>
      </section>
      <section className="featured">
        <h2>Featured Properties</h2>
        {/* TODO: map through property listings */}
      </section>
    </div>
  );
}
