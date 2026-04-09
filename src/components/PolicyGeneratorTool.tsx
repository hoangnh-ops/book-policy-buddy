import { useState } from "react";
import { CheckCircle, Copy, Info, AlertCircle, ChevronRight, ChevronLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  businessName: string;
  industry: string;
  bookingAdvance: string;
  cancellationWindow: string;
  lateCancelFee: string;
  noShowFee: string;
  reschedulePolicy: string;
  refundPolicy: string;
  contactEmail: string;
}

const INDUSTRIES = [
  "Hair Salon / Barbershop",
  "Spa & Wellness",
  "Medical / Dental Clinic",
  "Fitness / Personal Training",
  "Photography",
  "Consulting / Coaching",
  "Home Services",
  "Other",
];

const RESCHEDULE_OPTIONS = [
  "Allowed up to 24 hours before",
  "Allowed up to 48 hours before",
  "Allowed anytime before appointment",
  "Not allowed",
];

const REFUND_OPTIONS = [
  "Full refund if cancelled within policy window",
  "Partial refund (50%) if cancelled within policy window",
  "Credit toward future booking only",
  "No refund",
];

const initialForm: FormData = {
  businessName: "",
  industry: "",
  bookingAdvance: "",
  cancellationWindow: "24",
  lateCancelFee: "50",
  noShowFee: "100",
  reschedulePolicy: RESCHEDULE_OPTIONS[0],
  refundPolicy: REFUND_OPTIONS[0],
  contactEmail: "",
};

const InfoTip = ({ text }: { text: string }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Info className="w-4 h-4 text-muted-foreground cursor-help inline ml-1" />
    </TooltipTrigger>
    <TooltipContent className="max-w-xs text-sm">{text}</TooltipContent>
  </Tooltip>
);

