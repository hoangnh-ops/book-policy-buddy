import { ClipboardList, Settings, Download } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "1. Enter your business details",
    desc: "Provide your business name, industry, and advance booking requirements.",
  },
  {
    icon: Settings,
    title: "2. Customize your rules",
    desc: "Set your cancellation window, no-show fees, rescheduling, and refund preferences.",
  },
  {
    icon: Download,
    title: "3. Copy & use your policy",
    desc: "Instantly generate a professional policy. Copy it and add it to your website, booking page, or client communications.",
  },
];

const HowToUseSection = () => (
  <section className="py-16 bg-card">
    <div className="container mx-auto px-4 max-w-4xl">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
        How to Use the Booking & Cancellation Policy Generator
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((s) => (
          <div key={s.title} className="text-center group">
            <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <s.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
            <p className="text-muted-foreground text-sm">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowToUseSection;
