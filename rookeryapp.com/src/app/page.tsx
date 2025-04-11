"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const params = new URLSearchParams(window.location.search);
      const utmSource = params.get("utm_source");
  
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          utm_source: utmSource,
          expo_opt_in: true, // Optional — could be tied to a checkbox
        }),
      });
  
      if (res.ok) {
        setSubmitted(true);
        setEmail("");
      } else {
        const data = await res.json();
        console.error("Submission failed:", data.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-12">
      {/* Hero Section */}
      <section className="max-w-2xl w-full text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Rookery
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          A smarter way to remember who matters.
        </p>
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 justify-center mt-6"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md text-white w-full sm:w-80"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition"
            >
              Join Waitlist
            </button>
          </form>
        ) : (
          <p className="text-green-400">Thanks! You’re on the list.</p>
        )}
      </section>

      {/* Preview Section */}
      <section className="mt-20 max-w-4xl text-center">
        <h2 className="text-2xl font-semibold mb-4">See it in Action</h2>
        <div className="flex justify-center">
          <Image
            src="/APPLE_Pre_order_Label.svg"// Replace with your preview screenshot
            alt="Rookery app preview"
            width={300}
            height={600}
            className="rounded-lg"
          />
        </div>
      </section>

      {/* Value Props */}
      <section className="mt-24 max-w-3xl grid md:grid-cols-3 gap-8 text-center">
        {[
          {
            title: "Recall Better",
            desc: "Never forget how you met or what mattered most."
          },
          {
            title: "Real Connections",
            desc: "Revisit moments and deepen your network."
          },
          {
            title: "Smarter Memory",
            desc: "AI-powered summaries to jog your memory."
          }
        ].map((item) => (
          <div key={item.title} className="space-y-2">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-400">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Final CTA */}
      <section className="mt-24 text-center">
        <h2 className="text-2xl font-semibold">Don’t miss the drop</h2>
        <p className="text-gray-300 mt-2">Be one of the first to experience Rookery.</p>
        {!submitted && (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 justify-center mt-6"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md text-white w-full sm:w-80"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition"
            >
              Join Waitlist
            </button>
          </form>
        )}
      </section>

      {/* Footer */}
      <footer className="mt-20 text-gray-500 text-sm text-center">
        <p>&copy; {new Date().getFullYear()} Rookery. All rights reserved.</p>
      </footer>
    </main>
  );
}
