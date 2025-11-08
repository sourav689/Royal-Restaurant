import react from "react";
import  { useState, useEffect } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Page from "./demo";

// ============ COUNTER COMPONENT ============
const Counter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(interval);
  }, [end, duration]);

  return <span>{count}</span>;
};

// ============ STAT CARD ============
const StatCard = ({ number, label, suffix = "" }) => {
  return (
    <div
      style={{
        padding: "2rem",
        borderRadius: "0.75rem",
        backgroundColor: "rgba(150, 120, 80, 0.1)",
        border: "2px solid #9a7f5e",
        textAlign: "center",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(150, 120, 80, 0.15)";
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(150, 120, 80, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(150, 120, 80, 0.1)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <h3
        style={{
          fontFamily: "serif",
          fontSize: "3rem",
          color: "#9a7f5e",
          fontWeight: "bold",
          marginBottom: "0.5rem",
        }}
      >
        <Counter end={number} />
        {suffix}
      </h3>
      <p style={{ color: "rgba(255, 255, 255, 0.75)", fontSize: "1rem" }}>
        {label}
      </p>
    </div>
  );
};

// ============ CUSTOMER REVIEWS SECTION ============
const ReviewCard = ({ name, role, text, rating }) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(102, 51, 153, 0.15)",
        border: "1px solid rgba(147, 51, 234, 0.4)",
        borderRadius: "1rem",
        padding: "2rem",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(102, 51, 153, 0.25)";
        e.currentTarget.style.borderColor = "#d4af37";
        e.currentTarget.style.transform = "translateY(-8px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(102, 51, 153, 0.15)";
        e.currentTarget.style.borderColor = "rgba(147, 51, 234, 0.4)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        {[...Array(rating)].map((_, i) => (
          <span key={i} style={{ color: "#d4af37", fontSize: "1.25rem" }}>
            ★
          </span>
        ))}
      </div>
      <p
        style={{
          color: "rgba(255, 255, 255, 0.8)",
          lineHeight: "1.6",
          marginBottom: "1.5rem",
          fontSize: "0.95rem",
          fontStyle: "italic",
        }}
      >
        "{text}"
      </p>
      <div>
        <h4
          style={{
            color: "#d4af37",
            fontWeight: "bold",
            marginBottom: "0.25rem",
          }}
        >
          {name}
        </h4>
        <p style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "0.875rem" }}>
          {role}
        </p>
      </div>
    </div>
  );
};

const CustomerReviews = () => {
  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Food Critic",
      text: "An extraordinary dining experience. Every dish was a masterpiece, and the service was impeccable. Truly a gem in the culinary world.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Business Executive",
      text: "Perfect ambiance and exceptional flavors. The chef's special dishes exceeded all expectations. Will definitely be back!",
      rating: 5,
    },
    {
      name: "Emma Williams",
      role: "Food Blogger",
      text: "The attention to detail in every aspect is remarkable. From plating to taste, everything is perfection. A must-visit destination!",
      rating: 5,
    },
  ];

  return (
    <div
      style={{
        maxWidth: "56rem",
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        paddingTop: "5rem",
        paddingBottom: "3rem",
      }}
    >
      <h2
        style={{
          fontFamily: "serif",
          fontSize: "2.5rem",
          color: "#d4af37",
          marginBottom: "0.5rem",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        What Our Guests Say
      </h2>
      <p
        style={{
          color: "rgba(255, 255, 255, 0.6)",
          textAlign: "center",
          marginBottom: "3rem",
          fontSize: "1rem",
        }}
      >
        Hear from those who have experienced the magic of our restaurant
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: window.innerWidth >= 768 ? "1fr 1fr 1fr" : "1fr",
          gap: "2rem",
        }}
      >
        {reviews.map((review, idx) => (
          <ReviewCard key={idx} {...review} />
        ))}
      </div>
    </div>
  );
};

