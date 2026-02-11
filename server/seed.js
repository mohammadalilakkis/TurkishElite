import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Tour from './models/Tour.js';
import City from './models/City.js';
import MedicalOption from './models/MedicalOption.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

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
    highlights: ["Hagia Sophia", "Blue Mosque", "Topkapi Palace", "Grand Bazaar", "Bosphorus Cruise"],
    included: ["4-star hotel accommodation", "Professional guide", "All entrance fees", "Breakfast daily", "Airport transfers"],
    excluded: ["International flights", "Lunch and dinner", "Personal expenses", "Travel insurance"]
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
    highlights: ["Hot air balloon ride", "Fairy chimneys", "Underground cities", "Cave hotels", "Sunset views"],
    included: ["Cave hotel accommodation", "Hot air balloon ticket", "Professional guide", "All entrance fees", "Breakfast daily"],
    excluded: ["International flights", "Lunch and dinner", "Personal expenses", "Travel insurance"]
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
    highlights: ["Pristine beaches", "Luxury resorts", "Ancient ruins", "Boat tours", "Water sports"],
    included: ["5-star resort accommodation", "All meals", "Boat tours", "Water sports equipment", "Airport transfers"],
    excluded: ["International flights", "Personal expenses", "Travel insurance", "Optional excursions"]
  },
  {
    title: "Ephesus Ancient Wonders",
    description: "Step back in time at one of the best-preserved ancient cities in the world.",
    image: "https://images.unsplash.com/photo-1615800098779-1be32e60cca3?w=1080",
    duration: "3 Days",
    groupSize: "Max 15",
    rating: 4.9,
    price: 899,
    category: "tourist",
    highlights: ["Library of Celsus", "Great Theatre", "Temple of Artemis", "House of Virgin Mary"],
    included: ["3-star hotel", "Professional guide", "Entrance fees", "Breakfast"],
    excluded: ["International flights", "Meals", "Travel insurance"]
  },
  {
    title: "Bodrum Luxury Escape",
    description: "Yacht cruises, white marble beaches, and ancient castles on the Aegean coast.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1080",
    duration: "5 Days",
    groupSize: "Max 8",
    rating: 4.8,
    price: 1899,
    category: "tourist",
    highlights: ["Bodrum Castle", "Mausoleum", "Gümbet Beach", "Yacht sailing"],
    included: ["4-star hotel", "Boat tour", "Guide", "Breakfast"],
    excluded: ["International flights", "Lunch and dinner", "Travel insurance"]
  },
  {
    title: "Pamukkale & Hierapolis",
    description: "White travertine terraces and ancient Roman ruins — a natural and historical wonder.",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1080",
    duration: "2 Days",
    groupSize: "Max 12",
    rating: 4.7,
    price: 549,
    category: "tourist",
    highlights: ["Cotton Castle", "Hierapolis", "Cleopatra's Pool", "Hot springs"],
    included: ["Hotel", "Entrance fees", "Guide"],
    excluded: ["International flights", "Meals", "Travel insurance"]
  },
  {
    title: "Medical & Wellness Retreat",
    description: "Combine luxury tourism with world-class dental care and wellness treatments.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1080",
    duration: "10 Days",
    groupSize: "Max 6",
    rating: 5.0,
    price: 3499,
    category: "both",
    highlights: ["Dental implants", "Spa treatments", "Istanbul tour", "Hotel recovery"],
    included: ["5-star hotel", "Medical procedures", "Transfers", "Aftercare"],
    excluded: ["International flights", "Optional treatments"]
  }
];

