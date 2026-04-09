import logo from "@/assets/booknatic-logo.png";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-16 md:py-24" style={{ background: "var(--gradient-hero)" }}>
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <img src={logo} alt="Booknatic Logo" className="w-12 h-12 rounded-lg" />
          <span className="text-xl font-bold text-primary-foreground">Booknatic</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-4 leading-tight">
          Booking & Cancellation Policy Generator
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
          Create a professional booking and cancellation policy for your service business in minutes. Free, customizable, and ready to use.
        </p>
        <a
          href="#generator"
          className="inline-flex items-center gap-2 rounded-lg bg-card text-primary font-semibold px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
        >
          Generate your policy
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/></svg>
        </a>
      </div>
      <div className="absolute -bottom-1 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L1440 60L1440 0C1440 0 1080 40 720 40C360 40 0 0 0 0L0 60Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
