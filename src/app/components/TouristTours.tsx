import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Clock, Users, Star, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { toursAPI } from "../../services/api";
import { BookingDialog } from "./BookingDialog";
import { toast } from "sonner";

interface Tour {
  _id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  groupSize: string;
  rating: number;
  price: number;
  category: string;
}

export function TouristTours() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const data = await toursAPI.getAll("tourist");
      // If no tours in database, use default tours
      if (data.length === 0) {
        setTours(getDefaultTours());
      } else {
        setTours(data);
      }
    } catch (error) {
      console.error("Error fetching tours:", error);
      toast.error("Failed to load tours. Showing default tours.");
      setTours(getDefaultTours());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultTours = (): Tour[] => [
    {
      _id: "1",
      title: "Istanbul Heritage Tour",
      image: "https://images.unsplash.com/photo-1677653748718-da50b00ac04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc3RhbmJ1bCUyMHR1cmtleSUyMGJsdWUlMjBtb3NxdWUlMjBsdXh1cnl8ZW58MXx8fHwxNzcwNTgyNDE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Explore the majestic mosques, palaces, and bazaars of Istanbul with expert guides.",
      duration: "5 Days",
      groupSize: "Max 12",
      rating: 4.9,
      price: 1299,
      category: "tourist",
    },
    {
      _id: "2",
      title: "Cappadocia Dream",
      image: "https://images.unsplash.com/photo-1677741447965-6066cdf3bd1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBwYWRvY2lhJTIwaG90JTIwYWlyJTIwYmFsbG9vbnMlMjBzdW5yaXNlfGVufDF8fHx8MTc3MDU2NTM1OHww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Hot air balloon rides, fairy chimneys, and underground cities in magical Cappadocia.",
      duration: "4 Days",
      groupSize: "Max 10",
      rating: 5.0,
      price: 1599,
      category: "tourist",
    },
    {
      _id: "3",
      title: "Mediterranean Paradise",
      image: "https://images.unsplash.com/photo-1615324949351-632282d2b494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXJrZXklMjBiZWFjaCUyMG1lZGl0ZXJyYW5lYW4lMjBjb2FzdHxlbnwxfHx8fDE3NzA1ODI0MjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Luxury coastal experience along Turkey's stunning turquoise coastline.",
      duration: "7 Days",
      groupSize: "Max 8",
      rating: 4.8,
      price: 2199,
      category: "tourist",
    },
  ];

  const handleBookNow = (tour: Tour) => {
    setSelectedTour(tour);
    setBookingDialogOpen(true);
  };

  return (
    <section id="tourist" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-red-100 rounded-full text-red-700 text-sm tracking-wide mb-4">
            Tourist Experiences
          </span>
          <h2 className="text-4xl md:text-5xl text-gray-900 mb-4">
            Curated Luxury Tours
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Immerse yourself in Turkey's rich culture and breathtaking landscapes with our premium tour packages
          </p>
        </div>

        {/* Tours Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-red-600" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <Card key={tour._id} className="overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-red-500 text-red-500" />
                      <span className="text-sm">{tour.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl text-gray-900 mb-3">{tour.title}</h3>
                  <p className="text-gray-600 mb-4">{tour.description}</p>
                  
                  <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{tour.groupSize}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-500">From</span>
                      <div className="text-2xl text-red-600">${tour.price.toLocaleString()}</div>
                    </div>
                    <Button 
                      onClick={() => handleBookNow(tour)}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <BookingDialog
        open={bookingDialogOpen}
        onOpenChange={setBookingDialogOpen}
        tour={selectedTour}
      />
    </section>
  );
}