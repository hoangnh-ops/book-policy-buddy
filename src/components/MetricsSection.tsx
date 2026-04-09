import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const metrics = [
  {
    label: "Cancellation window",
    value: "24–48 hrs",
    color: "bg-primary/10 text-primary",
    tip: "The time frame before an appointment within which a client can cancel without penalty. Industry standard is 24–48 hours.",
  },
  {
    label: "Late cancellation fee",
    value: "25–50%",
    color: "bg-warning/10 text-warning",
    tip: "A percentage of the service cost charged when a client cancels after the cancellation window has passed.",
  },
  {
    label: "No-show fee",
    value: "50–100%",
    color: "bg-destructive/10 text-destructive",
    tip: "The fee charged when a client fails to show up without prior notice. Most businesses charge 50–100% of the service price.",
  },
  {
    label: "Advance booking",
    value: "1–7 days",
    color: "bg-success/10 text-success",
    tip: "The minimum time in advance that a client must book an appointment. Varies by service type and industry.",
  },
];

const MetricsSection = () => (
  <section className="py-16 bg-card">
    <div className="container mx-auto px-4 max-w-4xl">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
        Understanding Booking Policy Metrics
      </h2>
      <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
        Here's what each metric means and the typical industry benchmarks.
      </p>
      <div className="grid sm:grid-cols-2 gap-5">
        {metrics.map((m) => (
          <div key={m.label} className="flex items-start gap-4 p-5 rounded-xl border border-border bg-background">
            <div className={`px-3 py-2 rounded-lg text-lg font-bold ${m.color}`}>
              {m.value}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <h3 className="font-bold text-foreground">{m.label}</h3>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs text-sm">{m.tip}</TooltipContent>
                </Tooltip>
              </div>
              <p className="text-muted-foreground text-sm mt-1">{m.tip.split(". ")[0]}.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default MetricsSection;
