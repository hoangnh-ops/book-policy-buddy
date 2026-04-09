import { ShieldCheck, FileText, Clock, AlertTriangle, CheckCircle, ListChecks } from "lucide-react";

const whyReasons = [
  {
    icon: ShieldCheck,
    title: "Protect your revenue",
    desc: "A clear booking policy reduces no-shows and last-minute cancellations that cost your business money.",
  },
  {
    icon: Clock,
    title: "Set clear expectations",
    desc: "Clients know upfront about cancellation windows, fees, and deposit requirements — fewer disputes, more trust.",
  },
  {
    icon: AlertTriangle,
    title: "Reduce scheduling conflicts",
    desc: "Defined rules for rescheduling and late arrivals keep your calendar running smoothly.",
  },
];

const includeItems = [
  "Free cancellation window (e.g. 24–48 hours before appointment)",
  "Late cancellation and no-show fees",
  "Deposit or prepayment requirements",
  "Rescheduling rules and notice period",
  "Late arrival grace period and consequences",
  "Contact information for policy questions",
];

const WhyAndWhatSection = () => (
  <section className="py-16">
    <div className="container mx-auto px-4 max-w-5xl">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
        Why Your Business Needs a Booking Policy & What to Include
      </h2>
      <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
        Every service business benefits from a professional <strong>booking policy template</strong>. Here's why — and what your <strong>cancellation policy template</strong> should cover.
      </p>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Why */}
        <div>
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-primary" />
            Why you need a booking policy generator
          </h3>
          <div className="space-y-5">
            {whyReasons.map((r) => (
              <div key={r.title} className="flex gap-4 p-4 rounded-xl bg-card border border-border">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <r.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">{r.title}</h4>
                  <p className="text-muted-foreground text-sm">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Using a <strong>booking policy generator</strong> saves hours of drafting and ensures you don't miss critical clauses that protect both you and your clients.
          </p>
        </div>

        {/* What to include */}
        <div>
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <ListChecks className="w-6 h-6 text-primary" />
            What to include in a cancellation policy
          </h3>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-muted-foreground text-sm mb-5">
              A complete <strong>cancellation policy template</strong> should cover these essential elements to be effective and enforceable:
            </p>
            <ul className="space-y-3">
              {includeItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground mt-5">
              Our <strong>cancellation policy generator</strong> creates a ready-to-use policy that includes all of the above — customized to your business in minutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default WhyAndWhatSection;
