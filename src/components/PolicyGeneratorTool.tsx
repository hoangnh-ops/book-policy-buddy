import { useState } from "react";
import { CheckCircle, Copy, Info, AlertCircle, ChevronRight, ChevronLeft, FileText, Download, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  businessName: string;
  industry: string;
  bookingAdvance: string;
  changeNotice: string;
  cancellationWindow: string;
  lateCancelFee: string;
  noShowFee: string;
  noShowDefinition: string;
  depositPercent: string;
  depositRefundable: string;
  gracePeriod: string;
  lateArrivalAction: string;
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

const NO_SHOW_DEFINITIONS = [
  "Client does not arrive within the grace period or does not provide advance notice",
  "Client does not arrive within 10 minutes of scheduled time",
  "Client does not arrive or cancel before the appointment",
];

const DEPOSIT_REFUND_OPTIONS = [
  "Fully refundable if cancelled within free cancellation window",
  "Non-refundable",
  "Applied as credit toward future booking",
];

const LATE_ARRIVAL_OPTIONS = [
  "Service may be shortened, no price reduction",
  "Appointment will be cancelled and treated as a no-show",
  "Service will proceed as normal if within grace period",
];

const initialForm: FormData = {
  businessName: "",
  industry: "",
  bookingAdvance: "",
  changeNotice: "",
  cancellationWindow: "",
  lateCancelFee: "",
  noShowFee: "",
  noShowDefinition: NO_SHOW_DEFINITIONS[0],
  depositPercent: "",
  depositRefundable: DEPOSIT_REFUND_OPTIONS[0],
  gracePeriod: "",
  lateArrivalAction: LATE_ARRIVAL_OPTIONS[0],
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
      if (!form.changeNotice.trim()) errs.changeNotice = "Please specify change notice period";
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
      if (!form.depositPercent.trim() || isNaN(Number(form.depositPercent)))
        errs.depositPercent = "Please enter a valid deposit percentage";
      if (!form.gracePeriod.trim() || isNaN(Number(form.gracePeriod)))
        errs.gracePeriod = "Please enter a valid number of minutes";
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
    const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const noShowCharge = Number(form.noShowFee) === 100 ? "the full service price" : `${form.noShowFee}% of the service price`;

    const policy = `Booking & Cancellation Policy — ${form.businessName}

Booking Policy
--------------
All appointments must be made at least ${form.bookingAdvance} in advance. A minimum of ${form.changeNotice} notice is required for any changes to an existing appointment.

Cancellation Policy
-------------------
Clients may cancel their appointment free of charge up to ${form.cancellationWindow} hours before the scheduled service. Cancellations made less than ${form.cancellationWindow} hours before the appointment will be subject to a late cancellation fee of ${form.lateCancelFee}% of the service price.

No-Show Policy
--------------
Clients who fail to arrive for their scheduled appointment without prior notice will be charged ${noShowCharge}. We define a no-show as a client who ${form.noShowDefinition.toLowerCase()}.

Deposits & Prepayment
---------------------
A deposit of ${form.depositPercent}% of the service price is required at the time of booking to secure your appointment. Deposits are ${form.depositRefundable.toLowerCase()}. For late cancellations, the deposit may be applied toward the cancellation fee.

Late Arrival Policy
-------------------
We offer a ${form.gracePeriod}-minute grace period for late arrivals. If you arrive more than ${form.gracePeriod} minutes after your scheduled time, your ${form.lateArrivalAction.toLowerCase()}, and no reduction in price will be offered. Please contact us as soon as possible if you expect to be late.

Last updated: ${today}

Generated with Booknatic — Smart Appointment Booking`;

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
                  <InfoTip text="How far in advance must clients book? e.g. '2 hours', '1 day'" />
                </Label>
                <Input id="bookingAdvance" placeholder="e.g. 2 hours" value={form.bookingAdvance} onChange={(e) => update("bookingAdvance", e.target.value)} className="mt-1" />
                <FieldError field="bookingAdvance" />
              </div>
              <div>
                <Label htmlFor="changeNotice">
                  Notice required for changes <span className="text-destructive">*</span>
                  <InfoTip text="Minimum notice period for clients to change an existing appointment. e.g. '4 hours', '24 hours'" />
                </Label>
                <Input id="changeNotice" placeholder="e.g. 4 hours" value={form.changeNotice} onChange={(e) => update("changeNotice", e.target.value)} className="mt-1" />
                <FieldError field="changeNotice" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 animate-fade-in-up">
              <h3 className="text-lg font-semibold text-foreground">Step 2: Cancellation & No-Show Rules</h3>
              <div>
                <Label htmlFor="cancellationWindow">
                  Free cancellation window (hours) <span className="text-destructive">*</span>
                  <InfoTip text="Hours before appointment that a client can cancel without a fee." />
                </Label>
                <Input id="cancellationWindow" type="number" min="1" placeholder="e.g. 24" value={form.cancellationWindow} onChange={(e) => update("cancellationWindow", e.target.value)} className="mt-1" />
                <FieldError field="cancellationWindow" />
              </div>
              <div>
                <Label htmlFor="lateCancelFee">
                  Late cancellation fee (% of service price) <span className="text-destructive">*</span>
                  <InfoTip text="Percentage charged for cancellations made after the free window." />
                </Label>
                <Input id="lateCancelFee" type="number" min="0" max="100" placeholder="e.g. 50" value={form.lateCancelFee} onChange={(e) => update("lateCancelFee", e.target.value)} className="mt-1" />
                <FieldError field="lateCancelFee" />
              </div>
              <div>
                <Label htmlFor="noShowFee">
                  No-show fee (% of service price) <span className="text-destructive">*</span>
                  <InfoTip text="Percentage charged when a client doesn't show up. 100% = full service price." />
                </Label>
                <Input id="noShowFee" type="number" min="0" max="100" placeholder="e.g. 100" value={form.noShowFee} onChange={(e) => update("noShowFee", e.target.value)} className="mt-1" />
                <FieldError field="noShowFee" />
              </div>
              <div>
                <Label htmlFor="noShowDefinition">No-show definition</Label>
                <select
                  id="noShowDefinition"
                  value={form.noShowDefinition}
                  onChange={(e) => update("noShowDefinition", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {NO_SHOW_DEFINITIONS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 animate-fade-in-up">
              <h3 className="text-lg font-semibold text-foreground">Step 3: Deposits & Late Arrival</h3>
              <div>
                <Label htmlFor="depositPercent">
                  Deposit required (% of service price) <span className="text-destructive">*</span>
                  <InfoTip text="Percentage of service price required as deposit to secure the booking." />
                </Label>
                <Input id="depositPercent" type="number" min="0" max="100" placeholder="e.g. 25" value={form.depositPercent} onChange={(e) => update("depositPercent", e.target.value)} className="mt-1" />
                <FieldError field="depositPercent" />
              </div>
              <div>
                <Label htmlFor="depositRefundable">Deposit refund policy</Label>
                <select
                  id="depositRefundable"
                  value={form.depositRefundable}
                  onChange={(e) => update("depositRefundable", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {DEPOSIT_REFUND_OPTIONS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="gracePeriod">
                  Late arrival grace period (minutes) <span className="text-destructive">*</span>
                  <InfoTip text="How many minutes after the scheduled time before a client is considered late." />
                </Label>
                <Input id="gracePeriod" type="number" min="0" max="60" placeholder="e.g. 15" value={form.gracePeriod} onChange={(e) => update("gracePeriod", e.target.value)} className="mt-1" />
                <FieldError field="gracePeriod" />
              </div>
              <div>
                <Label htmlFor="lateArrivalAction">Late arrival action</Label>
                <select
                  id="lateArrivalAction"
                  value={form.lateArrivalAction}
                  onChange={(e) => update("lateArrivalAction", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {LATE_ARRIVAL_OPTIONS.map((o) => (
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
