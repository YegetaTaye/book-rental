"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Star, StarHalf, ChevronRight, Minus, Plus } from "lucide-react";

// Sample book data
const book = {
  id: 1,
  title: "So You Want To Talk About Race",
  author: "Ijeoma Oluo",
  authorImage: "/placeholder.svg?height=40&width=40",
  rating: 4.2,
  reviews: 127,
  price: 15.63,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  coverImage: "/placeholder.svg?height=600&width=400",
  previewImage: "/placeholder.svg?height=600&width=400",
  details: {
    "Book Title": "So You Want To Talk About Race",
    Author: "Ijeoma Oluo",
    ISBN: "1234156148 (ISBN13: 1234156148)",
    "Edition Language": "English",
    "Book Format": "Paperback, 450 Pages",
    "Date Published": "August 15th 2020",
    Publisher: "Wepress Inc",
  },
};

const relatedBooks = [
  {
    id: 1,
    title: "Such a Fun Age",
    author: "Someone",
    rating: 4.5,
    price: 12.99,
    year: 2009,
    image: "/placeholder.svg?height=200&width=130",
  },
  {
    id: 2,
    title: "Be your self",
    author: "Another One",
    rating: 4.8,
    price: 14.99,
    year: 2009,
    image: "/placeholder.svg?height=200&width=130",
  },
];

export default function BookDetailPage() {
  return (
    <div className="container min-h-screen bg-background md:p-24">
      {/* Breadcrumb */}
      {/* <div className="container mx-auto px-4 py-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <a href="/" className="hover:text-primary">
            Home
          </a>
          <ChevronRight className="h-4 w-4 mx-2" />
          <a href="/books" className="hover:text-primary">
            Books
          </a>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-foreground">{book.title}</span>
        </div> */}
      {/* </div> */}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Rating */}
            {/* <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(4)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </div>
              <span className="text-sm text-muted-foreground">
                {book.rating} ({book.reviews} Reviews)
              </span>
            </div> */}

            {/* Title and Author */}
            <div>
              <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
              <span className="font-medium">{book.author}</span>
              {/* <div className="flex items-center gap-3">
                <img
                  src={book.authorImage}
                  alt={book.author}
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-medium">{book.author}</span>
              </div> */}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {book.description}
            </p>

            {/* Price and Actions */}
            <div className="space-y-4">
              {/* <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-purple-600">
                  ${book.price}
                </span>
                <span className="text-sm text-muted-foreground">/copy</span>
              </div> */}

              <div className="flex items-center gap-4">
                {/* <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={decrementQuantity}
                    className="h-10 w-10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={incrementQuantity}
                    className="h-10 w-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div> */}
                <Button className="bg-purple-600 hover:bg-purple-700 px-8">
                  Add to Cart
                </Button>
                {/* <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button> */}
              </div>
            </div>
          </div>

          {/* Right Column - Book Images */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="aspect-[3/3] bg-black rounded-lg overflow-hidden">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[3/3] bg-black rounded-lg overflow-hidden">
              <img
                src={book.previewImage}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Details and Related Books */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {/* Details */}
          <div>
            <h2 className="text-xl font-bold mb-4">Details</h2>
            <div className="bg-muted rounded-lg">
              {Object.entries(book.details).map(([key, value], index) => (
                <div
                  key={key}
                  className={`flex py-3 px-4 ${
                    index !== Object.entries(book.details).length - 1
                      ? "border-b"
                      : ""
                  }`}
                >
                  <span className="w-1/3 font-medium">{key}</span>
                  <span className="w-2/3 text-muted-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Books */}
          <div>
            <h2 className="text-xl font-bold mb-4">Related books</h2>
            <div className="space-y-4">
              {relatedBooks.map((book) => (
                <Card key={book.id} className="flex p-4 items-center gap-4">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-20 h-28 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{book.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {book.author}
                    </p>
                    {/* <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(book.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-muted text-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {book.rating}
                      </span>
                    </div> */}
                    <div className="mt-2">
                      <span className="font-semibold text-purple-600">
                        {book.year}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}