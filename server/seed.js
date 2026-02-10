import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Tour from './models/Tour.js';

dotenv.config();

const tours = [
  {
    title: "Istanbul Heritage Tour",
    description: "Explore the majestic mosques, palaces, and bazaars of Istanbul with expert guides.",
    image: "https://images.unsplash.com/photo-1677653748718-da50b00ac04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc3RhbmJ1bCUyMHR1cmtleSUyMGJsdWUlMjBtb3NxdWUlMjBsdXh1cnl8ZW58MXx8fHwxNzcwNTgyNDE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    duration: "5 Days",
    groupSize: "Max 12",
    rating: 4.9,
    price: 1299,
    category: "tourist",
    highlights: [
      "Hagia Sophia",
      "Blue Mosque",
      "Topkapi Palace",
      "Grand Bazaar",
      "Bosphorus Cruise"
    ],
    included: [
      "4-star hotel accommodation",
      "Professional guide",
      "All entrance fees",
      "Breakfast daily",
      "Airport transfers"
    ],
    excluded: [
      "International flights",
      "Lunch and dinner",
      "Personal expenses",
      "Travel insurance"
    ]
  },
  {
    title: "Cappadocia Dream",
    description: "Hot air balloon rides, fairy chimneys, and underground cities in magical Cappadocia.",
    image: "https://images.unsplash.com/photo-1677741447965-6066cdf3bd1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBwYWRvY2lhJTIwaG90JTIwYWlyJTIwYmFsbG9vbnMlMjBzdW5yaXNlfGVufDF8fHx8MTc3MDU2NTM1OHww&ixlib=rb-4.1.0&q=80&w=1080",
    duration: "4 Days",
    groupSize: "Max 10",
    rating: 5.0,
    price: 1599,
    category: "tourist",
    highlights: [
      "Hot air balloon ride",
      "Fairy chimneys",
      "Underground cities",
      "Cave hotels",
      "Sunset views"
    ],
    included: [
      "Cave hotel accommodation",
      "Hot air balloon ticket",
      "Professional guide",
      "All entrance fees",
      "Breakfast daily"
    ],
    excluded: [
      "International flights",
      "Lunch and dinner",
      "Personal expenses",
      "Travel insurance"
    ]
  },
  {
    title: "Mediterranean Paradise",
    description: "Luxury coastal experience along Turkey's stunning turquoise coastline.",
    image: "https://images.unsplash.com/photo-1615324949351-632282d2b494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXJrZXklMjBiZWFjaCUyMG1lZGl0ZXJyYW5lYW4lMjBjb2FzdHxlbnwxfHx8fDE3NzA1ODI0MjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    duration: "7 Days",
    groupSize: "Max 8",
    rating: 4.8,
    price: 2199,
    category: "tourist",
    highlights: [
      "Pristine beaches",
      "Luxury resorts",
      "Ancient ruins",
      "Boat tours",
      "Water sports"
    ],
    included: [
      "5-star resort accommodation",
      "All meals",
      "Boat tours",
      "Water sports equipment",
      "Airport transfers"
    ],
    excluded: [
      "International flights",
      "Personal expenses",
      "Travel insurance",
      "Optional excursions"
    ]
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/turkish-elite-tourism');
    console.log('✅ Connected to MongoDB');

    // Clear existing tours
    await Tour.deleteMany({});
    console.log('🗑️  Cleared existing tours');

    // Insert new tours
    await Tour.insertMany(tours);
    console.log(`✅ Seeded ${tours.length} tours`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
