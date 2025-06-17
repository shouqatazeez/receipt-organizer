import { Card, CardContent } from "@/components/ui/card";
import {
  Upload,
  FolderOpen,
  SearchIcon,
  Shield,
  ChartColumn,
  ArrowDownToLine,
} from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Easy Upload",
    description:
      "Drag and drop your receipts or take photos directly. Supports JPEG, PNG, and PDF formats for maximum flexibility.",
  },
  {
    icon: FolderOpen,
    title: "Smart Organization",
    description:
      "Automatically categorize and tag your receipts. Create custom folders and organize by date, amount, or category.",
  },
  {
    icon: SearchIcon,
    title: "Powerful Search",
    description:
      "Find any receipt instantly with our advanced search. Filter by date, amount, tags, or even search within receipt text.",
  },
  {
    icon: Shield,
    title: "Secure Storage",
    description:
      "Your receipts are encrypted and stored securely in the cloud. Access them anywhere while keeping your data safe.",
  },
  {
    icon: ChartColumn,
    title: "Expense Analytics",
    description:
      "Get insights into your spending patterns with detailed charts and reports. Track trends and manage budgets effectively.",
  },

  {
    icon: ArrowDownToLine,
    title: "Export & Share",
    description:
      "Export your receipts for tax purposes or expense reports. Share organized data with accountants or team members.",
  },
];

export default function FeatureSectionSimple() {
  return (
    <section className="container mx-auto space-y-8 px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold">
          Everything You Need to Manage Receipts{" "}
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          Our comprehensive platform provides all the tools you need to
          digitize, organize, and analyze your receipts efficiently.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3  ">
        {features.map((feature) => (
          <Card key={feature.title} className="p-0">
            <CardContent className="space-y-2  bg-white shadow-md rounded-lg p-6 hover:shadow-lg hover:scale-105 transition-transform duration-300">
              <feature.icon className="text-primary h-12 w-12" />
              <h3 className="font-bold">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
