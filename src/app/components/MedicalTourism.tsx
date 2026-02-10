import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Heart, Smile, Eye, Sparkles, Shield, Award, Loader2, LucideIcon } from "lucide-react";
import { Button } from "./ui/button";
import medicalPoster from "../../assets/medical-poster.png";
import { medicalOptionsAPI } from "../../services/api";

const iconMap: Record<string, LucideIcon> = {
  Heart,
  Smile,
  Eye,
  Sparkles,
  Shield,
  Award,
};

const defaultServices = [
  { icon: "Smile", title: "Dental Care", description: "World-class dental procedures including implants, veneers, and complete smile makeovers at a fraction of the cost.", features: ["Implants", "Veneers", "Whitening", "Full Restoration"] },
  { icon: "Eye", title: "Cosmetic Surgery", description: "Advanced cosmetic procedures performed by board-certified surgeons in state-of-the-art facilities.", features: ["Rhinoplasty", "Face Lift", "Liposuction", "Breast Surgery"] },
  { icon: "Sparkles", title: "Hair Transplant", description: "Leading hair restoration techniques with natural-looking results and comprehensive aftercare.", features: ["FUE Method", "DHI Technique", "Beard Transplant", "Eyebrow Restoration"] },
  { icon: "Heart", title: "Wellness Programs", description: "Holistic wellness retreats combining medical treatments with luxury spa experiences.", features: ["Detox Programs", "Weight Management", "Anti-Aging", "Spa Therapy"] },
];

export function MedicalTourism() {
  const [services, setServices] = useState<{ icon: string; title: string; description: string; features: string[] }[]>(defaultServices);
  const [loadingServices, setLoadingServices] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await medicalOptionsAPI.getAll(true);
        if (Array.isArray(data) && data.length > 0) {
          setServices(data.map((o: any) => ({
            icon: o.icon || "Heart",
            title: o.title,
            description: o.description,
            features: Array.isArray(o.features) ? o.features : [],
          })));
        }
      } catch {
        // Keep defaults
      } finally {
        setLoadingServices(false);
      }
    };
    load();
  }, []);

  const benefits = [
    {
      icon: Shield,
      title: "JCI Accredited Hospitals",
      description: "All our partner hospitals meet international healthcare standards",
    },
    {
      icon: Award,
      title: "Expert Specialists",
      description: "Board-certified doctors with international training and experience",
    },
    {
      icon: Heart,
      title: "Comprehensive Care",
      description: "From arrival to recovery, we handle every detail of your medical journey",
    },
  ];

  return (
    <section id="medical" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-emerald-100 rounded-full text-emerald-700 text-sm tracking-wide mb-4">
            Medical Excellence
          </span>
          <h2 className="text-4xl md:text-5xl text-gray-900 mb-4">
            World-Class Medical Tourism
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Combine your journey to Turkey with premium medical treatments at internationally accredited facilities
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative h-[600px] md:h-[700px] rounded-2xl overflow-hidden mb-16 bg-[#2c0d07]">
          <div className="relative h-full w-full flex">
            {/* Background Image - Full width, positioned right */}
            <div className="absolute inset-0">
              <img
                src={medicalPoster}
                alt="Medical Tourism"
                className="h-full w-full object-contain object-right"
              />
              {/* Gradient merge from brown (left) to transparent (right) */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#2c0d07] via-[#2c0d07]/70 via-[#2c0d07]/30 to-transparent"></div>
            </div>

            {/* Left Side - Content */}
            <div className="relative z-10 flex-1 flex items-center">
              <div className="px-6 lg:px-12 max-w-xl md:max-w-2xl">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#f4d03f] mb-6 leading-tight">
                  Hair Transplanting
                </h3>
                <p className="text-base md:text-lg text-white/90 max-w-md leading-relaxed">
                  Join our growing neighborhood. Experience world-class hair restoration with natural-looking results.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        {loadingServices ? (
          <div className="flex justify-center py-12 mb-16">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
          </div>
        ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Heart;
            return (
              <Card key={service.title || index} className="p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="h-7 w-7 text-emerald-600" />
                </div>
                <h3 className="text-xl text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {(service.features || []).map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
        )}

        {/* Benefits Section */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 md:p-12">
          <h3 className="text-3xl text-gray-900 text-center mb-12">
            Why Choose Turkey for Medical Tourism?
          </h3>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <Icon className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h4 className="text-lg text-gray-900 mb-2">{benefit.title}</h4>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <Button
              size="lg"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8"
            >
              Get Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}