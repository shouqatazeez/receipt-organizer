import React from "react";
import { Button } from "@/components/ui/button";
import heroImage from "../assets/heroimg.jpg";

const Hero = () => {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
        <div className="flex flex-col-reverse items-center justify-between gap-10 md:flex-row">
          {/* Left: Text content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Organize Your Receipts Effortlessly
            </h1>
            <p className="text-muted-foreground text-xl mt-5">
              Stop losing receipts and start managing your expenses like a pro.
              Upload, organize, and search your receipts with our powerful
              digital platform.
            </p>
            <div className="mt-8 flex justify-center md:justify-start gap-3">
              <a href="/signup">
                <Button className="cursor-pointer" size="lg">
                  Start Free Today
                </Button>
              </a>
              <Button
                className="cursor-pointer hover:border-gray-700 border-transparent border-2"
                size="lg"
                variant="outline"
              >
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="md:w-1/2">
            <img
              src={heroImage}
              alt="ReceiptPro dashboard preview"
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
