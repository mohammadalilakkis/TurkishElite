import { Card } from "./ui/card";
import { Star, Quote } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "London, UK",
      rating: 5,
      text: "The medical tourism package exceeded all expectations. The dental work was exceptional, and the tour of Istanbul was unforgettable. Truly a luxurious experience from start to finish.",
      service: "Dental Care & Istanbul Tour",
    },
    {
      name: "Michael Chen",
      location: "Los Angeles, USA",
      rating: 5,
      text: "My hair transplant journey was seamless. The medical staff were professional, and the recovery stay in Cappadocia was like a dream. Best decision I've made!",
      service: "Hair Transplant Package",
    },
    {
      name: "Emma Rodriguez",
      location: "Madrid, Spain",
      rating: 5,
      text: "The Mediterranean luxury tour was absolutely stunning. Every detail was carefully planned, and our guide was incredibly knowledgeable. Can't wait to return!",
      service: "Mediterranean Paradise Tour",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-purple-100 rounded-full text-purple-700 text-sm tracking-wide mb-4">
            Client Stories
          </span>
          <h2 className="text-4xl md:text-5xl text-gray-900 mb-4">
            What Our Guests Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Read about the experiences of travelers who've discovered the magic of Turkey with us
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8 relative hover:shadow-xl transition-shadow duration-300">
              <Quote className="h-10 w-10 text-red-200 mb-4" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-red-400 text-red-400"
                  />
                ))}
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              <div className="pt-4 border-t">
                <div className="text-gray-900 mb-1">{testimonial.name}</div>
                <div className="text-sm text-gray-500 mb-2">
                  {testimonial.location}
                </div>
                <div className="text-xs text-red-600 bg-red-50 inline-block px-3 py-1 rounded-full">
                  {testimonial.service}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}