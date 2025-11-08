import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { LogIn, Loader2, CheckCircle2, User, Lock, X, Users, Home as HomeIcon, Warehouse, Tent, Phone, Table as TableIcon } from 'lucide-react';

// =================================================================
// 1. SELF-CONTAINED UI COMPONENTS (Replaced imports with native elements + styles)
// =================================================================

// --- Button Component Replacement (Tailwind styles only) ---
const Button = ({ children, className, disabled, ...props }) => (
    <button
        className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ${className}`}
        disabled={disabled}
        {...props}
    >
        {children}
    </button>
);

// --- Input Component Replacement (Tailwind styles only) ---
const Input = ({ className, type, ...props }) => (
    <input
        type={type}
        className={`flex h-10 w-full rounded-md border border-[#d4af37]/40 bg-[#1a1510]/50 px-3 py-2 text-sm ring-offset-[#1a1510] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#d4af37]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
    />
);

// --- Label Component Replacement (Tailwind styles only) ---
const Label = ({ children, className, ...props }) => (
    <label
        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
        {...props}
    >
        {children}
    </label>
);


// =================================================================
// 2. CONSTANTS (No TypeScript types needed)
// =================================================================

const TABLE_ENDPOINT = 'http://localhost:5000/restaurant/table';
const ADMIN_ENDPOINT = 'http://localhost:5000/admin'; 

const ADMIN_USERNAME = 'admin'; 
const ADMIN_PASSWORD = 'password'; 


// =================================================================
// 3. ADMIN DASHBOARD COMPONENT
// =================================================================

const AdminDashboard = () => {
    // State is used without explicit types in JSX
    const [bookedTables, setBookedTables] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [submittingId, setSubmittingId] = useState(null);

    // Fetch tables, then filter for booked ones
    const fetchBookedTables = useCallback(async () => {
        setIsLoading(true);
        setFetchError(null);
        try {
            const response = await fetch(TABLE_ENDPOINT, {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'fetch_tables_admin' }), 
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch table data. Status: ${response.status}`);
            }

            const data = await response.json();
            
            if (Array.isArray(data)) {
               // Filter for only booked tables and set state
               const booked = data.filter(table => table.isbook);
               setBookedTables(booked);
            } else {
               throw new Error('Backend returned invalid data format.');
            }

        } catch (error) {
            console.error('Error fetching tables:', error);
            setFetchError(error.message || 'Could not connect to the backend. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBookedTables();
    }, [fetchBookedTables]);
    
    // Function to mark a table booking as 'Done' (clearing the reservation)
    const handleMarkDone = async (tableId) => {
        setSubmittingId(tableId);
        setFetchError(null);
        
        try {
            const response = await fetch(ADMIN_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // CRITICAL: Send the table ID to the '/admin' endpoint
                body: JSON.stringify({ table_id: tableId, action: 'mark_done' }),
            });

            if (!response.ok) {
                throw new Error(`Failed to mark table ${tableId} as done. Server error.`);
            }

            // On successful marking, refresh the list of tables
            await response.json();
            fetchBookedTables();
            
        } catch (error) {
            console.error('Error marking table done:', error);
            setFetchError(error.message || `Failed to mark table ${tableId} as done.`);
        } finally {
            setSubmittingId(null);
        }
    };

    // --- Rendering Logic for Dashboard ---
    return (
        <motion.div
            className="max-w-6xl mx-auto py-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h1 className="font-serif text-5xl text-[#d4af37] text-center mb-10 tracking-wider">
                Admin Dashboard: Active Bookings
            </h1>
            
            {/* Loading / Error / Empty States */}
            {isLoading ? (
                <div className="text-center py-12 text-[#d4af37] flex flex-col items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin mb-4" />
                    <p>Fetching active bookings...</p>
                </div>
            ) : fetchError ? (
                <div className="text-center py-12 text-red-500">
                    <p className="mb-4 text-xl">Error: {fetchError}</p>
                    <Button onClick={fetchBookedTables} className="mt-4 bg-[#7d2948] hover:bg-[#a63f69] text-white">
                        Retry Fetching Tables
                    </Button>
                </div>
            ) : bookedTables.length === 0 ? (
                <div className="text-center py-12 bg-[#d4af37]/10 border border-[#d4af37]/40 rounded-xl text-[#d4af37]/70">
                    <CheckCircle2 className="w-8 h-8 mx-auto mb-4 text-[#d4af37]" />
                    <p className="text-lg">All tables are currently available. No active bookings.</p>
                </div>
            ) : (
                // Table Cards Grid
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {bookedTables.map((table) => (
                            <motion.div
                                key={table.table_id}
                                className="relative p-6 rounded-2xl border-2 border-[#d4af37] bg-gradient-to-br from-[#2e261d] to-[#1a1510] shadow-2xl shadow-[#d4af37]/30"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex justify-between items-start mb-4 border-b border-[#d4af37]/50 pb-2">
                                    <h2 className="font-serif text-3xl text-[#d4af37]">
                                        <TableIcon className="w-5 h-5 inline-block mr-2" />
                                        Table {table.table_id}
                                    </h2>
                                    <span className="text-sm px-3 py-1 bg-[#7d2948] font-bold text-white rounded-full">
                                        BOOKED
                                    </span>
                                </div>

                                <div className="space-y-3 text-[#f0c674] text-base">
                                    <p className="flex items-center gap-2">
                                        <Users className="w-4 h-4 text-[#d4af37]" />
                                        Seats: **{table.chair_no}**
                                    </p>
                                    <p className="flex items-center gap-2">
                                        {table.table_place === 'Indoor' ? <Warehouse className="w-4 h-4 text-[#d4af37]" /> : <Tent className="w-4 h-4 text-[#d4af37]" />}
                                        Location: **{table.table_place}**
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <HomeIcon className="w-4 h-4 text-[#d4af37]" />
                                        Seating: **{table.isfamily ? 'Family' : 'Standard'}**
                                    </p>
                                </div>
                                
                                <div className="mt-5 pt-4 border-t border-[#d4af37]/30">
                                    <h3 className="text-xl text-white mb-2 font-semibold">Customer Details</h3>
                                    <p className="flex items-center gap-2 text-sm text-[#d4af37]/80">
                                        <User className="w-4 h-4" />
                                        Name: **{table.user_name || 'N/A'}**
                                    </p>
                                    <p className="flex items-center gap-2 text-sm text-[#d4af37]/80">
                                        <Phone className="w-4 h-4" />
                                        Phone: **{table.user_phone || 'N/A'}**
                                    </p>
                                </div>

                                <Button
                                    onClick={() => handleMarkDone(table.table_id)}
                                    disabled={submittingId !== null}
                                    className="w-full mt-6 bg-gradient-to-r from-[#d4af37] to-[#b8860b] hover:from-[#f0c674] hover:to-[#d4af37] text-[#1a1510] font-bold"
                                >
                                    {submittingId === table.table_id ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Completing...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 className="w-4 h-4 mr-2" />
                                            Mark Booking Done
                                        </>
                                    )}
                                </Button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </motion.div>
    );
};


// =================================================================
// 4. MAIN ADMIN PAGE COMPONENT (Login Wrapper)
// =================================================================

/**
 * You should use this as the content for your 'src/pages/AdminPage.jsx' or 'src/App.jsx' file.
 */
export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    
    // Login Simulation
    const handleLogin = (e) => {
        e.preventDefault();
        setLoginError('');
        
        // Simulating authentication against defined constants
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
        } else if (username === 'test' && password === 'test') {
             // Quick local dev override
            setIsAuthenticated(true);
        } else {
            setLoginError('Invalid credentials. Try "admin/password" or "test/test".');
        }
    };

    // --- Rendering Logic for Login/Dashboard ---
    return (
        <div className="min-h-screen pt-24 pb-16 px-6 bg-gradient-to-b from-[#1a1510] via-[#221c14] to-[#1a1510] font-sans">
            <AnimatePresence mode="wait">
                {isAuthenticated ? (
                    // Render Dashboard if authenticated
                    <AdminDashboard key="dashboard" />
                ) : (
                    // Render Login form if not authenticated
                    <motion.div
                        key="login"
                        className="flex items-center justify-center min-h-[70vh]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                    >
                        <form 
                            onSubmit={handleLogin}
                            className="w-full max-w-sm p-8 rounded-xl border-2 border-[#d4af37]/50 shadow-2xl shadow-[#d4af37]/30 bg-gradient-to-br from-[#2e261d] to-[#1a1510]"
                        >
                            <h2 className="text-center font-serif text-3xl text-[#d4af37] mb-8 flex items-center justify-center gap-2">
                                <LogIn className="w-6 h-6" /> Admin Login
                            </h2>
                            
                            {/* Username Input */}
                            <div className="space-y-2 mb-4">
                                <Label htmlFor="username" className="text-[#d4af37]/80">Username</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#f0c674]" />
                                    <Input
                                        id="username"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        className="pl-10 text-[#d4af37]"
                                        placeholder="Enter username"
                                    />
                                </div>
                            </div>
                            
                            {/* Password Input */}
                            <div className="space-y-2 mb-6">
                                <Label htmlFor="password" className="text-[#d4af37]/80">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#f0c674]" />
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="pl-10 text-[#d4af37]"
                                        placeholder="Enter password"
                                    />
                                </div>
                            </div>
                            
                            {loginError && (
                                <p className="text-red-400 text-sm text-center mb-4">{loginError}</p>
                            )}
                            
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] hover:from-[#f0c674] hover:to-[#d4af37] text-[#1a1510] py-3 text-lg font-bold transition-all duration-300"
                            >
                                Log In
                            </Button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}