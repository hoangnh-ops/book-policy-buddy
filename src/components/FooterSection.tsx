import logo from "@/assets/booknatic-logo.png";

const FooterSection = () => (
  <footer className="py-10 border-t border-border">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Booknatic" className="w-8 h-8 rounded-md" />
        <span className="font-bold text-foreground">Booknatic</span>
      </div>
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Booknatic. All rights reserved. Book smarter.
      </p>
    </div>
  </footer>
);

export default FooterSection;
