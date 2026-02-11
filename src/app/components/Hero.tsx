import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <div id="home" className="relative h-screen w-full overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1920&q=80"
          alt="Turkey Luxury Destination"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-6">
              <span className="inline-block px-4 py-1.5 bg-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-full text-red-400 text-sm tracking-wide">
                Premium Turkish Experiences
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl text-white mb-6 tracking-tight">
              Discover the
              <span className="block text-red-500">Magic of Turkey</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Experience luxury tours and world-class medical tourism in one of the world's most captivating destinations. Your journey to wellness and wonder begins here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => {
                  const touristSection = document.getElementById('tourist');
                  if (touristSection) {
                    touristSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg group"
              >
                Explore Tours
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  const medicalSection = document.getElementById('medical');
                  if (medicalSection) {
                    medicalSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm px-8 py-6 text-lg"
              >
                Medical Services
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-white/60 animate-bounce">
          <span className="text-sm tracking-wider">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}