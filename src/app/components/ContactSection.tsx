import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { contactsAPI } from "../../services/api";
import { toast } from "sonner";

export function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.interest || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await contactsAPI.create({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        interest: formData.interest as "tourist" | "medical" | "both",
        message: formData.message,
      });

      setSubmitStatus("success");
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        interest: "",
        message: "",
      });
    } catch (error: any) {
      setSubmitStatus("error");
      toast.error(error.response?.data?.message || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-full text-red-400 text-sm tracking-wide mb-4">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl text-white mb-4">
            Start Your Journey Today
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions? Our team is here to help you plan your perfect Turkish experience
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-8 bg-white/5 backdrop-blur-sm border-white/10">
            <h3 className="text-2xl text-white mb-6">Send Us a Message</h3>
            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <p className="text-green-400">Message sent successfully! We'll get back to you soon.</p>
              </div>
            )}
            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <p className="text-red-400">Failed to send message. Please try again.</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    First Name *
                  </label>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Last Name *
                  </label>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Email *
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Phone Number *
                </label>
                <Input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 234 567 8900"
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  I'm Interested In *
                </label>
                <select
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white"
                >
                  <option value="" className="bg-gray-900">Select a service</option>
                  <option value="tourist" className="bg-gray-900">Tourist Tours</option>
                  <option value="medical" className="bg-gray-900">Medical Tourism</option>
                  <option value="both" className="bg-gray-900">Both Services</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Message *
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your plans..."
                  rows={4}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-red-400" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Phone</div>
                    <div className="text-white">+90 123 456 789</div>
                    <div className="text-white">+90 987 654 321</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-red-400" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Email</div>
                    <div className="text-white">info@turkishelite.com</div>
                    <div className="text-white">medical@turkishelite.com</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-red-400" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Address</div>
                    <div className="text-white">
                      Taksim Square, Beyoğlu
                      <br />
                      Istanbul, Turkey 34437
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-red-400" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Business Hours</div>
                    <div className="text-white">
                      Monday - Friday: 9:00 AM - 6:00 PM
                      <br />
                      Saturday: 10:00 AM - 4:00 PM
                      <br />
                      Sunday: Closed
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-8">
              <h4 className="text-2xl text-white mb-3">24/7 Emergency Support</h4>
              <p className="text-red-100 mb-4">
                For medical emergencies or urgent travel assistance, our team is available around the clock.
              </p>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-red-700 bg-[rgb(57,31,31)]"
              >
                Emergency Hotline
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}