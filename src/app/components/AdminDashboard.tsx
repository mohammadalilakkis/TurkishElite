import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { 
  BarChart3, Users, Mail, Calendar, DollarSign, 
  Plus, Edit, Trash2, MapPin, Heart, X, Home, Clock, Star 
} from "lucide-react";
import { analyticsAPI, citiesAPI, medicalOptionsAPI, contactsAPI, toursAPI, bookingsAPI, authAPI } from "../../services/api";
import { toast } from "sonner";

export function AdminDashboard() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [tours, setTours] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [medicalOptions, setMedicalOptions] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTourDialog, setShowTourDialog] = useState(false);
  const [showCityDialog, setShowCityDialog] = useState(false);
  const [showMedicalDialog, setShowMedicalDialog] = useState(false);
  const [editingTour, setEditingTour] = useState<any>(null);
  const [editingCity, setEditingCity] = useState<any>(null);
  const [editingMedical, setEditingMedical] = useState<any>(null);

  const [tourForm, setTourForm] = useState({
    title: "",
    description: "",
    image: "",
    duration: "",
    groupSize: "",
    rating: "4.5",
    price: "",
    category: "tourist",
  });

  const [cityForm, setCityForm] = useState({
    name: "",
    description: "",
    image: "",
    highlights: "",
  });

  const [medicalForm, setMedicalForm] = useState({
    title: "",
    description: "",
    icon: "Heart",
    image: "",
    features: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      // #region agent log
      fetch('http://127.0.0.1:7247/ingest/c98bc6f1-adbd-4a48-a39e-d406a746af6a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AdminDashboard.tsx:43',message:'Loading dashboard data',data:{hasToken:!!localStorage.getItem('token')},timestamp:Date.now(),runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      const [analyticsData, bookingsData, toursData, citiesData, medicalData, contactsData] = await Promise.all([
        analyticsAPI.getDashboard(),
        bookingsAPI.getAll(),
        toursAPI.getAll(),
        citiesAPI.getAll(),
        medicalOptionsAPI.getAll(),
        contactsAPI.getAll(),
      ]);
      // #region agent log
      fetch('http://127.0.0.1:7247/ingest/c98bc6f1-adbd-4a48-a39e-d406a746af6a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AdminDashboard.tsx:51',message:'Dashboard data loaded successfully',data:{hasAnalytics:!!analyticsData},timestamp:Date.now(),runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      setAnalytics(analyticsData);
      setBookings(Array.isArray(bookingsData) ? bookingsData : []);
      setTours(Array.isArray(toursData) ? toursData : []);
      setCities(citiesData);
      setMedicalOptions(medicalData);
      setContacts(Array.isArray(contactsData) ? contactsData : []);
    } catch (error: any) {
      // #region agent log
      fetch('http://127.0.0.1:7247/ingest/c98bc6f1-adbd-4a48-a39e-d406a746af6a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AdminDashboard.tsx:55',message:'Dashboard load error',data:{error:error?.message,status:error?.response?.status,statusText:error?.response?.statusText},timestamp:Date.now(),runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleTourSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        ...tourForm,
        rating: parseFloat(tourForm.rating) || 4.5,
        price: parseFloat(tourForm.price) || 0,
        isActive: true, // Ensure new tours show on home page
      };
      if (editingTour) {
        await toursAPI.update(editingTour._id, data);
        toast.success("Tour updated successfully");
      } else {
        await toursAPI.create(data);
        toast.success("Tour added successfully");
      }
      setShowTourDialog(false);
      setEditingTour(null);
      setTourForm({ title: "", description: "", image: "", duration: "", groupSize: "", rating: "4.5", price: "", category: "tourist" });
      loadData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save tour");
    }
  };

  const handleAcceptBooking = async (id: string) => {
    try {
      await bookingsAPI.updateStatus(id, 'confirmed');
      toast.success("Booking accepted");
      loadData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to accept booking");
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    try {
      await bookingsAPI.delete(id);
      toast.success("Booking deleted");
      loadData();
    } catch (error: any) {
      toast.error("Failed to delete booking");
    }
  };

  const handleDeleteTour = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tour?")) return;
    try {
      await toursAPI.delete(id);
      toast.success("Tour deleted successfully");
      loadData();
    } catch (error: any) {
      toast.error("Failed to delete tour");
    }
  };

  const handleCitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const highlights = cityForm.highlights.split(',').map(h => h.trim()).filter(h => h);
      const data = {
        ...cityForm,
        highlights,
      };

      if (editingCity) {
        await citiesAPI.update(editingCity._id, data);
        toast.success("City updated successfully");
      } else {
        await citiesAPI.create(data);
        toast.success("City added successfully");
      }
      setShowCityDialog(false);
      setEditingCity(null);
      setCityForm({ name: "", description: "", image: "", highlights: "" });
      loadData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save city");
    }
  };

  const handleMedicalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const features = medicalForm.features.split(',').map(f => f.trim()).filter(f => f);
      const data = {
        title: medicalForm.title,
        description: medicalForm.description,
        icon: medicalForm.icon,
        image: medicalForm.image || '',
        features,
      };

      if (editingMedical) {
        await medicalOptionsAPI.update(editingMedical._id, data);
        toast.success("Medical option updated successfully");
      } else {
        await medicalOptionsAPI.create(data);
        toast.success("Medical option added successfully");
      }
      setShowMedicalDialog(false);
      setEditingMedical(null);
      setMedicalForm({ title: "", description: "", icon: "Heart", image: "", features: "" });
      loadData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save medical option");
    }
  };

  const handleDeleteCity = async (id: string) => {
    if (!confirm("Are you sure you want to delete this city?")) return;
    try {
      await citiesAPI.delete(id);
      toast.success("City deleted successfully");
      loadData();
    } catch (error: any) {
      toast.error("Failed to delete city");
    }
  };

  const handleDeleteMedical = async (id: string) => {
    if (!confirm("Are you sure you want to delete this medical option?")) return;
    try {
      await medicalOptionsAPI.delete(id);
      toast.success("Medical option deleted successfully");
      loadData();
    } catch (error: any) {
      toast.error("Failed to delete medical option");
    }
  };

  const handleLogout = () => {
    authAPI.logout();
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Home
            </Button>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>

        {/* Analytics Overview */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-3xl font-bold text-gray-900">{analytics.overview.totalBookings}</p>
                </div>
                <Calendar className="h-8 w-8 text-red-600" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Contacts</p>
                  <p className="text-3xl font-bold text-gray-900">{analytics.overview.totalContacts}</p>
                </div>
                <Mail className="h-8 w-8 text-emerald-600" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Bookings</p>
                  <p className="text-3xl font-bold text-gray-900">{analytics.overview.pendingBookings}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">${analytics.overview.totalRevenue?.toLocaleString() || 0}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </Card>
          </div>
        )}

        {/* Bookings Management */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-6">
            <Calendar className="h-6 w-6" />
            Bookings
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Accept pending bookings or delete them. Accepted bookings will appear as confirmed in analytics.
          </p>
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {bookings.length === 0 ? (
              <p className="text-gray-500 py-8 text-center">No bookings yet.</p>
            ) : (
              bookings.map((b: any) => (
                <Card key={b._id} className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900">
                        {b.tourId?.title || 'Unknown Tour'} · {b.firstName} {b.lastName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {b.email} · {b.phone}
                      </p>
                      <p className="text-sm text-gray-500">
                        {b.numberOfGuests} guest{b.numberOfGuests !== 1 ? 's' : ''} · {b.startDate ? new Date(b.startDate).toLocaleDateString() : ''} – {b.endDate ? new Date(b.endDate).toLocaleDateString() : ''}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                          b.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                          b.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          b.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {b.status}
                        </span>
                        <span className="font-semibold text-red-600">${Number(b.totalPrice || 0).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {b.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => handleAcceptBooking(b._id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Accept
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteBooking(b._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </Card>

        {/* Tours Management - Same card UI as Curated Luxury Tours */}
        <Card className="p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Star className="h-6 w-6" />
              Curated Luxury Tours
            </h2>
            <Button onClick={() => { setEditingTour(null); setTourForm({ title: "", description: "", image: "", duration: "", groupSize: "", rating: "4.5", price: "", category: "tourist" }); setShowTourDialog(true); }} className="bg-red-600 hover:bg-red-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Tour
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <Card key={tour._id} className="overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img src={tour.image} alt={tour.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1">
                    <Star className="h-4 w-4 fill-red-500 text-red-500" />
                    <span className="text-sm">{tour.rating}</span>
                  </div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Button size="sm" variant="secondary" className="bg-white/95" onClick={() => { setEditingTour(tour); setTourForm({ title: tour.title, description: tour.description, image: tour.image, duration: tour.duration, groupSize: tour.groupSize, rating: String(tour.rating ?? 4.5), price: String(tour.price ?? 0), category: tour.category || "tourist" }); setShowTourDialog(true); }}>
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="destructive" className="bg-red-500/95 text-white" onClick={() => handleDeleteTour(tour._id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl text-gray-900 mb-3">{tour.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{tour.description}</p>
                  <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1"><Clock className="h-4 w-4" /><span>{tour.duration}</span></div>
                    <div className="flex items-center gap-1"><Users className="h-4 w-4" /><span>{tour.groupSize}</span></div>
                  </div>
                  <div className="text-2xl text-red-600">${Number(tour.price || 0).toLocaleString()}</div>
                </div>
              </Card>
            ))}
          </div>
          {tours.length === 0 && <p className="text-gray-500 py-8 text-center">No tours yet. Add tours to display under Curated Luxury Tours.</p>}
        </Card>

        {/* Cities & Places - Same tour-style card UI */}
        <Card className="p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <MapPin className="h-6 w-6" />
              Cities & Places
            </h2>
            <Button onClick={() => { setEditingCity(null); setCityForm({ name: "", description: "", image: "", highlights: "" }); setShowCityDialog(true); }} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Place
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cities.map((city) => (
              <Card key={city._id} className="overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm">Place</div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Button size="sm" variant="secondary" className="bg-white/95" onClick={() => { setEditingCity(city); setCityForm({ name: city.name, description: city.description, image: city.image, highlights: city.highlights?.join(', ') || '' }); setShowCityDialog(true); }}>
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="destructive" className="bg-red-500/95 text-white" onClick={() => handleDeleteCity(city._id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl text-gray-900 mb-3">{city.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{city.description}</p>
                  {city.highlights?.length ? (
                    <p className="text-sm text-gray-500">{Array.isArray(city.highlights) ? city.highlights.join(" • ") : city.highlights}</p>
                  ) : null}
                </div>
              </Card>
            ))}
          </div>
          {cities.length === 0 && <p className="text-gray-500 py-8 text-center">No places yet. Add cities to display in Explore Turkey&apos;s Wonders.</p>}
        </Card>

        {/* Contact Inquiries (from Contact Us form) */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-6">
            <Mail className="h-6 w-6" />
            Contact Inquiries
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Messages submitted via the site&apos;s &quot;Contact Us&quot; section are stored here. Reply to users via their email.
          </p>
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {contacts.length === 0 ? (
              <p className="text-gray-500 py-4">No contact inquiries yet.</p>
            ) : (
              contacts.map((c: any) => (
                <Card key={c._id} className="p-4">
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-900">
                        {c.firstName} {c.lastName}
                      </p>
                      <p className="text-sm text-gray-600">
                        <a href={`mailto:${c.email}`} className="text-emerald-600 hover:underline">{c.email}</a>
                        {c.phone && ` · ${c.phone}`}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Interest: {c.interest} · {c.status} · {c.createdAt ? new Date(c.createdAt).toLocaleString() : ''}
                      </p>
                      <p className="text-sm text-gray-700 mt-2">{c.message}</p>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </Card>

        {/* Medical Options - Same tour-style card UI */}
        <Card className="p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Heart className="h-6 w-6" />
              Medical Options
            </h2>
            <Button onClick={() => { setEditingMedical(null); setMedicalForm({ title: "", description: "", icon: "Heart", image: "", features: "" }); setShowMedicalDialog(true); }} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Option
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {medicalOptions.map((option) => (
              <Card key={option._id} className="overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
                <div className="relative h-64 overflow-hidden bg-emerald-100">
                  {option.image ? (
                    <img src={option.image} alt={option.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-200 to-teal-200">
                      <Heart className="h-24 w-24 text-emerald-600/60" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm">Medical</div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Button size="sm" variant="secondary" className="bg-white/95" onClick={() => { setEditingMedical(option); setMedicalForm({ title: option.title, description: option.description, icon: option.icon || "Heart", image: option.image || "", features: option.features?.join(', ') || '' }); setShowMedicalDialog(true); }}>
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="destructive" className="bg-red-500/95 text-white" onClick={() => handleDeleteMedical(option._id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl text-gray-900 mb-3">{option.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{option.description}</p>
                  {option.features?.length ? (
                    <p className="text-sm text-gray-500">{Array.isArray(option.features) ? option.features.slice(0, 3).join(" • ") : option.features}</p>
                  ) : null}
                </div>
              </Card>
            ))}
          </div>
          {medicalOptions.length === 0 && <p className="text-gray-500 py-8 text-center">No medical options yet. Add options to display in World-Class Medical Tourism.</p>}
        </Card>

        {/* Tour Dialog */}
        <Dialog open={showTourDialog} onOpenChange={setShowTourDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingTour ? 'Edit Tour' : 'Add New Tour'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleTourSubmit} className="space-y-4 mt-4">
              <div>
                <Label htmlFor="tourTitle">Title *</Label>
                <Input id="tourTitle" value={tourForm.title} onChange={(e) => setTourForm({ ...tourForm, title: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="tourDescription">Description *</Label>
                <Textarea id="tourDescription" value={tourForm.description} onChange={(e) => setTourForm({ ...tourForm, description: e.target.value })} required rows={4} />
              </div>
              <div>
                <Label htmlFor="tourImage">Image URL *</Label>
                <Input id="tourImage" value={tourForm.image} onChange={(e) => setTourForm({ ...tourForm, image: e.target.value })} required placeholder="https://..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tourDuration">Duration *</Label>
                  <Input id="tourDuration" value={tourForm.duration} onChange={(e) => setTourForm({ ...tourForm, duration: e.target.value })} required placeholder="5 Days" />
                </div>
                <div>
                  <Label htmlFor="tourGroupSize">Group Size *</Label>
                  <Input id="tourGroupSize" value={tourForm.groupSize} onChange={(e) => setTourForm({ ...tourForm, groupSize: e.target.value })} required placeholder="Max 12" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tourRating">Rating</Label>
                  <Input id="tourRating" type="number" step="0.1" min="0" max="5" value={tourForm.rating} onChange={(e) => setTourForm({ ...tourForm, rating: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="tourPrice">Price *</Label>
                  <Input id="tourPrice" type="number" value={tourForm.price} onChange={(e) => setTourForm({ ...tourForm, price: e.target.value })} required placeholder="1299" />
                </div>
              </div>
              <div>
                <Label htmlFor="tourCategory">Category</Label>
                <select id="tourCategory" value={tourForm.category} onChange={(e) => setTourForm({ ...tourForm, category: e.target.value })} className="w-full border rounded-md px-3 py-2">
                  <option value="tourist">Tourist</option>
                  <option value="medical">Medical</option>
                  <option value="both">Both</option>
                </select>
              </div>
              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => setShowTourDialog(false)} className="flex-1">Cancel</Button>
                <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white">{editingTour ? 'Update' : 'Create'}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* City Dialog */}
        <Dialog open={showCityDialog} onOpenChange={setShowCityDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingCity ? 'Edit City' : 'Add New City'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCitySubmit} className="space-y-4 mt-4">
              <div>
                <Label htmlFor="cityName">Name *</Label>
                <Input
                  id="cityName"
                  value={cityForm.name}
                  onChange={(e) => setCityForm({ ...cityForm, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="cityDescription">Description *</Label>
                <Textarea
                  id="cityDescription"
                  value={cityForm.description}
                  onChange={(e) => setCityForm({ ...cityForm, description: e.target.value })}
                  required
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="cityImage">Image URL *</Label>
                <Input
                  id="cityImage"
                  value={cityForm.image}
                  onChange={(e) => setCityForm({ ...cityForm, image: e.target.value })}
                  required
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label htmlFor="cityHighlights">Highlights (comma-separated)</Label>
                <Input
                  id="cityHighlights"
                  value={cityForm.highlights}
                  onChange={(e) => setCityForm({ ...cityForm, highlights: e.target.value })}
                  placeholder="Beach, Mountains, History"
                />
              </div>
              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => setShowCityDialog(false)} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                  {editingCity ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Medical Option Dialog */}
        <Dialog open={showMedicalDialog} onOpenChange={setShowMedicalDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingMedical ? 'Edit Medical Option' : 'Add New Medical Option'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleMedicalSubmit} className="space-y-4 mt-4">
              <div>
                <Label htmlFor="medicalTitle">Title *</Label>
                <Input
                  id="medicalTitle"
                  value={medicalForm.title}
                  onChange={(e) => setMedicalForm({ ...medicalForm, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="medicalDescription">Description *</Label>
                <Textarea
                  id="medicalDescription"
                  value={medicalForm.description}
                  onChange={(e) => setMedicalForm({ ...medicalForm, description: e.target.value })}
                  required
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="medicalImage">Image URL (optional)</Label>
                <Input
                  id="medicalImage"
                  value={medicalForm.image}
                  onChange={(e) => setMedicalForm({ ...medicalForm, image: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label htmlFor="medicalIcon">Icon Name</Label>
                <Input
                  id="medicalIcon"
                  value={medicalForm.icon}
                  onChange={(e) => setMedicalForm({ ...medicalForm, icon: e.target.value })}
                  placeholder="Heart, Smile, Eye, etc."
                />
              </div>
              <div>
                <Label htmlFor="medicalFeatures">Features (comma-separated)</Label>
                <Input
                  id="medicalFeatures"
                  value={medicalForm.features}
                  onChange={(e) => setMedicalForm({ ...medicalForm, features: e.target.value })}
                  placeholder="Feature 1, Feature 2, Feature 3"
                />
              </div>
              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => setShowMedicalDialog(false)} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                  {editingMedical ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
