import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="flex justify-between items-center p-2 border-t-2 text-sm text-muted-foreground">
      <span>VLSM Calculator</span>
      <div className="flex justify-center items-center  gap-2">
        <Button variant="link" asChild className="px-1">
          <a
            href="https://github.com/ilyas-bouktrane"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </Button>
        <span>• Author: Ilyas Bouktrane •</span>
        <Button variant="link" asChild className="px-1">
          <a
            href="https://linkedin.com/in/ilyas-bouktrane"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </Button>
      </div>
      <span>IPv4 Subnetting Tool</span>
    </footer>
  );
}
