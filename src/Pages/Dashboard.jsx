import React from "react";
import { LogOut, ReceiptIndianRupeeIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardAction,
  CardFooter,
} from "@/components/ui/card";

import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const { session } = useSessionContext();
  const navigate = useNavigate();

  const user = session?.user;
  const userName = user?.user_metadata?.full_name || user?.email || "User";

  const receipts = [
    {
      id: 1,
      merchant_name: "Amazon",
      amount: 1499,
      date: "2025-06-17",
      image_url: "https://via.placeholder.com/400x250",
    },
    {
      id: 2,
      merchant_name: "Flipkart",
      amount: 899,
      date: "2025-06-15",
      image_url: "https://via.placeholder.com/400x250",
    },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-40 flex items-center justify-between border-b bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <ReceiptIndianRupeeIcon className="text-primary" />
            <span>ReceiptPro</span>
          </Link>
          <nav className="hidden md:flex gap-6 ml-8 text-sm font-medium">
            <Link to="/dashboard" className="hover:text-primary">
              Dashboard
            </Link>
          </nav>
        </div>

        {/* User avatar & dropdown */}
        <div className="relative group cursor-pointer select-none">
          <div className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${userName}`}
              alt="avatar"
              className="h-7 w-7 rounded-full"
            />
            <span className="hidden sm:block text-sm font-medium">
              {userName}
            </span>
          </div>

          <div className="absolute right-0 hidden min-w-[160px] rounded-md border bg-white p-2 text-sm shadow-md group-hover:block">
            <p className="px-3 py-2 text-muted-foreground">{user?.email}</p>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2"
            >
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-10">
        <div className="space-y-1 relative">
          <h1 className="text-2xl font-bold">
            Welcome back, <span className="text-primary">{userName}</span>!
          </h1>
          <p className="text-muted-foreground">
            Here's your receipt management overview for today
          </p>
          <div className="absolute right-0 top-0 flex flex-wrap gap-4 cursor-pointer">
            <Button
              className="cursor-pointer"
              onClick={() => navigate("/upload")}
            >
              Upload Receipt
            </Button>
            <Button
              className="cursor-pointer"
              variant="outline"
              onClick={() => navigate("/gallery")}
            >
              View Receipts
            </Button>
          </div>
        </div>

        <SectionCards />

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Recent Receipts</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {receipts.map((r) => (
              <li
                key={r.id}
                className="rounded-xl bg-white p-4 shadow transition hover:shadow-lg hover:scale-[1.01]"
              >
                <p className="font-medium">{r.merchant_name}</p>
                <p className="text-sm text-muted-foreground">₹{r.amount}</p>
                <p className="text-xs text-muted-foreground mb-2">{r.date}</p>
                <img
                  src={r.image_url}
                  alt="receipt"
                  className="h-36 w-full rounded object-cover"
                />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

function SectionCards() {
  return (
    <div className="grid gap-4 px-1 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card
          key={card.title}
          className="@container/card bg-gradient-to-t from-primary/5 to-card shadow-xs dark:bg-card"
        >
          <CardHeader>
            <CardDescription>{card.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {card.value}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">{card.delta}</Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="font-medium">{card.caption}</div>
            <div className="text-muted-foreground">{card.note}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

const cards = [
  {
    title: "Total Revenue",
    value: "$1,250.00",
    delta: "+12.5%",
    caption: "Trending up this month",
    note: "Visitors for the last 6 months",
  },
  {
    title: "New Customers",
    value: "1,234",
    delta: "-20%",
    caption: "Down 20% this period",
    note: "Acquisition needs attention",
  },
  {
    title: "Active Accounts",
    value: "45,678",
    delta: "+12.5%",
    caption: "Strong user retention",
    note: "Engagement exceeds targets",
  },
  {
    title: "Growth Rate",
    value: "4.5%",
    delta: "+4.5%",
    caption: "Steady performance increase",
    note: "Meets growth projections",
  },
];
