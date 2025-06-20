import { useEffect, useState } from "react";
import {
  LogOut,
  ReceiptIndianRupeeIcon,
  TrendingUp,
  Activity,
  ShoppingCart,
  BarChart2,
} from "lucide-react";
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

  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    fetchReceipts();
  }, []);

  const fetchReceipts = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return navigate("/login");

    const { data, error } = await supabase
      .from("receipts")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false });

    if (error) {
      console.error("Error fetching receipts:", error);
    } else {
      setReceipts(data);
    }
    setLoading(false);
  };

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
            <Link to="/upload" className="hover:text-primary">
              Upload
            </Link>
            <Link to="/gallery" className="hover:text-primary">
              Gallery
            </Link>
          </nav>
        </div>

        <div className="relative group cursor-pointer select-none">
          <div
            onClick={() => setShowUserMenu((prev) => !prev)}
            className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full"
          >
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${userName}`}
              alt="avatar"
              className="h-7 w-7 rounded-full"
            />
            <span className="hidden sm:block text-sm font-medium">
              {userName}
            </span>
          </div>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 min-w-[160px] rounded-md border bg-white p-2 text-sm shadow-md z-50">
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
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-10">
        <div className="space-y-1 relative">
          <h1 className="text-2xl font-bold">
            Welcome back, <span className="text-primary">{userName}</span>!
          </h1>
          <p className="text-muted-foreground">
            Here's your receipt management overview for today
          </p>
          <div className="absolute right-0 top-0 flex flex-wrap gap-4 cursor-pointer">
            <Button onClick={() => navigate("/upload")}>Upload Receipt</Button>
            <Button variant="outline" onClick={() => navigate("/gallery")}>
              View Receipts
            </Button>
          </div>
        </div>

        <SectionCards receipts={receipts} loading={loading} />

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Recent Receipts</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {receipts.slice(0, 5).map((r) => (
              <li
                key={r.id}
                className="rounded-xl bg-white p-4 shadow transition hover:shadow-lg hover:scale-[1.01]"
              >
                <p className="font-medium">{r.merchant_name}</p>
                <p className="text-sm text-muted-foreground">₹{r.amount}</p>
                <p className="text-xs text-muted-foreground mb-2">{r.date}</p>
                <img
                  src={r.file_url}
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

function SectionCards({ receipts, loading }) {
  if (loading) return <p>Loading summary...</p>;

  const totalSpend = receipts.reduce((acc, r) => acc + Number(r.amount), 0);
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const thisMonthReceipts = receipts.filter((r) => {
    const d = new Date(r.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const topCategory =
    Object.entries(
      receipts.reduce((acc, r) => {
        if (!r.category) return acc;
        acc[r.category] = (acc[r.category] || 0) + 1;
        return acc;
      }, {})
    ).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  const avgValue = receipts.length
    ? (totalSpend / receipts.length).toFixed(2)
    : "0.00";

  const cards = [
    {
      title: "Total Spend",
      value: `₹${totalSpend.toFixed(2)}`,
      icon: <TrendingUp className="w-4 h-4" />,
      delta: `+${thisMonthReceipts.length}`,
      caption: "Across all receipts",
      note: "Up to date",
    },
    {
      title: "Receipts This Month",
      value: thisMonthReceipts.length,
      icon: <ShoppingCart className="w-4 h-4" />,
      delta: "+0",
      caption: "Added in current month",
      note: "Latest receipt activity",
    },
    {
      title: "Top Category",
      value: topCategory,
      icon: <BarChart2 className="w-4 h-4" />,
      delta: "",
      caption: "Most frequent category",
      note: "By receipt count",
    },
    {
      title: "Avg Receipt Value",
      value: `₹${avgValue}`,
      icon: <Activity className="w-4 h-4" />,
      delta: "",
      caption: "Average spend",
      note: "Based on total receipts",
    },
  ];

  return (
    <div className="grid gap-4 px-1 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card
          key={card.title}
          className="@container/card bg-gradient-to-t from-primary/5 to-card shadow-xs dark:bg-card"
        >
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              {card.icon}
              {card.title}
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {card.value}
            </CardTitle>
            {card.delta && (
              <CardAction>
                <Badge variant="outline">{card.delta}</Badge>
              </CardAction>
            )}
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
