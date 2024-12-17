import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    author: "Alex Johnson",
    role: "CEO, TechCorp",
    content:
      "This product has revolutionized our workflow. Highly recommended!",
  },
  {
    id: 2,
    author: "Sam Lee",
    role: "Designer, CreativeCo",
    content:
      "The user interface is intuitive and the features are exactly what we needed.",
  },
  {
    id: 3,
    author: "Jamie Smith",
    role: "Marketing Manager, GrowthInc",
    content:
      "Our team's productivity has increased tenfold since we started using this.",
  },
  {
    id: 4,
    author: "Taylor Wong",
    role: "CTO, InnovateTech",
    content:
      "The scalability and performance of this solution are unmatched. It's been a game-changer for our operations.",
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const goToNextTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    let intervalId;

    if (isAutoPlay) {
      intervalId = setInterval(goToNextTestimonial, 5000); // Change testimonial every 5 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAutoPlay, goToNextTestimonial]);

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-900 to-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
        What Our Clients Say
      </h1>
      <div
        className="w-full max-w-3xl mx-auto px-4 py-8"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        <Card className="bg-gradient-to-br from-gray-900 to-gray-700 shadow-lg overflow-hidden border-1 border-cyan-400">
          <CardContent className="p-6">
            <div className="relative h-[200px] overflow-hidden">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out ${
                    index === currentIndex
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-full"
                  }`}
                >
                  <div className="flex flex-col items-center text-center h-full justify-center text-white">
                    <p className="text-lg mb-4 italic">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-cyan-300">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-6 gap-2">
          {testimonials.map((_, index) => (
            <Button
              key={index}
              variant={index === currentIndex ? "default" : "outline"}
              size="sm"
              className={`w-10 h-10 rounded-full ${
                index === currentIndex
                  ? "bg-gradient-to-br from-gray-700 to-gray-900 text-cyan-400 border-2 border-cyan-400"
                  : "border-gray-400 bg-gray-400"
              }`}
              onClick={() => goToTestimonial(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            >
              {index + 1}
            </Button>
          ))}
        </div>

        <p className="text-center mt-4 text-sm text-muted-foreground">
          Hover over the testimonial to pause
        </p>
      </div>
    </main>
  );
}
