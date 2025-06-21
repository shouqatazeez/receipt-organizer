import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Menu, X, ReceiptIndianRupeeIcon } from "lucide-react";

export default function ReceiptUploadPage() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userEmail, setUserEmail] = useState("Loading...");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    merchant_name: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    category: "",
    tags: "",
    notes: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error || !user) {
        console.error("Error fetching user:", error?.message);
        setUserEmail("Guest");
      } else {
        setUserEmail(user.email);
      }
    };
    fetchUser();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setSuccessMessage("");

    if (selectedFile) {
      if (selectedFile.type.startsWith("image/")) {
        setPreviewUrl(URL.createObjectURL(selectedFile));
      } else if (selectedFile.type === "application/pdf") {
        setPreviewUrl("/pdf-icon.png");
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccessMessage("");
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");
    if (!formData.merchant_name || !formData.amount) {
      alert("Merchant name and amount are required.");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const userId = user?.id;
    if (!userId) {
      alert("Not logged in.");
      setLoading(false);
      return;
    }

    const filePath = `${userId}/${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("receipts")
      .upload(filePath, file);

    if (uploadError) {
      alert("Error uploading file: " + uploadError.message);
      setLoading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("receipts").getPublicUrl(filePath);

    const { error: insertError } = await supabase.from("receipts").insert({
      user_id: userId,
      file_url: publicUrl,
      merchant_name: formData.merchant_name,
      amount: formData.amount ? parseFloat(formData.amount) : 0,
      date: formData.date,
      category: formData.category,
      tags: formData.tags,
      notes: formData.notes,
    });

    if (insertError) {
      alert("Error saving metadata: " + insertError.message);
    } else {
      setSuccessMessage("✅ Receipt uploaded successfully!");
      setFile(null);
      setPreviewUrl(null);
      setFormData({
        merchant_name: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
        category: "",
        tags: "",
        notes: "",
      });
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
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
            <Link to="/upload" className="hover:text-primary text-primary">
              Upload
            </Link>
            <Link to="/gallery" className="hover:text-primary">
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
            <Link
              to="/dashboard"
              className="hover:text-primary"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/upload"
              className="hover:text-primary"
              onClick={() => setMenuOpen(false)}
            >
              Upload
            </Link>
            <Link
              to="/gallery"
              className="hover:text-primary"
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

      <div className="p-4 max-w-md mx-auto space-y-4">
        <h1 className="text-2xl font-bold mt-4">Upload Receipt</h1>

        <div className="w-full">
          <label
            htmlFor="fileInput"
            className="block w-full text-center bg-white border border-gray-300 px-4 py-2 rounded cursor-pointer hover:bg-gray-100"
          >
            {file ? "✔️ Image Selected" : "📷 Choose Image"}
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* <input
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
          className="w-full cursor-pointer"
        /> */}

        {previewUrl && (
          <div className="mt-4">
            {file?.type.startsWith("image/") ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="max-w-full h-auto rounded border"
              />
            ) : (
              <img src={previewUrl} alt="PDF Preview" className="w-16 h-16" />
            )}
          </div>
        )}

        <input
          type="text"
          name="merchant_name"
          placeholder="Merchant Name"
          className="border p-2 w-full"
          value={formData.merchant_name}
          onChange={handleFormChange}
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          className="border p-2 w-full"
          value={formData.amount}
          onChange={handleFormChange}
        />

        <input
          type="date"
          name="date"
          className="border p-2 w-full"
          value={formData.date}
          onChange={handleFormChange}
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleFormChange}
          className="border p-2 w-full bg-white"
        >
          <option value="">Select Category</option>
          <option value="Transportation">Transportation</option>
          <option value="Education">Education</option>
          <option value="Food & Dining">Food & Dining</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Business">Business</option>
          <option value="Shopping">Shopping</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Utilities">Utilities</option>
          <option value="Travel">Travel</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          className="border p-2 w-full"
          value={formData.tags}
          onChange={handleFormChange}
        />

        <textarea
          name="notes"
          placeholder="Notes"
          className="border p-2 w-full"
          value={formData.notes}
          onChange={handleFormChange}
        />

        {successMessage && (
          <div className="text-green-600 text-sm">{successMessage}</div>
        )}

        <button
          disabled={
            loading || !file || !formData.merchant_name || !formData.amount
          }
          onClick={handleUpload}
          className="px-4 py-2 bg-black text-white rounded w-full cursor-pointer hover:bg-gray-950 disabled:bg-gray-400"
        >
          {loading ? "Uploading..." : "Upload Receipt"}
        </button>
      </div>
    </div>
  );
}
