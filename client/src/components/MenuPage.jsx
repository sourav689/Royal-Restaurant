import React, { useState, useEffect } from "react";
import {
  UtensilsCrossed,
  Leaf, // For Vegetarian
  Egg, // For Non-Vegetarian (Using Egg icon as a common substitute for non-veg)
  ShoppingCart,
  PlusCircle,
  Trash2, // New icon for removing items
  MinusCircle, // New icon for decreasing quantity
  PlusCircle as PlusCircleIcon // Renamed to avoid conflict with icon inside ItemDetailModal
} from "lucide-react";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import LocalDiningRoundedIcon from '@mui/icons-material/LocalDiningRounded';
import LocalBarRoundedIcon from '@mui/icons-material/LocalBarRounded';
// --- Configuration ---
const BACKEND_ENDPOINT = 'http://localhost:5000/restaurant/menu';
// Mapping backend category names to your existing structure categories
const CATEGORY_MAP = {
    'Starter': 'Starters & Snacks', 
    'Beverage': 'Beverages',         
    // Add more mappings if your backend introduces new categories
};

// --- Utility Components ---

// Veg/Non-Veg Indicator
const VegIndicator = ({ isVeg }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "20px",
      height: "20px",
      borderRadius: "2px",
      border: `2px solid ${isVeg ? "#22c55e" : "#ef4444"}`,
      backgroundColor: isVeg ? "#dcfce7" : "#fee2e2",
    }}
  >
    <div
      style={{
        width: "8px",
        height: "8px",
        borderRadius: "1px",
        backgroundColor: isVeg ? "#22c55e" : "#ef4444",
      }}
    />
  </div>
);

