'use client';

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";


function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => [
      "why they matter",
      "when to follow up",
      "what you talked about",
      "how you met",
      "who is in your circle"
    ],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-2 lg:py-12 items-center justify-center flex-col">
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-cyan-300 font-bold">Rookery reminds you</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
            Rookery helps you stay meaningfully connected. It keeps the people
              you have met — and the moments that matter — from fading into the
              past. Whether it`s recalling your last conversation or knowing
              when it is time to follow up, Rookery strengthens your network
              by helping you remember what makes each connection count.
            </p>
          </div>
          <div className="flex flex-row gap-2">
          <section className="mt-6 max-w-3xl grid md:grid-cols-3 gap-8 text-center">
        {[
          {
            title: "Recall Better",
            desc: "Never forget how you met or what mattered most."
          },
          {
            title: "Real Connections",
            desc: "Check your social connectivity and maintain relationships."
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
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
