import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from './ui/dialog'; // 👈 Added DialogClose
import { Input } from './ui/input';
import { Clock, Users, ShieldCheck, AirVent, Home as HomeIcon, CheckCircle2, Loader2, Warehouse, Tent, X } from 'lucide-react'; // 👈 Added X for close button
import { ImageWithFallback } from './figma/ImageWithFallback'; 

// --- UPDATED Table Interface (Corrected table_place capitalization) ---
interface Table {
  table_id: number;
  table_place: 'Indoor' | 'Outdoor'; // Corrected: Must match backend 'Indoor'/'Outdoor'
  isac: boolean; // AC status
  chair_no: number; // Number of chairs/seats
  isbook: boolean; // Booked status
  isfamily: boolean; // Family seating status
}

const TABLE_ENDPOINT = 'https://royal-restaurant-lanx.onrender.com/restaurant/table';
const BOOKING_ENDPOINT = 'https://royal-restaurant-lanx.onrender.com/booking';

export default function BookingPage() {
  const [tables, setTables] = useState<Table[]>([]);
  const [filterAC, setFilterAC] = useState(false);
  const [filterFamily, setFilterFamily] = useState(false);
  const [selectedTables, setSelectedTables] = useState<number[]>([]); 
  const [dialogOpen, setDialogOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '' });

  // 1. Corrected Logic to fetch table data on page load
  const fetchTables = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const response = await fetch(TABLE_ENDPOINT, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        // Sending an empty body or any necessary token/data
        body: JSON.stringify({ action: 'fetch_tables' }), 
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch table data. Status: ${response.status}`);
      }

      // --- CRITICAL FIX: Expecting an array directly, not { table: [] } ---
      const data: Table[] = await response.json();
      
      // Ensure the received data is an array before setting the state
      if (Array.isArray(data)) {
         setTables(data as Table[]);
      } else {
         throw new Error('Backend returned invalid data format.');
      }

    } catch (error: any) {
      console.error('Error fetching tables:', error);
      setFetchError(error.message || 'Could not connect to the backend. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTables();
  }, [fetchTables]);

  // Apply filters to tables
  const filteredTables = tables.filter((table) => {
    if (filterAC && !table.isac) return false;
    if (filterFamily && !table.isfamily) return false;
    return true;
  });

  // Logic to handle table selection (user_table logic)
  const handleTableSelect = (tableId: number, isBooked: boolean) => {
    // Cannot select a booked table
    if (isBooked) return; 
    
    // Toggle selection
    if (selectedTables.includes(tableId)) {
      setSelectedTables(selectedTables.filter((id) => id !== tableId));
    } else {
      // Limit selection to 3 tables
      if (selectedTables.length < 3) {
        setSelectedTables([...selectedTables, tableId]);
      }
    }
  };

  const handleBookNow = () => {
    if (selectedTables.length === 0) return;
    setDialogOpen(true);
  };
  
  // Logic to close dialog and reset error state
  const handleCloseDialog = () => {
      setDialogOpen(false);
      setFetchError(null);
  };

  // Logic to send selected tables data to /booking endpoint
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooking(true);
    setFetchError(null);

    const bookingPayload = {
      user_name: formData.name,
      user_phone: formData.phone,
      selected_tables: selectedTables, 
    };

    try {
      const response = await fetch(BOOKING_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingPayload),
      });

      if (!response.ok) {
        throw new Error('Booking failed. The tables might have just been booked or the server rejected the request.');
      }
      
      setBookingSuccess(true);
      
      // Wait a moment for success message, then close dialog and refetch data
      setTimeout(() => {
        setDialogOpen(false);
        setBookingSuccess(false);
        setSelectedTables([]);
        setFormData({ name: '', phone: '' });
        fetchTables(); // Re-fetch the table data to see the new booked status
      }, 2000);

    } catch (error: any) {
      console.error('Error during booking:', error);
      setFetchError(error.message || 'An unexpected error occurred during booking.');
    } finally {
      setIsBooking(false);
    }
  };

  const benefits = [
    { 
      text: 'Avoid Rush and Crowds', 
      icon: Users,
      image: 'https://images.unsplash.com/photo-1752135546734-eab9b242a6cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwY3Jvd2QlMjBidXN5fGVufDF8fHx8MTc2MjAwNTYwM3ww&lib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      text: 'Get Service on Time', 
      icon: Clock,
      image: 'https://images.unsplash.com/photo-1759340875454-fd1f73397afe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxsdXh1cnklMjBzZXJ2aWNlJTIwd2FpdGVyfGVufDF8fHx8MTc2MjAwNTYwM3ww&lib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      text: 'Time Is Precious — Especially When We Eat', 
      icon: ShieldCheck,
      image: 'https://images.unsplash.com/photo-1522508803948-2066cc072865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjbG9jayUyMHRpbWUlMjBwcmVjaXNpb258ZW58MXx8fHwxNzYyMDA1NTM5fDA&lib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 bg-gradient-to-b from-[#1a1510] via-[#221c14] to-[#1a1510]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif text-[#d4af37] mb-8">
            Book Your Happy Moment with Our Delicious Food
          </h1>
          {/* Benefit Cards (No change) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  className="relative group overflow-hidden rounded-2xl shadow-2xl border-2 border-[#d4af37]/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <ImageWithFallback
                      src={benefit.image}
                      alt={benefit.text}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1510]/95 via-[#1a1510]/80 to-[#1a1510]/70" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-6 flex items-center gap-3 min-h-[140px]">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#b8860b] rounded-full flex items-center justify-center flex-shrink-0 shadow-xl shadow-[#d4af37]/50">
                      <Icon className="w-6 h-6 text-[#1a1510]" />
                    </div>
                    <p className="text-[#d4af37]">{benefit.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Filter Toggles (No change) */}
        <motion.div
          className="bg-gradient-to-br from-[#1a1510]/90 to-[#0f1729]/90 border-2 border-[#d4af37]/40 rounded-2xl p-6 mb-8 shadow-2xl shadow-[#d4af37]/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-wrap gap-6 items-center justify-center">
            <div className="flex items-center gap-3">
              <Switch
                id="ac-filter"
                checked={filterAC}
                onCheckedChange={setFilterAC}
              />
              <Label htmlFor="ac-filter" className="flex items-center gap-2 cursor-pointer text-[#d4af37]">
                <AirVent className="w-4 h-4 text-[#f0c674]" />
                AC Only
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                id="family-filter"
                checked={filterFamily}
                onCheckedChange={setFilterFamily}
              />
              <Label htmlFor="family-filter" className="flex items-center gap-2 cursor-pointer text-[#d4af37]">
                <HomeIcon className="w-4 h-4 text-[#f0c674]" />
                Family Seating
              </Label>
            </div>
          </div>
        </motion.div>

        {/* Table Selection with backend data */}
        <motion.div
          className="bg-gradient-to-br from-[#1a1510]/90 to-[#0f1729]/90 border-2 border-[#d4af37]/40 rounded-2xl p-8 shadow-2xl shadow-[#d4af37]/20 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="font-serif text-[#d4af37] mb-6">Select Your Table (Up to 3)</h2>

          {/* Loading and Error States */}
          {isLoading ? (
            <div className="text-center py-12 text-[#d4af37] flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin mb-4" />
              <p>Fetching available tables...</p>
            </div>
          ) : fetchError ? (
            <div className="text-center py-12 text-red-500">
              <p className="mb-4">Error: {fetchError}</p>
              <Button onClick={fetchTables} className="mt-4 bg-[#7d2948] hover:bg-[#a63f69]">
                Retry Fetching Tables
              </Button>
            </div>
          ) : filteredTables.length === 0 ? (
            <div className="text-center py-12 text-[#d4af37]/70">
              <p>No tables found matching the current filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredTables.map((table) => {
                  const isSelected = selectedTables.includes(table.table_id);
                  const isAvailable = !table.isbook; 

                  return (
                    <motion.button
                      key={table.table_id}
                      onClick={() => handleTableSelect(table.table_id, !isAvailable)}
                      disabled={!isAvailable}
                      className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                        !isAvailable
                          ? 'bg-[#5c1a33]/20 border-[#7d2948]/40 cursor-not-allowed opacity-40'
                          : isSelected
                            ? 'bg-gradient-to-br from-[#d4af37] to-[#b8860b] border-[#d4af37] shadow-2xl shadow-[#d4af37]/50'
                            // IMPROVED HOVER: Ensure text is visible even with the hover effect
                            : 'bg-[#1a1510]/50 border-[#d4af37]/40 hover:bg-[#2e261d] hover:border-[#d4af37] hover:shadow-xl hover:shadow-[#d4af37]/30'
                      }`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={isAvailable ? { scale: 1.05 } : {}}
                      whileTap={isAvailable ? { scale: 0.95 } : {}}
                    >
                      <div className="flex flex-col gap-2">
                        <div className={`flex items-center justify-between ${isSelected ? 'text-[#1a1510]' : 'text-[#d4af37]'}`}>
                          <span className="font-serif">Table {table.table_id}</span>
                          {isSelected && <CheckCircle2 className="w-5 h-5" />}
                        </div>
                        <div className={`text-sm ${isSelected ? 'text-[#1a1510]' : 'text-[#d4af37]/70'}`}>
                          {table.chair_no} Seats
                        </div>
                        
                        {/* Location Indicator (Indoor/Outdoor) */}
                        <div className={`flex items-center gap-1 text-xs ${isSelected ? 'text-[#1a1510]' : 'text-[#f0c674]'}`}>
                            {/* CRITICAL FIX: Checking against 'Indoor' or 'Outdoor' (uppercase) */}
                            {table.table_place === 'Indoor' ? (
                                <Warehouse className="w-4 h-4" />
                            ) : (
                                <Tent className="w-4 h-4" />
                            )}
                            {table.table_place}
                        </div>

                        <div className="flex gap-2 mt-2">
                          {/* Display isac (AC) */}
                          {table.isac && (
                            <span className={`text-xs px-2 py-1 rounded-full ${isSelected ? 'bg-[#1a1510]/30 text-[#1a1510]' : 'bg-[#d4af37]/20 text-[#d4af37]'}`}>
                              AC
                            </span>
                          )}
                          {/* Display isfamily (Family) */}
                          {table.isfamily && (
                            <span className={`text-xs px-2 py-1 rounded-full ${isSelected ? 'bg-[#1a1510]/30 text-[#1a1510]' : 'bg-[#d4af37]/20 text-[#d4af37]'}`}>
                              Family
                            </span>
                          )}
                        </div>
                        <div className={`text-xs mt-1 ${
                          !isAvailable 
                            ? 'text-[#7d2948]' 
                            : isSelected 
                              ? 'text-[#1a1510]' 
                              : 'text-[#f0c674]'
                        }`}>
                          {isAvailable ? 'Available' : 'Booked'}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>
          )}

          {selectedTables.length > 0 && (
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-[#d4af37] mb-4">
                Selected {selectedTables.length} table(s): **{selectedTables.join(', ')}**
              </p>
              <Button
                onClick={handleBookNow}
                disabled={selectedTables.length === 0}
                className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] hover:from-[#f0c674] hover:to-[#d4af37] text-[#1a1510] px-8 py-6 rounded-full transition-all duration-300 hover:scale-105 shadow-2xl shadow-[#d4af37]/50"
              >
                Book Now
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {/* ADDED: Centering via 'sm:max-w-md' and adjusting positioning */}
        <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-[#1a1510] to-[#0f1729] border-2 border-[#d4af37]/40 text-[#d4af37] rounded-xl p-6 sm:max-w-md"> 
          <DialogHeader>
            <DialogTitle className="font-serif text-[#d4af37]">Complete Your Booking</DialogTitle>
            <DialogDescription className="text-[#d4af37]/60">
              Please provide your details to confirm the reservation.
            </DialogDescription>
          </DialogHeader>
          
          {/* ADDED: Explicit Close Button */}
          <DialogClose asChild>
            <Button 
                variant="ghost" 
                className="absolute top-4 right-4 text-[#d4af37]/80 hover:text-[#d4af37] p-1 h-auto"
                onClick={handleCloseDialog}
            >
                <X className="w-5 h-5" />
                <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
          
          {!bookingSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              {/* Name Input */}
              <div>
                <Label htmlFor="name" className="text-[#d4af37]">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-[#1a1510]/50 border-[#d4af37]/40 mt-2 text-[#d4af37] placeholder:text-[#d4af37]/40"
                  placeholder="Enter your name"
                />
              </div>
              {/* Phone Input - IMPROVED for simple number input */}
              <div>
                <Label htmlFor="phone" className="text-[#d4af37]">Phone Number (10 digits)</Label>
                <Input
                  id="phone"
                  type="text" // Use text for easier pattern control
                  value={formData.phone}
                  onChange={(e) => {
                      // Simple client-side validation for digits only
                      const value = e.target.value.replace(/\D/g, ''); 
                      setFormData({ ...formData, phone: value });
                  }}
                  required
                  maxLength={10} // Enforce a max length
                  pattern="\d{10}" // Simple 10-digit number pattern
                  title="Phone number must be exactly 10 digits."
                  className="bg-[#1a1510]/50 border-[#d4af37]/40 mt-2 text-[#d4af37] placeholder:text-[#d4af37]/40"
                  placeholder="e.g., 9876543210"
                />
              </div>
              {/* Selected Tables Summary */}
              <div className="bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-lg p-3">
                <p className="text-sm text-[#d4af37]">
                  Selected Tables: **{selectedTables.join(', ')}**
                </p>
              </div>
              {/* Error Message */}
              {fetchError && (
                <p className="text-red-500 text-sm text-center">{fetchError}</p>
              )}
              {/* Submit Button */}
              <Button 
                type="submit"
                disabled={isBooking}
                className="w-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] hover:from-[#f0c674] hover:to-[#d4af37] text-[#1a1510]"
              >
                {isBooking ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  'Confirm Booking'
                )}
              </Button>
            </form>
          ) : (
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <CheckCircle2 className="w-16 h-16 text-[#d4af37] mx-auto mb-4" />
              <h3 className="font-serif text-[#d4af37] mb-2">Booking Confirmed!</h3>
              <p className="text-[#d4af37]/70">We look forward to serving you.</p>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}