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
  { icon: "Smile", title: "Dental Care", description: "World-class dental procedures including implants, veneers, and complete smile makeovers at a fraction of the cost.", image: "", features: ["Implants", "Veneers", "Whitening", "Full Restoration"] },
  { icon: "Eye", title: "Cosmetic Surgery", description: "Advanced cosmetic procedures performed by board-certified surgeons in state-of-the-art facilities.", image: "", features: ["Rhinoplasty", "Face Lift", "Liposuction", "Breast Surgery"] },
  { icon: "Sparkles", title: "Hair Transplant", description: "Leading hair restoration techniques with natural-looking results and comprehensive aftercare.", image: "", features: ["FUE Method", "DHI Technique", "Beard Transplant", "Eyebrow Restoration"] },
  { icon: "Heart", title: "Wellness Programs", description: "Holistic wellness retreats combining medical treatments with luxury spa experiences.", image: "", features: ["Detox Programs", "Weight Management", "Anti-Aging", "Spa Therapy"] },
];

export function MedicalTourism() {
  const [services, setServices] = useState<{ icon: string; title: string; description: string; image?: string; features: string[] }[]>(defaultServices);
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
            image: o.image || "",
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

        {/* Services Grid - Symmetric layout, image fallback */}
        {loadingServices ? (
          <div className="flex justify-center items-center py-20 mb-16">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Heart;
            return (
              <Card key={service.title || index} className="overflow-hidden group hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full">
                <div className="relative h-64 overflow-hidden bg-emerald-100 shrink-0">
                  {service.image ? (
                    <>
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const parent = e.currentTarget.parentElement;
                          const fallback = parent?.querySelector('.img-fallback');
                          if (fallback) (fallback as HTMLElement).classList.remove('hidden');
                        }}
                      />
                      <div className="img-fallback hidden absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-200 to-teal-200">
                        <Icon className="h-24 w-24 text-emerald-600/60" />
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-200 to-teal-200 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="h-24 w-24 text-emerald-600/60" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm">Medical</div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-2xl text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4 flex-1">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {(service.features || []).slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white w-full mt-auto"
                  >
                    Get Consultation
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
        )}

        {/* Benefits Section - Symmetric layout */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 md:p-12">
          <h3 className="text-3xl text-gray-900 text-center mb-12">
            Why Choose Turkey for Medical Tourism?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-md shrink-0">
                    <Icon className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h4 className="text-lg text-gray-900 mb-2 font-semibold">{benefit.title}</h4>
                  <p className="text-gray-600 text-sm max-w-xs mx-auto">{benefit.description}</p>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-6 text-base"
            >
              Get Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}