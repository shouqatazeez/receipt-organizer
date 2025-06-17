import { ArrowRightIcon, ReceiptIndianRupee } from "lucide-react";

export default function SignupBanner() {
  return (
    <div className="dark bg-muted text-foreground px-4 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 rounded-full">
          <a href="/">
            {" "}
            <ReceiptIndianRupee
              className="text-primary"
              size={25}
              aria-hidden="true"
            />{" "}
          </a>
          <span>
            <a className="text-2xl font-semibold" href="/">
              {" "}
              ReceiptPro
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
