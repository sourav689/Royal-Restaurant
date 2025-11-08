"use client";

import { HoverDetailCard } from "./hover-detail-card";

export default function Page({ onNavigate }) {  // ✅ accept onNavigate as prop
  return (
    <div
      style={{
        backgroundColor: 'transparent',
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
      }}
    >
      <HoverDetailCard 
        title="Our Memories" 
        primaryButton={{
          text: "Go to Gallery",
          color: "bg-white/90",
          hoverColor: "hover:bg-white",
          textColor: "text-gray-900"
        }}
        enableAnimations={true}
        onNavigate={onNavigate}   // ✅ pass it to HoverDetailCard
      />
    </div>
  );
}
