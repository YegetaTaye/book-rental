// import React from "react";
// import Slider from "react-slick";

// const testimonialData = [
//   {
//     id: 1,
//     name: "Victor",
//     text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
//     img: "https://picsum.photos/101/101",
//   },
//   {
//     id: 1,
//     name: "Satya Narayan",
//     text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
//     img: "https://picsum.photos/102/102",
//   },
//   {
//     id: 1,
//     name: "Sachin Tendulkar",
//     text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
//     img: "https://picsum.photos/103/103",
//   },
// ];

// const Testimonial = () => {
//   var settings = {
//     dots: true,
//     arrows: false,
//     infinite: true,
//     speed: 1000,
//     // slidesToShow: 2,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     cssEase: "linear",
//     pauseOnHover: true,
//     pauseOnFocus: true,
//     responsive: [
//       {
//         breakpoint: 10000,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           infinite: true,
//         },
//       },
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           initialSlide: 2,
//         },
//       },
//       {
//         breakpoint: 640,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };
//   return (
//     <>
//       <div data-aos="fade-up" data-aos-duration="300" className="py-20 bg-white dark:bg-gray-900 dark:text-white duration-200">
//         <div className="w-full">
//           <div className="text-center mb-20 max-w-[600px] mx-auto">
//             <h1 className="text-3xl font-bold">Testimonial</h1>
//             <p className="text text-gray-400 text-center">
//               Lorem ipsum dolor, sit amet consectetur adipisicing elit.
//               Perspiciatis delectus architecto error nesciunt,
//             </p>
//           </div>
//           <div
//             data-aos="zoom-in"
//             data-aos-duration="300"
//             className="grid grid-cols-1  mx-12 gap-2"
//           >
//             <Slider {...settings}>
//               {testimonialData.map((data) => {
//                 return (
//                   <div className="my-6">
//                     <div
//                       key={data.id}
//                       className=" flex flex-col gap-2 shadow-lg py-8 px-8 mx-20 rounded-xl dark:bg-gray-800 bg-primary/10 relative"
//                     >
//                       <div>
//                         <img
//                           className="rounded-full w-20 h-20"
//                           src={data.img}
//                           alt=""
//                         />
//                       </div>
//                       <div className="flex items-center gap-4">
//                         <div>
//                           <p className="text-gray-500 text-sm">{data.text}</p>
//                           <h1 className="text-xl font-bold text-black/80 dark:text-light">
//                             {data.name}
//                           </h1>
//                         </div>
//                       </div>

//                       <p className="text-black/20 text-7xl font-serif absolute top-0 right-0 pr-4">
//                         ,,
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </Slider>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Testimonial;

// "use client"

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
