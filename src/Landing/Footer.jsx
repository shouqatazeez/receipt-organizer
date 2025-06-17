export default function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground space-y-1">
        <p>
          &copy; {new Date().getFullYear()} ReceiptPro. All rights reserved.
        </p>

        <p>
          Made with <span className="text-red-500">❤️</span> by{" "}
          <span className="font-semibold text-foreground">
            Mohammad Shouqat Azeez
          </span>
        </p>
      </div>
    </footer>
  );
}
