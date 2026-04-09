import { ShieldCheck, CalendarCheck, TrendingUp, Gift, BellRing, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import booknaticLogo from "@/assets/booknatic-logo.png";

const benefits = [
  { icon: ShieldCheck, text: "Enforce cancellation & booking rules automatically" },
  { icon: CalendarCheck, text: "Prevent double bookings with real-time availability" },
  { icon: TrendingUp, text: "Increase bookings with optimized slot selection" },
  { icon: Gift, text: "Upsell add-ons during the booking flow" },
  { icon: BellRing, text: "Reduce no-shows with automated reminders" },
];

const timeSlots = [
  { time: "9:00 AM", available: true },
  { time: "9:30 AM", available: false },
  { time: "10:00 AM", available: true },
  { time: "10:30 AM", available: true, selected: true },
  { time: "11:00 AM", available: true },
  { time: "11:30 AM", available: false },
  { time: "12:00 PM", available: true },
  { time: "12:30 PM", available: true },
];

const addOns = [
  { name: "Deep Conditioning Treatment", price: "+$15" },
  { name: "Scalp Massage (10 min)", price: "+$10" },
];

const BookingWidgetMockup = () => {
  const today = new Date();
  const month = today.toLocaleString("en-US", { month: "long", year: "numeric" });
  const startDay = 7;

  return (
    <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden max-w-sm mx-auto lg:mx-0 lg:ml-auto">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border bg-primary/5">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">Book an appointment</p>
        <p className="text-foreground font-bold text-lg mt-1">Hair Styling — Premium Cut</p>
        <p className="text-muted-foreground text-xs mt-0.5">45 min · $65</p>
      </div>

      {/* Mini calendar */}
      <div className="px-5 pt-4 pb-2">
        <p className="text-xs font-semibold text-foreground mb-2">{month}</p>
        <div className="grid grid-cols-7 gap-1 text-center text-xs mb-1">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span key={i} className="text-muted-foreground font-medium">{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {Array.from({ length: 14 }, (_, i) => {
            const day = startDay + i;
            const isSelected = i === 3;
            const isPast = i < 2;
            return (
              <span
                key={i}
                className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-medium transition-colors ${
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : isPast
                    ? "text-muted-foreground/40"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                {day}
              </span>
            );
          })}
        </div>
      </div>

      {/* Time slots */}
      <div className="px-5 py-3">
        <p className="text-xs font-semibold text-foreground mb-2">Available times</p>
        <div className="grid grid-cols-4 gap-1.5">
          {timeSlots.map((s) => (
            <span
              key={s.time}
              className={`text-[10px] font-medium py-1.5 rounded-lg text-center transition-colors ${
                s.selected
                  ? "bg-primary text-primary-foreground"
                  : s.available
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-muted text-muted-foreground/40 line-through"
              }`}
            >
              {s.time}
            </span>
          ))}
        </div>
      </div>

      {/* Add-ons */}
      <div className="px-5 py-3 border-t border-border">
        <p className="text-xs font-semibold text-foreground mb-2">Enhance your visit</p>
        <div className="space-y-1.5">
          {addOns.map((a) => (
            <label key={a.name} className="flex items-center justify-between bg-secondary/50 rounded-lg px-3 py-2 cursor-pointer hover:bg-secondary transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded border-2 border-primary flex items-center justify-center">
                  <div className="w-2 h-2 rounded-sm bg-primary" />
                </div>
                <span className="text-xs text-foreground">{a.name}</span>
              </div>
              <span className="text-xs font-semibold text-primary">{a.price}</span>
            </label>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 py-4">
        <div className="w-full bg-primary text-primary-foreground text-sm font-bold rounded-xl py-3 text-center">
          Confirm Booking
        </div>
      </div>
    </div>
  );
};

const CrossSellSection = () => (
  <section className="py-20 bg-gradient-to-br from-[hsl(var(--navy))] via-[hsl(var(--deep-blue))] to-[hsl(var(--mid-blue))] relative overflow-hidden">
    {/* Subtle pattern overlay */}
    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />

    <div className="container mx-auto px-4 max-w-6xl relative">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left — Content */}
        <div>
          <span className="inline-block text-[hsl(var(--sky-blue))] text-xs font-bold uppercase tracking-widest mb-4">
            The next step
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground leading-tight mb-4">
            Turn your policy into an<br />
            <span className="text-[hsl(var(--sky-blue))]">automated booking system</span>
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-8 max-w-md">
            Your policy defines the rules. <strong className="text-primary-foreground">Booknatic enforces them automatically</strong> — from booking to payment to reminders.
          </p>

          <ul className="space-y-4 mb-10">
            {benefits.map((b) => (
              <li key={b.text} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[hsl(var(--sky-blue))]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <b.icon className="w-4 h-4 text-[hsl(var(--sky-blue))]" />
                </div>
                <span className="text-primary-foreground/90 text-sm leading-relaxed">{b.text}</span>
              </li>
            ))}
          </ul>

          <Button
            size="lg"
            className="bg-[hsl(var(--sky-blue))] hover:bg-[hsl(var(--sky-blue))]/90 text-[hsl(var(--navy))] font-bold text-base rounded-xl px-8 h-12 shadow-lg shadow-[hsl(var(--sky-blue))]/20"
            onClick={() => window.open("https://booknatic.app", "_blank")}
          >
            Install Booknatic
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
          <p className="text-primary-foreground/40 text-xs mt-3">Free plan available · No credit card required</p>
        </div>

        {/* Right — Widget mockup */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            {/* Glow behind widget */}
            <div className="absolute -inset-8 bg-[hsl(var(--sky-blue))]/10 rounded-3xl blur-2xl" />
            <div className="relative">
              <BookingWidgetMockup />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CrossSellSection;
