import { Zap, Shield, Clock, Palette } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant generation",
    desc: "Get a complete booking policy in seconds — no legal knowledge required.",
  },
  {
    icon: Shield,
    title: "Protect your business",
    desc: "Reduce no-shows and late cancellations with clear, enforceable policies.",
  },
  {
    icon: Clock,
    title: "Save time",
    desc: "Stop writing policies from scratch. Our templates cover all common scenarios.",
  },
  {
    icon: Palette,
    title: "Fully customizable",
    desc: "Tailor every detail — cancellation windows, fees, refund rules — to fit your business.",
  },
];

const WhyUseSection = () => (
  <section className="py-16">
    <div className="container mx-auto px-4 max-w-4xl">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
        Why Use the Booking & Cancellation Policy Generator
      </h2>
      <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
        Whether you're a solo service provider or a growing business, a clear booking policy builds trust and reduces revenue loss.
      </p>
      <div className="grid sm:grid-cols-2 gap-6">
        {features.map((f) => (
          <div key={f.title} className="flex gap-4 p-5 rounded-xl bg-card border border-border hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center shrink-0">
              <f.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-1">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUseSection;
