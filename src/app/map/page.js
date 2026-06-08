export default function MapPage() {
  return (
    <div className="relative w-full h-[calc(100vh-4rem)] pt-16">
      <iframe
        src="https://www.google.com/maps?q=bti+Chorus,+Dhaka,+Bangladesh&z=20&output=embed"
        className="w-full h-full border-0"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Location map"
      />
      <a
        href="https://www.google.com/maps?q=bti+Chorus,+Dhaka,+Bangladesh"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed left-1/2 -translate-x-1/2 bottom-4 sm:bottom-6 z-[1000] w-[calc(100%-2rem)] max-w-md bg-violet-500 hover:bg-violet-600 text-white py-3.5 px-4 rounded-lg no-underline font-bold text-center text-base sm:text-lg shadow-md transition-colors"
      >
        Open in Google Maps
      </a>
    </div>
  );
}
