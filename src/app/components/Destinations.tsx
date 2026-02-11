import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { MapPin, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { citiesAPI } from "../../services/api";

const defaultDestinations = [
  { name: "Istanbul", description: "Where East meets West", image: "https://images.unsplash.com/photo-1677653748718-da50b00ac04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc3RhbmJ1bCUyMHR1cmtleSUyMGJsdWUlMjBtb3NxdWUlMjBsdXh1cnl8ZW58MXx8fHwxNzcwNTgyNDE2fDA&ixlib=rb-4.1.0&q=80&w=1080", highlights: "Historic Mosques • Grand Bazaar • Bosphorus Cruise" },
  { name: "Cappadocia", description: "Land of Fairy Chimneys", image: "https://images.unsplash.com/photo-1677741447965-6066cdf3bd1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBwYWRvY2lhJTIwaG90JTIwYWlyJTIwYmFsbG9vbnMlMjBzdW5yaXNlfGVufDF8fHx8MTc3MDU2NTM1OHww&ixlib=rb-4.1.0&q=80&w=1080", highlights: "Hot Air Balloons • Cave Hotels • Ancient Cities" },
  { name: "Mediterranean Coast", description: "Turquoise Riviera", image: "https://images.unsplash.com/photo-1615324949351-632282d2b494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXJrZXklMjBiZWFjaCUyMG1lZGl0ZXJyYW5lYW4lMjBjb2FzdHxlbnwxfHx8fDE3NzA1ODI0MjF8MA&ixlib=rb-4.1.0&q=80&w=1080", highlights: "Pristine Beaches • Luxury Resorts • Ancient Ruins" },
];

export function Destinations() {
  const [destinations, setDestinations] = useState(defaultDestinations);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await citiesAPI.getAll(true);
        if (Array.isArray(data) && data.length > 0) {
          setDestinations(data.map((c: any) => ({
            name: c.name,
            description: c.description,
            image: c.image,
            highlights: Array.isArray(c.highlights) ? c.highlights.join(" • ") : (c.highlights || ""),
          })));
        }
      } catch {
        // Keep default destinations on error
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="destinations" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-blue-100 rounded-full text-blue-700 text-sm tracking-wide mb-4">Top Destinations</span>
          <h2 className="text-4xl md:text-5xl text-gray-900 mb-4">Explore Turkey&apos;s Wonders</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">From ancient cities to pristine beaches, discover the diverse beauty of Turkey</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((d, index) => (
              <Card key={d.name || index} className="overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
                <div className="relative h-64 overflow-hidden bg-blue-100">
                  <img
                    src={d.image}
                    alt={d.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Place</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl text-gray-900 mb-3">{d.name}</h3>
                  <p className="text-gray-600 mb-4">{d.description}</p>
                  <p className="text-sm text-gray-500 mb-6">{d.highlights}</p>
                  <Button onClick={scrollToContact} className="bg-blue-600 hover:bg-blue-700 text-white w-full">Explore</Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}