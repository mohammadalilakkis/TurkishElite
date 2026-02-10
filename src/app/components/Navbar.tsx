import { useState, useEffect } from "react";
import { Menu, X, Phone, User, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { LoginDialog } from "./LoginDialog";
import { RegisterDialog } from "./RegisterDialog";
import { authAPI } from "../../services/api";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setUser(authAPI.getCurrentUser());
  }, []);

  const handleBookNow = () => {
    const touristSection = document.getElementById('tourist');
    if (touristSection) {
      touristSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    authAPI.logout();
    setUser(null);
    window.location.href = '/';
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Tourist Tours", href: "#tourist" },
    { label: "Medical Tourism", href: "#medical" },
    { label: "Destinations", href: "#destinations" },
    { label: "About Us", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <h1
              className={`text-2xl tracking-tight transition-colors ${
                isScrolled ? "text-gray-900" : "text-white"
              }`}
            >
              <span className="font-serif italic">Turkish</span>
              <span className="text-red-600">Elite</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm tracking-wide hover:text-red-600 transition-colors ${
                  isScrolled ? "text-gray-700" : "text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-4 mr-4">
              <a
                href="tel:+90123456789"
                className={`flex items-center gap-2 text-sm ${
                  isScrolled ? "text-gray-700" : "text-white"
                }`}
              >
                <Phone className="h-4 w-4" />
                <span>+90 123 456 789</span>
              </a>
            </div>
            {user ? (
              <div className="flex items-center gap-2">
                {user.role === 'admin' && (
                  <Button
                    size="sm"
                    onClick={() => {
                      // #region agent log
                      fetch('http://127.0.0.1:7247/ingest/c98bc6f1-adbd-4a48-a39e-d406a746af6a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Navbar.tsx:113',message:'Admin button clicked',data:{user:user?.email,role:user?.role},timestamp:Date.now(),runId:'run1',hypothesisId:'A'})}).catch(()=>{});
                      // #endregion
                      window.location.href = '/admin';
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Admin
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleLogout}
                  className={isScrolled ? "border-gray-300 text-gray-700 hover:bg-gray-50" : "border-white text-white hover:bg-white/10"}
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowLogin(true)}
                  className={isScrolled ? "border-gray-300 text-gray-700 hover:bg-gray-50" : "border-white text-white hover:bg-white/10"}
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  onClick={() => setShowRegister(true)}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Register
                </Button>
              </>
            )}
            <Button
              size="sm"
              onClick={handleBookNow}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 ${
              isScrolled ? "text-gray-900" : "text-white"
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-6 py-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block py-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t space-y-3">
              <a
                href="tel:+90123456789"
                className="flex items-center gap-2 text-gray-700"
              >
                <Phone className="h-4 w-4" />
                <span>+90 123 456 789</span>
              </a>
              {user ? (
                <>
                  {user.role === 'admin' && (
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => { window.location.href = '/admin'; setIsMobileMenuOpen(false); }}
                    >
                      Admin Dashboard
                    </Button>
                  )}
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => { setShowLogin(true); setIsMobileMenuOpen(false); }}
                  >
                    Login
                  </Button>
                  <Button
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => { setShowRegister(true); setIsMobileMenuOpen(false); }}
                  >
                    Register
                  </Button>
                </>
              )}
              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                onClick={() => { handleBookNow(); setIsMobileMenuOpen(false); }}
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      )}

      <LoginDialog
        open={showLogin}
        onOpenChange={setShowLogin}
        onSuccess={() => {
          setUser(authAPI.getCurrentUser());
          setShowLogin(false);
        }}
      />
      <RegisterDialog
        open={showRegister}
        onOpenChange={setShowRegister}
        onSuccess={() => {
          setUser(authAPI.getCurrentUser());
          setShowRegister(false);
        }}
      />
    </nav>
  );
}