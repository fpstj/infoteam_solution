import { Card } from "@/components/ui/card";
import { Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Ticket {
  id: string;
  title: string;
  category: string;
  status: "open" | "in-progress" | "resolved";
  time: string;
}

const tickets: Ticket[] = [
  {
    id: "1",
    title: "Air conditioning not working in Meeting Room B",
    category: "HVAC",
    status: "open",
    time: "2 hours ago",
  },
  {
    id: "2",
    title: "Flickering lights in hallway",
    category: "Electrical",
    status: "in-progress",
    time: "5 hours ago",
  },
  {
    id: "3",
    title: "Leaky faucet in office kitchen",
    category: "Plumbing",
    status: "open",
    time: "1 day ago",
  },
  {
    id: "4",
    title: "Access control system offline",
    category: "Security",
    status: "in-progress",
    time: "2 days ago",
  },
  {
    id: "5",
    title: "Elevator B maintenance overdue",
    category: "Maintenance",
    status: "open",
    time: "3 days ago",
  },
];

interface RecentTicketsPanelProps {
  className?: string;
}

export function RecentTicketsPanel({ className }: RecentTicketsPanelProps) {
  return (
    <Card className={cn("flex h-full flex-col p-6", className)}>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text-primary">
          Recent Tickets
        </h2>
        <a
          href="/facility"
          className="flex items-center gap-1 text-sm text-primary hover:underline"
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="cursor-pointer rounded-lg bg-surfaceMuted p-4 transition-colors hover:bg-surfaceHover"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      ticket.status === "resolved"
                        ? "bg-semantic-success"
                        : ticket.status === "in-progress"
                        ? "bg-semantic-warning"
                        : "bg-semantic-error"
                    }`}
                  />
                  <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {ticket.category}
                  </span>
                </div>

                <p className="mb-2 text-sm font-medium text-text-primary">
                  {ticket.title}
                </p>

                <div className="flex items-center gap-1 text-xs text-text-secondary">
                  <Clock className="h-3 w-3" />
                  <span>{ticket.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
