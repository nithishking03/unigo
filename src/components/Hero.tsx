import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-primary/90 to-secondary/90 text-white py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            All Your Services,
            <br />
            One Platform
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90 animate-fade-in">
            From transportation to food delivery, we've got all your daily needs covered.
            Experience convenience like never before.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-black/40 -z-10"></div>
    </div>
  );
};