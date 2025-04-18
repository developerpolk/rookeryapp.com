'use client';

import Image from "next/image";
import { useState } from "react";
import { Hero } from "@/components/ui/animated-hero";
import { ArrowRight } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";


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
          expo_opt_in: true,
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
      <Hero />
      <section className="mb-2">
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
              className="px-4 py-2 rounded-md text-white w-full sm:w-80 border border-solid border-cyan-300 bg-black placeholder:text-gray-400"

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
         {/* <div>
            <Button variant="secondary" size="sm" className="gap-4">
              Read our launch article <MoveRight className="w-4 h-4" />
            </Button>
          </div> */}
          </section>
          <section className="mt-12 max-w-2xl text-center px-4">
  <h2 className="text-2xl font-semibold mb-4 text-white">Why Join Early?</h2>
  <p className="text-gray-400 mb-6 text-sm sm:text-base">
    Be among the first to experience how Rookery makes remembering your network effortless.
    Early sign-ups unlock exclusive access to our private beta and future premium features.
  </p>

  <ul className="text-sm sm:text-base text-gray-300 space-y-3">
    <li className="flex items-center justify-center gap-2">
      ✅ <span>Private beta access before public launch</span>
    </li>
    <li className="flex items-center justify-center gap-2">
      🎁 <span>Free Pro features for the first 3 months</span>
    </li>
    <li className="flex items-center justify-center gap-2">
      📬 <span>Get product updates, sneak peeks & community invites</span>
    </li>
  </ul>
</section>

          <div className="flex flex-col overflow-hidden pb-[50px] pt-[2px]">
            
        
    <div className="flex flex-col items-center">
      <ContainerScroll
        titleComponent={
          <>
            {/* Add m-0 to reset default browser margins */}
            <h1 className="text-4xl font-semibold text-black dark:text-white m-0">
              Keep your contacts, <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Gain an Assistant
              </span>
            </h1>
          </>
        }
      >
        {/* This is the content scrolled over */}
        {/* mx-auto SHOULD center this block horizontally within ContainerScroll's content area */}
        {/* Check if ContainerScroll itself adds padding that shrinks the available width */}
        <div className="relative w-[300px] h-[60px] mx-auto">

          {/* Content inside the phone screen area */}
          {/*
            - Problems might arise if ContainerScroll applies transforms/positioning.
            - `inset-0` means it tries to fill the parent `relative` div.
            - `p-8` creates the internal padding from the edges.
            - `items-center` should horizontally center the content since it's `flex-col`.
            - `justify-center` should vertically center the content block.
            - Add `w-full` to ensure this takes up the padded width.
          */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8 w-full">

            {/* Icon Flow Section */}
            {/*
              - `w-full` ensures this section tries to take available width within the padded absolute container.
              - `justify-center` centers items along the main axis (horizontally for md:flex-row).
              - `items-center` centers items along the cross axis (vertically for md:flex-row).
              - Check the effective width/styles applied by ContainerScroll here.
            */}
            <section className="flex flex-col md:flex-row items-center justify-center pb-2">Get on the Waitlist!</section>
            <section className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 w-full">
              {/* Ensure these flex items don't push each other due to min-width or lack of shrinking */}
              <div className="flex flex-col items-center text-center flex-shrink-0"> {/* Added flex-shrink-0 */}
                <Image
                  src="/gnome-contacts.svg"
                  alt="Contacts App"
                  width={56}
                  height={56}
                  className="rounded-lg"
                />
                <p className="text-xs mt-1 text-muted-foreground">iOS Contacts</p>
              </div>

              <ArrowRight className="w-5 h-5 text-cyan-400 self-center flex-shrink-0" /> {/* Added flex-shrink-0 */}

              <div className="flex flex-col items-center text-center flex-shrink-0"> {/* Added flex-shrink-0 */}
                <Image
                  src="/Rookery_AppIcon.jpg"
                  alt="Rookery App Icon"
                  width={56}
                  height={56}
                  className="object-contain rounded-lg"
                />
                <p className="text-xs mt-1 text-muted-foreground">Rookery AI</p>
              </div>
            </section>

            {/* Privacy Text */}
            <p className="text-xs text-muted-foreground text-center max-w-[90%]">
              Your privacy is paramount. Rookery processes all data locally on your device using native Swift capabilities. Nothing leaves your phone.
            </p>
          </div>

          {/* iPhone Frame Overlay */}
          {/* This should overlay correctly due to `absolute`, `fill`, and `z-10` */}
       
        </div>
      </ContainerScroll>
    </div>
    </div>
      
     <section className="mt-20 max-w-5xl w-full flex flex-col md:flex-row justify-center items-center md:items-start gap-12">
      {/* App Icon Mock - Added text-center here */}
      <div className="flex flex-col items-center text-center">
        <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-white shadow-lg p-2 border border-gray-300">
          <Image
            src="/Swift_logo_color.svg"
            alt="Swift Icon"
            width={128}
            height={128}
            className="rounded-xl object-cover w-full h-full"
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Powered by Swift.
        </p>
      </div>
    </section>


      {/* Footer */}
      <footer className="mt-20 text-gray-500 text-sm text-center">
        <p>&copy; {new Date().getFullYear()} Rookery. All rights reserved.</p>
      </footer>
    </main>
  );
}
