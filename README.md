# ReceiptPro

**ReceiptPro** is a modern web-based receipt management system that helps users upload, organize, and search receipts effortlessly. It allows digital record-keeping of receipts with advanced tagging, filtering, and secure authentication.

---

## Features

### User Authentication

- Secure registration, login, and logout using Supabase Auth.
- Email verification to ensure valid users.

### Receipt Upload

- Upload receipts in **JPEG**, **PNG** formats.
- Files are stored securely using Supabase Storage.

### Receipt Gallery

- View uploaded receipts in a responsive **gallery** layout.
- Supports grid toggle, search, and detail preview.

### Tagging System

- edit, or delete tags on receipts.
- Helps in categorizing receipts for better organization.

### Search & Filter

- **Search by**:
  - Merchant name
  - Amount
  - Notes
  - Tags
- **Filter by**:
  - Date range
  - Amount range
  - Category

### Receipt Details View

- Click a receipt to view detailed modal:
  - Image preview
  - Editable Merchant name
  - Editable Amount and date
  - Editable Category and tags
  - Editable notes

### Delete Receipts

- Easily delete receipts with confirmation.

---

## Tech Stack

| Layer      | Technology                     |
| ---------- | ------------------------------ |
| Frontend   | React + Tailwind CSS           |
| UI Library | Shadcn/UI Components           |
| Backend    | Supabase (Auth + DB + Storage) |
| Icons      | Lucide Icons                   |
| Routing    | React Router DOM               |

---

## Database Schema (Supabase)

| Column          | Type      | Description                   |
| --------------- | --------- | ----------------------------- |
| `id`            | uuid      | Primary key                   |
| `created_at`    | timestamp | Auto-generated                |
| `amount`        | numeric   | Receipt amount                |
| `file_url`      | text      | File path in Supabase Storage |
| `date`          | date      | Transaction date              |
| `tags`          | text      | Comma-separated tags          |
| `notes`         | text      | Optional notes                |
| `user_id`       | uuid      | User who uploaded the receipt |
| `merchant_name` | text      | Vendor/Store name             |
| `category`      | text      | Expense category              |

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/shouqatazeez/receipt-organizer.git
cd receiptpro
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Supabase

Create a `.env` file in the root with your Supabase credentials:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

### 4. Run the App

```bash
npm run dev
```

App will run at: [http://localhost:5173](http://localhost:5173)