const StepIndicator = ({ current, total }: { current: number; total: number }) => (
  <div className="flex items-center justify-center gap-2 mb-8">
    {Array.from({ length: total }, (_, i) => (
      <div key={i} className="flex items-center gap-2">
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
            i + 1 <= current
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-secondary text-muted-foreground"
          }`}
        >
          {i + 1 < current ? <CheckCircle className="w-5 h-5" /> : i + 1}
        </div>
        {i < total - 1 && (
          <div className={`w-10 h-1 rounded ${i + 1 < current ? "bg-primary" : "bg-border"}`} />
        )}
      </div>
    ))}
  </div>
);

const PolicyGeneratorTool = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [generated, setGenerated] = useState<string | null>(null);
  const { toast } = useToast();

  const update = (key: keyof FormData, val: string) => {
    setForm((p) => ({ ...p, [key]: val }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const validateStep = (s: number): boolean => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (s === 1) {
      if (!form.businessName.trim()) errs.businessName = "Business name is required";
      if (!form.industry) errs.industry = "Please select an industry";
      if (!form.bookingAdvance.trim()) errs.bookingAdvance = "Please specify minimum advance booking time";
    }
    if (s === 2) {
      if (!form.cancellationWindow.trim() || isNaN(Number(form.cancellationWindow)))
        errs.cancellationWindow = "Please enter a valid number of hours";
      if (!form.lateCancelFee.trim() || isNaN(Number(form.lateCancelFee)))
        errs.lateCancelFee = "Please enter a valid percentage";
      if (!form.noShowFee.trim() || isNaN(Number(form.noShowFee)))
        errs.noShowFee = "Please enter a valid percentage";
    }
    if (s === 3) {
      if (!form.contactEmail.trim()) errs.contactEmail = "Contact email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail))
        errs.contactEmail = "Please enter a valid email address";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, 3));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const generate = () => {
    if (!validateStep(3)) return;
    const policy = `BOOKING & CANCELLATION POLICY
${form.businessName}

Effective Date: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}

1. BOOKING POLICY
• Industry: ${form.industry}
• Minimum advance booking: ${form.bookingAdvance}
• All appointments must be booked at least ${form.bookingAdvance} in advance through our online booking system or by contacting us directly.
• Appointments are confirmed upon receipt of booking confirmation via email.

2. CANCELLATION POLICY
• Cancellation window: ${form.cancellationWindow} hours before your scheduled appointment.
• Cancellations made within the required window will be processed according to our refund policy below.
• Late cancellation fee: ${form.lateCancelFee}% of service cost will be charged for cancellations made less than ${form.cancellationWindow} hours before the appointment.

3. NO-SHOW POLICY
• Clients who fail to show up for their scheduled appointment without prior notice will be charged ${form.noShowFee}% of the service cost.
• Repeated no-shows may result in the requirement of a deposit for future bookings.

4. RESCHEDULING POLICY
• ${form.reschedulePolicy}.
• Rescheduling is subject to availability. We recommend rescheduling as early as possible.

5. REFUND POLICY
• ${form.refundPolicy}.
• Refunds, if applicable, will be processed within 5–10 business days.

6. CONTACT US
For questions about this policy, please contact us at: ${form.contactEmail}

This policy is designed to ensure fair scheduling for all clients and to respect the time of our service providers. We appreciate your understanding and cooperation.

Generated by Booknatic — Book smarter.`;

    setGenerated(policy);
  };

  const copyPolicy = () => {
    if (generated) {
      navigator.clipboard.writeText(generated);
      toast({ title: "Copied!", description: "Policy copied to clipboard." });
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setStep(1);
    setGenerated(null);
    setErrors({});
  };

  const FieldError = ({ field }: { field: keyof FormData }) =>
    errors[field] ? (
      <p className="flex items-center gap-1 text-destructive text-sm mt-1">
        <AlertCircle className="w-4 h-4" />
        {errors[field]}
      </p>
    ) : null;

  if (generated) {
    return (
      <section id="generator" className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-card rounded-2xl shadow-xl border border-border p-6 md:p-10 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Your Policy is Ready!</h2>
            </div>
            <pre className="bg-muted rounded-xl p-5 text-sm text-foreground whitespace-pre-wrap font-sans leading-relaxed border border-border overflow-auto max-h-[500px]">
              {generated}
            </pre>
            <div className="flex flex-wrap gap-3 mt-6">
              <Button onClick={copyPolicy} className="gap-2">
                <Copy className="w-4 h-4" /> Copy to clipboard
              </Button>
              <Button variant="outline" onClick={resetForm} className="gap-2">
                <FileText className="w-4 h-4" /> Generate another
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="generator" className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-card rounded-2xl shadow-xl border border-border p-6 md:p-10">
          <h2 className="text-2xl font-bold text-foreground text-center mb-2">Generate Your Policy</h2>
          <p className="text-muted-foreground text-center mb-6">Fill in the details below and get your policy instantly.</p>
          <StepIndicator current={step} total={3} />

          {step === 1 && (
            <div className="space-y-5 animate-fade-in-up">
              <h3 className="text-lg font-semibold text-foreground">Step 1: Business Information</h3>
              <div>
                <Label htmlFor="businessName">
                  Business name <span className="text-destructive">*</span>
                </Label>
                <Input id="businessName" placeholder="e.g. Bella Hair Studio" value={form.businessName} onChange={(e) => update("businessName", e.target.value)} className="mt-1" />
                <FieldError field="businessName" />
              </div>
              <div>
                <Label htmlFor="industry">
                  Industry <span className="text-destructive">*</span>
                  <InfoTip text="Select the industry that best matches your business to get a tailored policy." />
                </Label>
                <select
                  id="industry"
                  value={form.industry}
                  onChange={(e) => update("industry", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select your industry</option>
                  {INDUSTRIES.map((i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
                <FieldError field="industry" />
              </div>
              <div>
                <Label htmlFor="bookingAdvance">
                  Minimum advance booking time <span className="text-destructive">*</span>
                  <InfoTip text="How far in advance must clients book? e.g. '2 hours', '1 day', '48 hours'" />
                </Label>
                <Input id="bookingAdvance" placeholder="e.g. 24 hours" value={form.bookingAdvance} onChange={(e) => update("bookingAdvance", e.target.value)} className="mt-1" />
                <FieldError field="bookingAdvance" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 animate-fade-in-up">
              <h3 className="text-lg font-semibold text-foreground">Step 2: Cancellation & No-Show Rules</h3>
              <div>
                <Label htmlFor="cancellationWindow">
                  Cancellation window (hours before appointment) <span className="text-destructive">*</span>
                  <InfoTip text="The minimum number of hours before the appointment that a client can cancel without a fee." />
                </Label>
                <Input id="cancellationWindow" type="number" min="1" placeholder="e.g. 24" value={form.cancellationWindow} onChange={(e) => update("cancellationWindow", e.target.value)} className="mt-1" />
                <FieldError field="cancellationWindow" />
              </div>
              <div>
                <Label htmlFor="lateCancelFee">
                  Late cancellation fee (% of service cost) <span className="text-destructive">*</span>
                  <InfoTip text="Percentage charged when a client cancels after the cancellation window." />
                </Label>
                <Input id="lateCancelFee" type="number" min="0" max="100" placeholder="e.g. 50" value={form.lateCancelFee} onChange={(e) => update("lateCancelFee", e.target.value)} className="mt-1" />
                <FieldError field="lateCancelFee" />
              </div>
              <div>
                <Label htmlFor="noShowFee">
                  No-show fee (% of service cost) <span className="text-destructive">*</span>
                  <InfoTip text="Percentage charged when a client doesn't show up without notice." />
                </Label>
                <Input id="noShowFee" type="number" min="0" max="100" placeholder="e.g. 100" value={form.noShowFee} onChange={(e) => update("noShowFee", e.target.value)} className="mt-1" />
                <FieldError field="noShowFee" />
              </div>
              <div>
                <Label htmlFor="reschedulePolicy">Rescheduling policy</Label>
                <select
                  id="reschedulePolicy"
                  value={form.reschedulePolicy}
                  onChange={(e) => update("reschedulePolicy", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {RESCHEDULE_OPTIONS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 animate-fade-in-up">
              <h3 className="text-lg font-semibold text-foreground">Step 3: Refund & Contact</h3>
              <div>
                <Label htmlFor="refundPolicy">Refund policy</Label>
                <select
                  id="refundPolicy"
                  value={form.refundPolicy}
                  onChange={(e) => update("refundPolicy", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {REFUND_OPTIONS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="contactEmail">
                  Contact email <span className="text-destructive">*</span>
                  <InfoTip text="This email will appear in your policy for customer inquiries." />
                </Label>
                <Input id="contactEmail" type="email" placeholder="you@business.com" value={form.contactEmail} onChange={(e) => update("contactEmail", e.target.value)} className="mt-1" />
                <FieldError field="contactEmail" />
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <Button variant="outline" onClick={prevStep} className="gap-2">
                <ChevronLeft className="w-4 h-4" /> Back
              </Button>
            ) : (
              <div />
            )}
            {step < 3 ? (
              <Button onClick={nextStep} className="gap-2">
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={generate} className="gap-2">
                <FileText className="w-4 h-4" /> Generate policy
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PolicyGeneratorTool;
