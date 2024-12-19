import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Book1 from "../assets/books/book1.jpg";

// Sample order data
const orders = [
  {
    id: 1,
    isbn: "51251123151",
    title: "Emily and the Backbone",
    author: "Cloe Mamora",
    price: 21.4,
    status: "PENDING",
    image: Book1,
  },
  {
    id: 2,
    isbn: "2412412125",
    title: "So You Want To Talk About Race",
    author: "Ijeoma Oluo",
    price: 15.63,
    status: "ACCEPTED",
    image: Book1,
  },
];

const statusStyles = {
  PENDING: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80",
  ACCEPTED: "bg-green-100 text-green-800 hover:bg-green-100/80",
  CANCELLED: "bg-red-100 text-red-800 hover:bg-red-100/80",
};

export default function OrderPage() {
  return (
    <div className="container w-full min-h-screen py-8 md:py-16 md:px-40">
      {/* Desktop view */}
      <table className="w-full border-collapse hidden sm:table">
        <thead>
          <tr className="bg-purple-700 text-white">
            <th className="p-4 text-left">Item</th>
            <th className="p-4 text-center">Price</th>
            <th className="p-4 text-center">Status</th>
            <th className="p-4 w-16"></th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {orders.map((order) => (
            <tr key={order.id} className="bg-white">
              <td className="p-4">
                <div className="flex gap-4 items-center">
                  <img
                    src={order.image}
                    alt={order.title}
                    className="w-20 h-24 object-cover rounded"
                  />
                  <div>
                    <div className="text-sm text-muted-foreground">
                      ISBN {order.isbn}
                    </div>
                    <div className="font-medium">{order.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {order.author}
                    </div>
                  </div>
                </div>
              </td>
              <td className="p-4 text-center">${order.price}</td>
              <td className="p-4 text-center">
                <Badge className={statusStyles[order.status]}>
                  {order.status}
                </Badge>
              </td>
              <td className="p-4 text-center">
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile view */}
      <div className="sm:hidden space-y-4">
        <div className="bg-purple-700 text-white p-4">My Orders</div>
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex gap-4 items-start mb-4">
              <img
                src={order.image}
                alt={order.title}
                className="w-20 h-24 object-cover rounded"
              />
              <div>
                <div className="text-sm text-muted-foreground">
                  ISBN {order.isbn}
                </div>
                <div className="font-medium">{order.title}</div>
                <div className="text-sm text-muted-foreground">
                  {order.author}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Price:</span>
                <span>${order.price}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Status:</span>
                <Badge className={statusStyles[order.status]}>
                  {order.status}
                </Badge>
              </div>
              <div className="flex justify-end">
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
