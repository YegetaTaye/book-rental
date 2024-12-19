"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Star,
  ShoppingCart,
  User,
  Menu,
  Search,
  LayoutGrid,
  LayoutList,
} from "lucide-react";
import Book1 from "../assets/books/book1.jpg";
import Book2 from "../assets/books/book2.jpg";
import { Link } from "react-router-dom";

// Sample data
const categories = [
  { id: 1, name: "All Genres", count: 475 },
  { id: 2, name: "Arts & Photography", count: 45 },
  { id: 3, name: "Biographies & Memory", count: 98 },
  { id: 5, name: "Cookbook & Food", count: 43 },
  { id: 6, name: "History", count: 89 },
  { id: 7, name: "Literature & Fiction", count: 102 },
  { id: 8, name: "Romance", count: 67 },
  { id: 9, name: "SciFi & Fantasy", count: 56 },
];

const books = [
  {
    id: 1,
    title: "Be Your Self & Never Surrender",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, libero nec. lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, libero nec. lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, libero nec.",
    author: "Jess Steve",
    rating: 4.1,
    reviews: 165,
    price: 21.4,
    originalPrice: 29.0,
    image: Book1,
    tags: ["History", "Century ABC (2018)"],
    bestSeller: true,
  },
  {
    id: 2,
    title: "Emily and the Backbone",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscectetur adipiscing elit. Donec auctor, libero nec. lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, libero nec.",
    author: "Cloe Mamoria",
    rating: 4.1,
    reviews: 166,
    price: 17.8,
    originalPrice: 29.0,
    image: Book2,
    tags: ["Biography", "Garamedia (2020)"],
    bestSeller: false,
  },
  {
    id: 1,
    title: "Be Your Self & Never Surrender",
    author: "Jess Steve",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, libero nec. lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, libero nec. lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, libero nec.",
    rating: 4.1,
    reviews: 165,
    price: 21.4,
    originalPrice: 29.0,
    image: Book1,
    tags: ["History", "Century ABC (2018)"],
    bestSeller: true,
  },
  {
    id: 2,
    title: "Emily and the Backbone",
    author: "Cloe Mamoria",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, libero nec. lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, libero nec. lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, libero nec.",
    rating: 4.1,
    reviews: 166,
    price: 17.8,
    originalPrice: 29.0,
    image: Book2,
    tags: ["Biography", "Garamedia (2020)"],
    bestSeller: false,
  },
  {
    id: 1,
    title: "Be Your Self & Never Surrender",
    author: "Jess Steve",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, libero nec. lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, libero nec. lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, libero nec.",
    rating: 4.1,
    reviews: 165,
    price: 21.4,
    originalPrice: 29.0,
    image: Book1,
    tags: ["History", "Century ABC (2018)"],
    bestSeller: true,
  },
  {
    id: 2,
    title: "Emily and the Backbone",
    author: "Cloe Mamoria",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, libero nec. lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, libero nec. lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, libero nec.",
    rating: 4.1,
    reviews: 166,
    price: 17.8,
    originalPrice: 29.0,
    image: Book2,
    tags: ["Biography", "Garamedia (2020)"],
    bestSeller: false,
  },
];

const tagColors = {
  History: "bg-blue-100 text-blue-800",
  "Century ABC (2018)": "bg-green-100 text-green-800",
  Biography: "bg-purple-100 text-purple-800",
  "Garamedia (2020)": "bg-yellow-100 text-yellow-800",
};

export default function BooksList() {
  const [isGridView, setIsGridView] = useState(true);

  return (
    <div className="min-h-screen bg-background pb-14">
      {/* Main Content */}
      <main className="container mx-auto md:pl-16 md:pr-8 md:py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 hidden md:block border-r border-gray-300 pr-6">
            <h2 className="text-2xl font-bold mb-6">Filter</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-2 pl-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="category"
                        id={`cat-${category.id}`}
                      />
                      <label
                        htmlFor={`cat-${category.id}`}
                        className="flex-1 text-sm"
                      >
                        {category.name}
                      </label>
                      <span className="text-xs text-muted-foreground">
                        ({category.count})
                      </span>
                    </div>
                  ))}
                </div>
                <h3 className="font-semibold my-4">Years</h3>
              </div>
            </div>
          </div>

          {/* Books List */}
          <div className="flex-1 pl-4 md:pr-12 pr-4">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Books</h1>
              <div className="flex items-center gap-4">
                <div className="hidden lg:flex gap-2">
                  <Button
                    variant={isGridView ? "default" : "outline"}
                    size="icon"
                    onClick={() => setIsGridView(true)}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={!isGridView ? "default" : "outline"}
                    size="icon"
                    onClick={() => setIsGridView(false)}
                  >
                    <LayoutList className="h-4 w-4" />
                  </Button>
                </div>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Categories</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4 space-y-2">
                      {categories.map((category) => (
                        <div
                          key={category.id}
                          className="flex items-center gap-2"
                        >
                          <input
                            type="radio"
                            name="category"
                            id={`mobile-cat-${category.id}`}
                          />
                          <label
                            htmlFor={`mobile-cat-${category.id}`}
                            className="flex-1 text-sm"
                          >
                            {category.name}
                          </label>
                          <span className="text-xs text-muted-foreground">
                            ({category.count})
                          </span>
                        </div>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            <div
              className={`${
                isGridView ? "grid lg:grid-cols-3 gap-16" : "space-y-6"
              }`}
            >
              {books.map((book) => (
                <Link to={`/books/${book.id}`}>
                  <Card
                    key={book.id}
                    className={`relative ${isGridView ? "" : "flex"}`}
                  >
                    <div
                      className={`${
                        isGridView
                          ? "aspect-[4/4]"
                          : "w-[200px] h-[250px] object-cover pr-8"
                      } relative overflow-hidden rounded-t-lg`}
                    >
                      <img
                        src={book.image}
                        alt={book.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardContent
                      className={`relative  p-4 ${
                        isGridView
                          ? "min-h-[180px]"
                          : "flex-1 min-h-[250px] pr-24"
                      }`}
                    >
                      <div className="flex gap-2 mb-2 flex-wrap">
                        {book.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            className={`${
                              tagColors[tag] || "bg-gray-100 text-gray-800"
                            } pointer-events-none`}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="font-semibold mb-1">
                        {" "}
                        {book.title.length > 45
                          ? `${book.title.slice(0, 42)}...`
                          : book.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {book.author}
                      </p>
                      {!isGridView && (
                        <p className="text-muted-foreground">
                          {book.description.length > 250
                            ? `${book.description.slice(0, 250)}...`
                            : book.description}
                        </p>
                      )}
                      <Button className="bg-purple-600 hover:bg-purple-700 absolute bottom-4 left-4">
                        ORDER
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