const cities = [
  { name: "Istanbul", description: "Where East meets West", image: "https://images.unsplash.com/photo-1677653748718-da50b00ac04b?w=1080", highlights: ["Historic Mosques", "Grand Bazaar", "Bosphorus Cruise", "Topkapi Palace"] },
  { name: "Cappadocia", description: "Land of Fairy Chimneys", image: "https://images.unsplash.com/photo-1677741447965-6066cdf3bd1b?w=1080", highlights: ["Hot Air Balloons", "Cave Hotels", "Underground Cities", "Ancient Valleys"] },
  { name: "Mediterranean Coast", description: "Turquoise Riviera", image: "https://images.unsplash.com/photo-1615324949351-632282d2b494?w=1080", highlights: ["Pristine Beaches", "Luxury Resorts", "Ancient Ruins", "Boat Tours"] },
  { name: "Bodrum", description: "Aegean Jewel", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1080", highlights: ["Bodrum Castle", "Marina", "White Marble", "Yacht Cruises"] },
  { name: "Ephesus", description: "Ancient City of Legends", image: "https://images.unsplash.com/photo-1566393029929-22e3d2e563c8?w=1080", highlights: ["Library of Celsus", "Great Theatre", "Temple of Artemis", "Roman Ruins"] },
  { name: "Pamukkale", description: "Cotton Castle Terraces", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1080", highlights: ["Travertine Terraces", "Hierapolis", "Hot Springs", "Cleopatra's Pool"] },
  { name: "Antalya", description: "Gateway to the Turkish Riviera", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1080", highlights: ["Old Town", "Düden Waterfalls", "Beaches", "Roman Harbour"] }
];

const medicalOptions = [
  { title: "Dental Care", description: "World-class dental procedures including implants, veneers, and complete smile makeovers at a fraction of the cost.", icon: "Smile", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80", features: ["Implants", "Veneers", "Whitening", "Full Restoration"] },
  { title: "Cosmetic Surgery", description: "Advanced cosmetic procedures performed by board-certified surgeons in state-of-the-art facilities.", icon: "Eye", image: "https://images.unsplash.com/photo-1551076807-eeb30389b561?w=800&q=80", features: ["Rhinoplasty", "Face Lift", "Liposuction", "Breast Surgery"] },
  { title: "Hair Transplant", description: "Leading hair restoration techniques with natural-looking results and comprehensive aftercare.", icon: "Sparkles", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80", features: ["FUE Method", "DHI Technique", "Beard Transplant", "Eyebrow Restoration"] },
  { title: "Wellness Programs", description: "Holistic wellness retreats combining medical treatments with luxury spa experiences.", icon: "Heart", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80", features: ["Detox Programs", "Weight Management", "Anti-Aging", "Spa Therapy"] },
  { title: "Bariatric Surgery", description: "Obesity treatment with minimally invasive surgery and expert follow-up care.", icon: "Heart", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80", features: ["Gastric Bypass", "Sleeve Gastrectomy", "Full Support", "Long-term Care"] },
  { title: "Eye Surgery", description: "LASIK, cataract removal, and advanced vision correction with cutting-edge technology.", icon: "Eye", image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80", features: ["LASIK", "Cataract", "Vision Correction", "JCI Accredited"] }
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runSeed() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/turkish-elite-tourism';
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      maxPoolSize: 5,
    });
    console.log('✅ Connected to MongoDB');

    // Run operations sequentially with brief delays to avoid connection pool issues
    await Tour.deleteMany({});
    await delay(300);
    await Tour.insertMany(tours);
    console.log(`✅ Seeded ${tours.length} tours`);
    await delay(300);

    await City.deleteMany({});
    await delay(300);
    await City.insertMany(cities);
    console.log(`✅ Seeded ${cities.length} cities (places)`);
    await delay(300);

    await MedicalOption.deleteMany({});
    await delay(300);
    await MedicalOption.insertMany(medicalOptions);
    console.log(`✅ Seeded ${medicalOptions.length} medical options`);

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    const msg = error?.cause?.message || error?.message || String(error);
    console.error('❌ Error seeding database:', msg);
    if (msg?.includes('Connection pool') || msg?.includes('AggregateError')) {
      console.error('\n📌 Connection pool issue. Try again (npm run seed) - often works on retry.');
      console.error('   If it persists: check Atlas Network Access (IP whitelist) and Database User permissions (readWrite on database).');
    }
    if (error.code === 'ENODATA' || msg?.includes('querySrv')) {
      console.error('\n📌 DNS lookup failed for MongoDB Atlas. Try one of these fixes:');
      console.error('   1. Use the STANDARD connection string from Atlas (not SRV):');
      console.error('      - In Atlas: Connect → Drivers → Copy the "standard connection string"');
      console.error('      - Add to .env: MONGODB_URI=<that string>');
      console.error('   2. Check your internet connection and DNS');
      console.error('   3. For local dev: use mongodb://localhost:27017/turkish-elite-tourism');
    }
    if (error.message?.includes('whitelist')) {
      console.error('\n📌 Add your IP at: https://cloud.mongodb.com → Network Access → Add IP');
    }
    throw error;
  }
}

async function seedDatabase() {
  const maxRetries = 2;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      if (attempt > 1) {
        console.log(`\n🔄 Retry ${attempt}/${maxRetries}...`);
        await delay(2000);
      }
      await runSeed();
      return;
    } catch (err) {
      try { await mongoose.disconnect(); } catch (_) {}
      if (attempt === maxRetries) {
        console.error('\n❌ All retries failed.');
        process.exit(1);
      }
      console.error(`   Attempt ${attempt} failed, retrying...`);
    }
  }
}
seedDatabase();
