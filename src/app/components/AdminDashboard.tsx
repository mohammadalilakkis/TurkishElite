import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { 
  BarChart3, Users, Mail, Calendar, DollarSign, 
  Plus, Edit, Trash2, MapPin, Heart, X, Home 
} from "lucide-react";
import { analyticsAPI, citiesAPI, medicalOptionsAPI, contactsAPI, authAPI } from "../../services/api";
import { toast } from "sonner";

export function AdminDashboard() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [cities, setCities] = useState<any[]>([]);
  const [medicalOptions, setMedicalOptions] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCityDialog, setShowCityDialog] = useState(false);
  const [showMedicalDialog, setShowMedicalDialog] = useState(false);
  const [editingCity, setEditingCity] = useState<any>(null);
  const [editingMedical, setEditingMedical] = useState<any>(null);

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
      const [analyticsData, citiesData, medicalData, contactsData] = await Promise.all([
        analyticsAPI.getDashboard(),
        citiesAPI.getAll(),
        medicalOptionsAPI.getAll(),
        contactsAPI.getAll(),
      ]);
      // #region agent log
      fetch('http://127.0.0.1:7247/ingest/c98bc6f1-adbd-4a48-a39e-d406a746af6a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AdminDashboard.tsx:51',message:'Dashboard data loaded successfully',data:{hasAnalytics:!!analyticsData},timestamp:Date.now(),runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      setAnalytics(analyticsData);
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
        ...medicalForm,
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
      setMedicalForm({ title: "", description: "", icon: "Heart", features: "" });
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

        {/* Cities Management */}
        <Card className="p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <MapPin className="h-6 w-6" />
              Cities & Places
            </h2>
            <Button onClick={() => { setEditingCity(null); setCityForm({ name: "", description: "", image: "", highlights: "" }); setShowCityDialog(true); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add City
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cities.map((city) => (
              <Card key={city._id} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{city.name}</h3>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingCity(city);
                        setCityForm({
                          name: city.name,
                          description: city.description,
                          image: city.image,
                          highlights: city.highlights?.join(', ') || '',
                        });
                        setShowCityDialog(true);
                      }}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteCity(city._id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{city.description}</p>
              </Card>
            ))}
          </div>
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

        {/* Medical Options Management */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Heart className="h-6 w-6" />
              Medical Options
            </h2>
            <Button onClick={() => { setEditingMedical(null); setMedicalForm({ title: "", description: "", icon: "Heart", features: "" }); setShowMedicalDialog(true); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Option
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {medicalOptions.map((option) => (
              <Card key={option._id} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{option.title}</h3>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingMedical(option);
                        setMedicalForm({
                          title: option.title,
                          description: option.description,
                          icon: option.icon || "Heart",
                          features: option.features?.join(', ') || '',
                        });
                        setShowMedicalDialog(true);
                      }}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteMedical(option._id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{option.description}</p>
              </Card>
            ))}
          </div>
        </Card>

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