// Item Detail Modal
const ItemDetailModal = ({ item, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  if (!item) return null;

  const handleAddToCart = () => {
    onAddToCart(item, quantity);
    onClose();
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: "0",
        zIndex: "50",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          display: "flex",
          flexDirection: window.innerWidth >= 768 ? "row" : "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "56rem",
          gap: "2rem",
          padding: window.innerWidth >= 768 ? "2.5rem" : "1.5rem",
          backgroundColor: "#1a1510",
          borderRadius: "1rem",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            color: "white",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "0.5rem",
            fontSize: "1.75rem",
            zIndex: "10",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#d1d5db")}
          onMouseLeave={(e) => (e.target.style.color = "white")}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Left Side: Square Image */}
        <div
          style={{
            width: window.innerWidth >= 768 ? "40%" : "100%",
          }}
        >
          <div
            style={{
              width: "100%",
              aspectRatio: "1 / 1",
              position: "relative",
              borderRadius: "0.75rem",
              overflow: "hidden",
              border: "4px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>

        {/* Right Side: Details & Options */}
        <div
          style={{
            width: window.innerWidth >= 768 ? "60%" : "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2
            style={{
              fontFamily: "serif",
              fontSize: "2.25rem",
              color: "white",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            {item.name}
          </h2>

          {item.isSpecial && (
            <span
              style={{
                color: "#fbbf24",
                fontWeight: "bold",
                marginBottom: "0.5rem",
                letterSpacing: "0.1em",
                fontSize: "0.875rem",
              }}
            >
              ★ CHEF'S SPECIAL ★
            </span>
          )}

          <p
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontStyle: "italic",
              marginBottom: "1.5rem",
              fontSize: "1.125rem",
            }}
          >
            {item.description}
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <span style={{ color: "white", fontWeight: "600" }}>Type:</span>
            <VegIndicator isVeg={item.isVeg} />
            <span style={{ color: "white", fontSize: "0.875rem" }}>
              {item.isVeg ? "Vegetarian" : "Non-Vegetarian"}
            </span>
          </div>

          {/* Price Display */}
          <div
            style={{
              background: "linear-gradient(to right, white, #d1d5db)",
              borderRadius: "0.5rem",
              padding: "1.5rem",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p
                  style={{
                    color: "#1a1510",
                    fontWeight: "600",
                    fontSize: "0.875rem",
                    marginBottom: "0.25rem",
                  }}
                >
                  Price per item
                </p>
                <div
                  style={{
                    color: "#1a1510",
                    display: "flex",
                    alignItems: "baseline",
                    gap: "0.25rem",
                  }}
                >
                  <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                    ₹{item.price}
                  </span>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <p
                  style={{
                    color: "#1a1510",
                    fontWeight: "600",
                    fontSize: "0.875rem",
                    marginBottom: "0.25rem",
                  }}
                >
                  Total
                </p>
                <p
                  style={{
                    color: "#1a1510",
                    fontSize: "1.875rem",
                    fontWeight: "bold",
                  }}
                >
                  ₹{item.price * quantity}
                </p>
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <span style={{ color: "white", fontWeight: "600" }}>Quantity:</span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "0.5rem",
                padding: "0.5rem",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "0.25rem",
                  backgroundColor: "white",
                  color: "#1a1510",
                  fontWeight: "bold",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1.125rem",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#e5e7eb")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
              >
                −
              </button>
              <span
                style={{
                  width: "2rem",
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "0.25rem",
                  backgroundColor: "white",
                  color: "#1a1510",
                  fontWeight: "bold",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1.125rem",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#e5e7eb")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            style={{
              width: "100%",
              backgroundColor: "white",
              color: "#1a1510",
              fontWeight: "bold",
              padding: "1rem",
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              fontSize: "1.125rem",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#f3f4f6";
              e.target.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.15)";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "white";
              e.target.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
              e.target.style.transform = "scale(1)";
            }}
          >
            <PlusCircle size={24} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// Menu Item Card
const MenuItem = ({ item, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(item)}
      style={{
        padding: "1rem",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        transition: "all 0.3s ease",
        borderRadius: "0.5rem",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
        e.currentTarget.style.paddingLeft = "0.75rem";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.paddingLeft = "1rem";
      }}
    >
      {/* Circular Item Image */}
      <div
        style={{
          width: "4rem",
          height: "4rem",
          position: "relative",
          borderRadius: "9999px",
          overflow: "hidden",
          flexShrink: "0",
          marginRight: "1rem",
          border: "2px solid rgba(255, 255, 255, 0.3)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "white";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
        }}
      >
        <img
          src={item.imageUrl}
          alt={item.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        />
      </div>

      <div style={{ flex: "1" }}>
        <h3
          style={{
            fontSize: "1.125rem",
            fontWeight: "bold",
            color: "white",
            transition: "color 0.3s ease",
          }}
        >
          {item.name}
        </h3>
        <p
          style={{
            fontSize: "0.875rem",
            color: "rgba(255, 255, 255, 0.6)",
            marginTop: "0.25rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.description}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: "0.5rem",
          }}
        >
          {item.isSpecial && (
            <span
              style={{
                fontSize: "0.75rem",
                paddingLeft: "0.5rem",
                paddingRight: "0.5rem",
                paddingTop: "0.125rem",
                paddingBottom: "0.125rem",
                borderRadius: "9999px",
                backgroundColor: "#b91c1c",
                color: "#fee2e2",
                fontWeight: "500",
              }}
            >
              Special
            </span>
          )}
          <VegIndicator isVeg={item.isVeg} />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginLeft: "1rem",
          flexShrink: "0",
        }}
      >
        <span
          style={{
            fontFamily: "serif",
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "white",
            whiteSpace: "nowrap",
          }}
        >
          ₹{item.price}
        </span>
      </div>
    </div>
  );
};

// Floating Cart - UPDATED to handle visibility and item management
// Floating Cart - FINAL UPDATED VERSION
const FloatingCart = ({ items, totalPrice, onUpdateQuantity, onRemoveItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (itemCount > 0) setIsOpen(true);
  }, [itemCount]);

  const CartItemRow = ({ item }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "0.875rem",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        padding: "0.75rem",
        borderRadius: "0.375rem",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        gap: "0.5rem",
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <span
          style={{
            color: "white",
            display: "block",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.name}
        </span>
        <span
          style={{
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: "0.75rem",
          }}
        >
          ₹{item.price} each
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        {/* Quantity Controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            borderRadius: "4px",
          }}
        >
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "white",
              cursor: item.quantity <= 1 ? "not-allowed" : "pointer",
              padding: "0.25rem",
              opacity: item.quantity <= 1 ? 0.5 : 1,
            }}
          >
            <MinusCircle size={16} />
          </button>
          <span
            style={{
              color: "white",
              width: "1rem",
              textAlign: "center",
              fontSize: "0.875rem",
            }}
          >
            {item.quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
              padding: "0.25rem",
            }}
          >
            <PlusCircleIcon size={16} />
          </button>
        </div>

        {/* Subtotal & Delete */}
        <span
          style={{
            color: "#d4af37",
            fontWeight: "bold",
            minWidth: "3rem",
            textAlign: "right",
          }}
        >
          ₹{item.price * item.quantity}
        </span>

        <button
          onClick={() => onRemoveItem(item.id)}
          style={{
            backgroundColor: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "1.5rem",
            height: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#b91c1c")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#dc2626")}
          aria-label={`Remove ${item.name}`}
        >
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  );

  const cartStyle = {
    position: "fixed",
    bottom: "1.5rem",
    right: "1.5rem",
    zIndex: "50",
  };

  return (
    <div style={cartStyle}>
      {/* 🛒 Cart Button - Always visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "4rem",
          height: "4rem",
          borderRadius: "9999px",
          backgroundColor: "#d4af37",
          color: "#1a1510",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          border: "none",
          fontWeight: "bold",
          fontSize: "0.875rem",
          position: "relative",
          transition: "all 0.3s ease",
          transform: "translateY(0)", // stays fixed now
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow =
            "0 20px 25px -5px rgba(0, 0, 0, 0.15)";
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow =
            "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
          e.currentTarget.style.transform = "scale(1)";
        }}
        aria-label="Shopping Cart"
      >
        <ShoppingCart size={28} />
        {itemCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-0.5rem",
              right: "-0.5rem",
              backgroundColor: "#dc2626",
              color: "white",
              fontSize: "0.75rem",
              fontWeight: "bold",
              borderRadius: "9999px",
              width: "1.5rem",
              height: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {itemCount}
          </span>
        )}
      </button>

      {/* 📦 Cart Panel */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            bottom: "5rem",
            right: "0",
            width: "20rem",
            backgroundColor: "#0f1729",
            borderRadius: "0.75rem",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            color: "white",
            padding: "1rem",
            maxHeight: "24rem",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            transition: "opacity 0.3s ease, transform 0.3s ease",
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? "auto" : "none",
          }}
        >
          <div className="flex items-center justify-between mb-4 border-b border-white/20 pb-2">
            <h3 className="font-serif text-xl font-bold text-white">
              Your Order
            </h3>

            <CancelRoundedIcon
              onClick={() => setIsOpen(false)}
              className="text-white cursor-pointer hover:text-red-400 transition-colors"
            />
          </div>

          {itemCount === 0 ? (
            <p
              style={{
                color: "rgba(255, 255, 255, 0.6)",
                fontStyle: "italic",
                paddingTop: "2rem",
                paddingBottom: "2rem",
                textAlign: "center",
              }}
            >
              No items in your cart
            </p>
          ) : (
            <div
              style={{
                flex: "1",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                paddingRight: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>
          )}

          <div
            style={{
              borderTop: "1px solid rgba(255, 255, 255, 0.2)",
              paddingTop: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: "1.125rem",
                marginBottom: "1rem",
              }}
            >
              <span style={{ color: "white" }}>Total:</span>
              <span style={{ color: "#d4af37" }}>
                ₹{totalPrice.toFixed(2)}
              </span>
            </div>

            {itemCount > 0 && (
              <button
                onClick={() => {
                  alert(`Order placed! Total: ₹${totalPrice.toFixed(2)}`);
                  setIsOpen(false);
                }}
                style={{
                  width: "100%",
                  backgroundColor: "#d4af37",
                  color: "#1a1510",
                  fontWeight: "bold",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#e5c158")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#d4af37")
                }
              >
                Proceed to Checkout
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main Menu Component with Backend Integration ---
export default function MenuPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [menuData, setMenuData] = useState([]); // State to hold fetched data
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  // 1. Calculate Total Price whenever cartItems change
  useEffect(() => {
    const newTotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(newTotal);
  }, [cartItems]);

  // 2. Fetch Menu Data on Component Load
  useEffect(() => {
    const fetchAndRenderMenu = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch using POST method as required
        const response = await fetch(BACKEND_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // Assuming POST requires an empty or specific body, adjust if needed
          body: JSON.stringify({ fetch: true }) 
        });

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

        const backendMenuArray = await response.json();

        // --- Data Transformation & Categorization ---
        const organizedMenu = {
            'Starters & Snacks': [], 
            'Beverages': [],         
        };

        backendMenuArray.forEach(backendItem => {
          // Map the backend fields to the front-end structure fields
          const menuItem = {
            id: backendItem.menu_id,
            name: backendItem.menu_name,
            description: backendItem.menu_description,
            price: parseFloat(backendItem.menu_price), // Ensure price is a number
            isVeg: backendItem.isveg === 'true', // Correctly parse boolean string
            imageUrl: backendItem.menu_img, // Fix Google Drive URL
            isSpecial: backendItem.menu_category === 'Special' // Example for special flag
            
          };

          // Check category and assign to the correct structure based on your old data
          const categoryKey = CATEGORY_MAP[backendItem.menu_category];

          if (categoryKey && organizedMenu[categoryKey]) {
            organizedMenu[categoryKey].push(menuItem);
          } else {
               // Fallback for categories not explicitly in CATEGORY_MAP but present in backend
               // You might want to add more explicit mappings or a 'Miscellaneous' category
               console.warn(`Unmapped category: ${backendItem.menu_category}. Item: ${backendItem.menu_name}`);
          }
        });

        const iconMap = {
  'Starters & Snacks': <LocalDiningRoundedIcon className="w-6 h-6 text-[#1a1510]" />,
  'Beverages': <LocalBarRoundedIcon className="w-6 h-6 text-[#1a1510]" />
  
};
        
        // Convert the organized object back into the array format your map uses
        const finalMenuData = Object.keys(organizedMenu)
  .filter(key => organizedMenu[key].length > 0)
  .map(key => ({
    category: key,
    icon: iconMap[key] || <LocalDiningRoundedIcon className="w-6 h-6 text-[#1a1510]" />, // fallback icon
    items: organizedMenu[key],
  }));

setMenuData(finalMenuData);

      } catch (err) {
        console.error('Fetch error:', err);
        setError(`Failed to load menu from backend: ${err.message}. Check console.`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndRenderMenu();
  }, []); // Empty dependency array ensures this runs only once on mount

  // --- Cart Management Handlers ---

  const handleAddToCart = (item, quantity) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prevItems, { ...item, quantity }];
    });
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems(prevItems => {
      if (newQuantity < 1) {
        // If quantity drops to 0 or below, remove the item
        return prevItems.filter(item => item.id !== itemId);
      }
      // Otherwise, update the quantity
      return prevItems.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
        alert("Your cart is empty! Add some items first.");
        return;
    }
    alert(`Order placed for items totaling: ₹${totalPrice.toFixed(2)}`);
    setCartItems([]);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "5rem",
        paddingBottom: "8rem",
        background: "linear-gradient(to bottom, #1a1510, #221c14, #1a1510)",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      {/* Modal for Item Details */}
      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      <div
        style={{
          maxWidth: "56rem",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
        {/* Header Section */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          <div
            style={{
              width: "5rem",
              height: "5rem",
              backgroundColor: "#d4af37",
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1rem",
              marginLeft: "auto",
              marginRight: "auto",
              boxShadow: "0 25px 50px -12px rgba(212, 175, 55, 0.4)",
            }}
          >
            <UtensilsCrossed
              className="w-10 h-10"
              style={{ color: "#1a1510" }}
            />
          </div>
          <h1
            style={{
              fontFamily: "serif",
              fontSize: "3.75rem",
              color: "#d4af37",
              marginBottom: "0.5rem",
              fontWeight: "800",
            }}
          >
            The Royal Menu
          </h1>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.6)",
              fontStyle: "italic",
              maxWidth: "28rem",
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: "1rem",
            }}
          >
            A selection of culinary masterpieces, crafted for a truly regal
            experience.
          </p>
        </div>
        
        {/* Loading/Error State */}
        {isLoading && (
            <p style={{ textAlign: 'center', color: 'white', padding: '2rem' }}>
                ⏳ Loading menu from backend...
            </p>
        )}

        {error && (
            <p style={{ textAlign: 'center', color: '#ef4444', padding: '2rem', border: '1px solid #ef4444' }}>
                ⚠️ Error: {error}
            </p>
        )}


        {/* Menu Sections */}
        {!isLoading && !error && menuData.length > 0 && (
            <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
            }}
            >
            {menuData.map((section) => (
                <section
                key={section.category}
                style={{
                    padding: window.innerWidth >= 768 ? "2rem" : "1.5rem",
                    borderRadius: "0.75rem",
                    backgroundColor: "rgba(15, 23, 41, 0.8)",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                }}
                >
                <h2
                    style={{
                    fontFamily: "serif",
                    fontSize: window.innerWidth >= 768 ? "2.25rem" : "1.875rem",
                    fontWeight: "bold",
                    color: "white",
                    marginBottom: "1.5rem",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                    paddingBottom: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    }}
                >
                    <div
                    style={{
                        width: "2rem",
                        height: "2rem",
                        backgroundColor: "white",
                        borderRadius: "9999px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#1a1510",
                    }}
                    >
                        {section.icon}
                    </div>
                    {section.category}
                </h2>

                <div
                    style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    }}
                >
                    {section.items.map((item) => (
                    <MenuItem
                        key={item.id}
                        item={item}
                        onSelect={setSelectedItem}
                    />
                    ))}
                </div>
                </section>
            ))}
            </div>
        )}
      </div>

     {/* Floating Cart */}
     <FloatingCart
        items={cartItems}
        totalPrice={totalPrice}
        onUpdateQuantity={handleUpdateQuantity} // Pass new handler
        onRemoveItem={handleRemoveItem}     // Pass new handler
        onCheckout={handleCheckout}         // Pass original checkout handler (now just alerts, as removal is in the panel)
      />
      
    </div>
  );
}