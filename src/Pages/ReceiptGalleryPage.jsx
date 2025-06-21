import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Menu, X, Search, ReceiptIndianRupeeIcon } from "lucide-react";
import { parseISO, isAfter, isBefore } from "date-fns";

function safeParseTags(tags) {
  if (!tags) return [];
  try {
    const parsed = JSON.parse(tags);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function ReceiptGalleryPage() {
  const [userEmail, setUserEmail] = useState("Loading...");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    minAmount: "",
    maxAmount: "",
    sortBy: "date_desc",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
    fetchReceipts();
  }, []);

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) navigate("/login");
    setUserEmail(user.email);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const fetchReceipts = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) navigate("/login");
    const { data, error } = await supabase
      .from("receipts")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching receipts:", error);
      setReceipts([]);
    } else {
      setReceipts(data.map((r) => ({ ...r, tags: safeParseTags(r.tags) })));
    }
    setLoading(false);
  };

  const handleSave = async () => {
    const receipt = selectedReceipt;
    const { error } = await supabase
      .from("receipts")
      .update({
        merchant_name: receipt.merchant_name,
        category: receipt.category,
        notes: receipt.notes,
        amount: parseFloat(receipt.amount),
        tags: JSON.stringify(receipt.tags),
        date: receipt.date,
      })
      .eq("id", receipt.id);

    if (error) alert("Failed to update receipt");
    else {
      alert("Receipt updated");
      setShowModal(false);
      fetchReceipts();
    }
  };

  const handleDelete = async (id, fileUrl) => {
    if (!confirm("Are you sure you want to delete this receipt?")) return;
    const path = fileUrl.split("/storage/v1/object/public/receipts/")[1];
    await supabase.storage.from("receipts").remove([path]);
    await supabase.from("receipts").delete().eq("id", id);
    setShowModal(false);
    fetchReceipts();
  };

  const filteredReceipts = receipts
    .filter((r) => {
      const query = searchQuery.toLowerCase();
      const matchSearch =
        r.merchant_name?.toLowerCase().includes(query) ||
        r.notes?.toLowerCase().includes(query) ||
        r.category?.toLowerCase().includes(query) ||
        r.tags?.some((t) => t.toLowerCase().includes(query)) ||
        String(r.amount).includes(query);

      const date = parseISO(r.date);
      const matchDate =
        (!filters.startDate || isAfter(date, parseISO(filters.startDate))) &&
        (!filters.endDate || isBefore(date, parseISO(filters.endDate)));

      const matchAmount =
        (!filters.minAmount || r.amount >= parseFloat(filters.minAmount)) &&
        (!filters.maxAmount || r.amount <= parseFloat(filters.maxAmount));

      return matchSearch && matchDate && matchAmount;
    })
    .sort((a, b) => {
      if (filters.sortBy === "date_asc") {
        return new Date(a.date) - new Date(b.date);
      } else if (filters.sortBy === "date_desc") {
        return new Date(b.date) - new Date(a.date);
      } else if (filters.sortBy === "amount_asc") {
        return a.amount - b.amount;
      } else if (filters.sortBy === "amount_desc") {
        return b.amount - a.amount;
      } else return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-white shadow-sm px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <ReceiptIndianRupeeIcon className="text-primary" />
            <span>ReceiptPro</span>
          </Link>
          <button
            className="md:hidden cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link to="/dashboard" className="hover:text-primary">
              Dashboard
            </Link>
            <Link to="/upload" className="hover:text-primary">
              Upload
            </Link>
            <Link to="/gallery" className="text-primary font-semibold">
              Gallery
            </Link>
          </nav>
          <div className="relative hidden md:block">
            <button
              onClick={() => setShowUserMenu((prev) => !prev)}
              className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full cursor-pointer"
            >
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${userEmail}`}
                alt="avatar"
                className="h-7 w-7 rounded-full"
              />
              <span className="hidden sm:block text-sm font-medium">
                {userEmail}
              </span>
            </button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border text-sm overflow-hidden z-50">
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setShowUserMenu(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        {menuOpen && (
          <div className="flex flex-col gap-2 mt-3 md:hidden text-sm font-medium">
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
              Dashboard
            </Link>
            <Link to="/upload" onClick={() => setMenuOpen(false)}>
              Upload
            </Link>
            <Link
              to="/gallery"
              className="text-primary"
              onClick={() => setMenuOpen(false)}
            >
              Gallery
            </Link>
            <button
              onClick={handleLogout}
              className="text-left px-2 py-2 rounded text-red-500 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </header>

      <div className="p-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Your Receipts</h1>
          <div className="relative w-full max-w-xs">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              className="w-full pl-9 pr-3 py-2 border rounded-md text-sm"
              placeholder="Search receipts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) =>
              setFilters((f) => ({ ...f, startDate: e.target.value }))
            }
            className="w-full border px-2 py-1 rounded"
          />
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) =>
              setFilters((f) => ({ ...f, endDate: e.target.value }))
            }
            className="w-full border px-2 py-1 rounded"
          />
          <input
            type="number"
            placeholder="Min Amount"
            value={filters.minAmount}
            onChange={(e) =>
              setFilters((f) => ({ ...f, minAmount: e.target.value }))
            }
            className="w-full border px-2 py-1 rounded"
          />
          <input
            type="number"
            placeholder="Max Amount"
            value={filters.maxAmount}
            onChange={(e) =>
              setFilters((f) => ({ ...f, maxAmount: e.target.value }))
            }
            className="w-full border px-2 py-1 rounded"
          />
        </div>

        <div className="mb-6">
          <select
            className="w-full border px-2 py-1 rounded"
            value={filters.sortBy}
            onChange={(e) =>
              setFilters((f) => ({ ...f, sortBy: e.target.value }))
            }
          >
            <option value="date_desc">Date (Newest)</option>
            <option value="date_asc">Date (Oldest)</option>
            <option value="amount_desc">Amount (High to Low)</option>
            <option value="amount_asc">Amount (Low to High)</option>
          </select>
        </div>

        {/* Gallery */}
        {loading ? (
          <p className="text-center">Loading receipts...</p>
        ) : filteredReceipts.length === 0 ? (
          <p className="text-center text-gray-500">No receipts found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReceipts.map((r) => (
              <div
                key={r.id}
                className="bg-white border rounded shadow hover:shadow-md cursor-pointer"
                onClick={() => {
                  setSelectedReceipt({ ...r });
                  setShowModal(true);
                }}
              >
                <img
                  src={r.file_url}
                  alt={r.merchant_name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3">
                  <h2 className="text-lg font-semibold truncate">
                    {r.merchant_name}
                  </h2>
                  <p className="text-sm text-gray-600">₹ {r.amount}</p>
                  <p className="text-xs text-gray-500">{r.date}</p>
                  <p className="text-xs italic text-gray-500">{r.notes}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {r.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-gray-200 text-xs rounded-full px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white max-w-md w-full p-6 rounded shadow-lg overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Receipt</h2>
              <button onClick={() => setShowModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              {selectedReceipt.file_url && (
                <img
                  src={selectedReceipt.file_url}
                  alt="Preview"
                  className="w-full h-64 object-contain rounded border"
                />
              )}
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="Merchant Name"
                value={selectedReceipt.merchant_name || ""}
                onChange={(e) =>
                  setSelectedReceipt((p) => ({
                    ...p,
                    merchant_name: e.target.value,
                  }))
                }
              />
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="Category"
                value={selectedReceipt.category || ""}
                onChange={(e) =>
                  setSelectedReceipt((p) => ({
                    ...p,
                    category: e.target.value,
                  }))
                }
              />
              <input
                type="number"
                className="w-full border rounded px-3 py-2"
                placeholder="Amount"
                value={selectedReceipt.amount || ""}
                onChange={(e) =>
                  setSelectedReceipt((p) => ({
                    ...p,
                    amount: e.target.value,
                  }))
                }
              />
              <textarea
                className="w-full border rounded px-3 py-2"
                placeholder="Notes"
                value={selectedReceipt.notes || ""}
                onChange={(e) =>
                  setSelectedReceipt((p) => ({
                    ...p,
                    notes: e.target.value,
                  }))
                }
              />
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="Tags (comma separated)"
                value={selectedReceipt.tags?.join(", ") || ""}
                onChange={(e) =>
                  setSelectedReceipt((p) => ({
                    ...p,
                    tags: e.target.value.split(",").map((t) => t.trim()),
                  }))
                }
              />
              <button
                onClick={handleSave}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
              <button
                onClick={() =>
                  handleDelete(selectedReceipt.id, selectedReceipt.file_url)
                }
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 mt-2"
              >
                Delete Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

ReceiptGalleryPage.jsx;
