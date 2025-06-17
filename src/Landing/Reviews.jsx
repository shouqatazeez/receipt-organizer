import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { StarIcon } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h3 className="text-3xl font-bold mb-4">What Our Users Are Saying</h3>
        <p className="text-muted-foreground">
          Don't just take our word for it. Here's what real users have to say
          about their experience with{" "}
          <span className="text-primary font-medium">ReceiptPro</span>.
        </p>
      </div>

      {/* Cards */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-8  
"
      >
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-muted p-6 rounded-2xl shadow-lg flex flex-col items-center text-center space-y-4 hover:ring hover:ring-primary/30"
          >
            {/* Avatar */}
            <Avatar className="w-28 h-28 shadow-md">
              <AvatarImage src={t.image} alt={t.name} />
            </Avatar>

            {/* Name & Role */}
            <div>
              <h5 className="text-lg font-semibold">{t.name}</h5>
              <p className="text-sm text-primary">{t.role}</p>
            </div>

            {/* Testimonial text */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              <i className="fas fa-quote-left mr-2 text-primary" />
              {t.text}
            </p>

            {/* Stars */}
            <div className="flex gap-1 justify-center">
              {Array.from({ length: 5 }).map((_, i) => {
                const half = t.rating % 1 >= 0.5 && i === Math.floor(t.rating);
                const filled = i < Math.floor(t.rating);

                return (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${
                      filled
                        ? "fill-yellow-400 text-yellow-400"
                        : half
                        ? "fill-yellow-400 text-yellow-400/50"
                        : "text-gray-300"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: "Maria Smantha",
    role: "Small Business Owner",
    image: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp",
    text: "As a restaurant owner, I deal with dozens of receipts daily. ReceiptPro's bulk upload feature and smart tagging system have made expense tracking effortless. The analytics help me understand my spending patterns and make better business decisions.",
    rating: 4.5,
  },
  {
    name: "Lisa Cudrow",
    role: "TechCorp Inc",
    image: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp",
    text: "ReceiptPro has completely transformed how I manage my business expenses. The automatic categorization saves me hours every month, and the search functionality is incredibly powerful. I can find any receipt in seconds!",
    rating: 5,
  },
  {
    name: "John Smith",
    role: "Freelance Consultant",
    image: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp",
    text: "Working with multiple clients means managing receipts from various projects. ReceiptPro's tagging and filtering system lets me organize everything by client and project effortlessly. The export feature makes creating expense reports a breeze.",
    rating: 4,
  },
];