// ============ CONTACT/QUERY CARD SECTION ============
const ContactCard = () => {
  return (
    <div
      style={{
        maxWidth: "56rem",
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        paddingTop: "3rem",
        paddingBottom: "5rem",
      }}
    >
      <div
        style={{
          borderRadius: "1.5rem",
          padding: "3rem",
          backgroundImage:
            "linear-gradient(to bottom right, rgba(102, 51, 153, 0.1), rgba(102, 51, 153, 0.05))", // Faint deep violet
          border: "1px solid rgba(102, 51, 153, 0.3)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle fabric-like texture */}
        <div
          style={{
            position: "absolute",
            inset: "0",
            backgroundImage:"",
            backgroundSize: "40px",
            opacity: 0.1,
            pointerEvents: "none",
          }}
        ></div>

        <h3
          style={{
            fontFamily: "serif",
            fontSize: "2rem",
            color: "#d4af37",
            marginBottom: "2rem",
            fontWeight: "bold",
            textAlign: "center",
            position: "relative", // Ensure text is above texture
            zIndex: 1,
          }}
        >
          Have Any Questions?
        </h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            // Handle form submission
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "32rem",
            marginLeft: "auto",
            marginRight: "auto",
            position: "relative", // Ensure form is above texture
            zIndex: 1,
          }}
        >
          {/* Name Input */}
          <div>
            <label
              htmlFor="query-name"
              style={{
                display: "block",
                color: "rgba(255, 255, 255, 0.8)",
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              Your Name
            </label>
            <input
              type="text"
              id="query-name"
              name="name"
              required
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                backgroundColor: "rgba(212, 175, 55, 0.1)",
                border: "1px solid rgba(212, 175, 55, 0.3)",
                borderRadius: "0.75rem",
                color: "white",
                fontSize: "0.875rem",
                outline: "none",
                transition: "all 0.3s ease",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.backgroundColor = "rgba(212, 175, 55, 0.2)";
                e.target.style.borderColor = "#d4af37";
              }}
              onBlur={(e) => {
                e.target.style.backgroundColor = "rgba(212, 175, 55, 0.1)";
                e.target.style.borderColor = "rgba(212, 175, 55, 0.3)";
              }}
              placeholder="Enter your name"
            />
          </div>

          {/* Contact Input */}
          <div>
            <label
              htmlFor="query-contact"
              style={{
                display: "block",
                color: "rgba(255, 255, 255, 0.8)",
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              Your Contact
            </label>
            <input
              type="tel"
              id="query-contact"
              name="contact"
              required
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                backgroundColor: "rgba(212, 175, 55, 0.1)",
                border: "1px solid rgba(212, 175, 55, 0.3)",
                borderRadius: "0.75rem",
                color: "white",
                fontSize: "0.875rem",
                outline: "none",
                transition: "all 0.3s ease",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.backgroundColor = "rgba(212, 175, 55, 0.2)";
                e.target.style.borderColor = "#d4af37";
              }}
              onBlur={(e) => {
                e.target.style.backgroundColor = "rgba(212, 175, 55, 0.1)";
                e.target.style.borderColor = "rgba(212, 175, 55, 0.3)";
              }}
              placeholder="Enter your phone number"
            />
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="query-email"
              style={{
                display: "block",
                color: "rgba(255, 255, 255, 0.8)",
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              Your Email
            </label>
            <input
              type="email"
              id="query-email"
              name="email"
              required
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                backgroundColor: "rgba(212, 175, 55, 0.1)",
                border: "1px solid rgba(212, 175, 55, 0.3)",
                borderRadius: "0.75rem",
                color: "white",
                fontSize: "0.875rem",
                outline: "none",
                transition: "all 0.3s ease",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.backgroundColor = "rgba(212, 175, 55, 0.2)";
                e.target.style.borderColor = "#d4af37";
              }}
              onBlur={(e) => {
                e.target.style.backgroundColor = "rgba(212, 175, 55, 0.1)";
                e.target.style.borderColor = "rgba(212, 175, 55, 0.3)";
              }}
              placeholder="Enter your email"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              padding: "0.875rem",
              backgroundColor: "#d4af37",
              color: "#1a1510",
              fontWeight: "bold",
              borderRadius: "0.75rem",
              border: "none",
              cursor: "pointer",
              fontSize: "0.875rem",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#e5c158";
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow =
                "0 10px 20px rgba(212, 175, 55, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#d4af37";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

// ============ MAIN ABOUT PAGE ============
export default function AboutPage({ onNavigate, currentPage }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #1a1510, #221c14, #1a1510)",
        fontFamily: "sans-serif",
      }}
    >
      {/* ============ HERO SECTION WITH PARALLAX ============ */}
      <div
        style={{
          position: "relative",
          height: "500px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Parallax Background Image */}
        <img
          src= "/images/hotel.jpeg"
          alt="About Us Hero"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `translateY(${scrollY * 0.5}px)`,
            opacity: scrollY > 400 ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/1200x600?text=image+here";
          }}
        />

        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(4px)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: "10",
            textAlign: "center",
            color: "white",
            maxWidth: "56rem",
            paddingLeft: "1rem",
            paddingRight: "1rem",
          }}
        >
          <h1
            style={{
              fontFamily: "serif",
              fontSize: "3.75rem",
              color: "#b89968",
              marginBottom: "1rem",
              fontWeight: "800",
              textShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
            }}
          >
            About Us
          </h1>
        </div>
      </div>
{/* ============ OUR JOURNEY & MEMORIES SECTION ============ */}
      <div
        style={{
          maxWidth: "70rem", // Increased max-width for 90% effect
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          paddingTop: "5rem",
          paddingBottom: "5rem",
          // FIX: Added display flex to align content side-by-side
          display: "flex", 
          flexDirection: window.innerWidth >= 1024 ? "row" : "column", // Stack on smaller screens
          gap: "4rem",
          // *** FIX: Changed to 'center' for better vertical alignment ***
          alignItems: "center", 
        }}
      >
        {/* Our Journey Paragraph (Left side) */}
        <div
          style={{
            flex: 1, // Take up available space
            maxWidth: window.innerWidth >= 1024 ? "50%" : "100%", // Limit width on large screens
            textAlign: "left", // Align text left within its container
            // *** FIX: Removed paddingTop: "1.5rem" to rely on 'alignItems: center' ***
          }}
        >
          <h2
            style={{
              fontFamily: "serif",
              fontSize: "2.5rem",
              color: "#b89968",
              marginBottom: "1.5rem",
              fontWeight: "bold",
            }}
          >
            Our Journey
          </h2>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              lineHeight: "1.8",
              fontSize: "1.1rem",
            }}
          >
            Founded with a passion for culinary excellence, our restaurant has
            been a beacon of refined dining for over two decades. We believe in
            honoring traditional recipes while embracing innovative techniques
            to create dishes that tell a story of our commitment to quality and
            elegance. Every dish that leaves our kitchen is a testament to the
            skill, dedication, and passion of our award-winning chefs. We source
            only the finest ingredients from trusted suppliers around the world,
            ensuring that each component meets our exacting standards for
            flavor, quality, and sustainability.
          </p>
        </div>

        {/* Memories Card Section (Right side) */}
        <div
          style={{
            flex: 1, // Take up available space
            maxWidth: window.innerWidth >= 1024 ? "50%" : "100%", // Limit width on large screens
            display: "flex", 
            flexDirection: "column",
            alignItems: "center", // Center the card horizontally within this column
          }}
        >
          {/* "See our beautiful memories" heading */}
          <h3
            style={{
              fontFamily: "serif",
              fontSize: "2rem",
              color: "#b89968",
              marginBottom: "2rem", // Space below this heading
              fontWeight: "bold",
              textAlign: "center",
              width: "100%", // Ensure heading respects the column width
            }}
          >
            See our beautiful memories
          </h3>

          {/* Page Component (Aligned beneath the heading) */}
          <Page onNavigate={onNavigate} currentPage={currentPage}/>
        </div>
      </div>
      {/* ============ STATS SECTION ============ */}
      <div
        style={{
          backgroundColor: "rgba(26, 21, 16, 0.8)",
          padding: "5rem 1rem",
          borderBottom: "1px solid rgba(150, 120, 80, 0.2)",
        }}
      >
        <div
          style={{
            maxWidth: "56rem",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                window.innerWidth >= 768 ? "1fr 1fr 1fr 1fr" : "1fr 1fr",
              gap: "2rem",
            }}
          >
            <StatCard number={4.5} suffix="+" label="Rating Score" />
            <StatCard
              number={150}
              suffix="+"
              label="Highly Professional Staff"
            />
            <StatCard number={450} suffix="+" label="Loyal & Happy Customers" />
            <StatCard number={20} suffix="+" label="Years of Excellence" />
          </div>
        </div>
      </div>

     
      {/* ============ CUSTOMER REVIEWS SECTION ============ */}
      <CustomerReviews />

      {/* ============ CONTACT/QUERY CARD SECTION ============ */}
      <ContactCard />
    </div>
  );
}