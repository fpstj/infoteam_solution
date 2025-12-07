import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Thermometer, Lightbulb, Droplet, Wind, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloorStatus {
  floor: string;
  hvac: "OK" | "Error";
  temperature: string;
  occupancy: string;
  status: "ok" | "warning" | "error";
}

const floors: FloorStatus[] = [
  {
    floor: "Fourth Floor",
    hvac: "Error",
    temperature: "24.2°C",
    occupancy: "95.60%",
    status: "error",
  },
  {
    floor: "Third Floor",
    hvac: "OK",
    temperature: "21.8°C",
    occupancy: "78.90%",
    status: "ok",
  },
  {
    floor: "Second Floor",
    hvac: "OK",
    temperature: "23.1°C",
    occupancy: "92.30%",
    status: "ok",
  },
  {
    floor: "Ground Floor",
    hvac: "OK",
    temperature: "22.5°C",
    occupancy: "85.50%",
    status: "ok",
  },
];

interface BuildingStatusPanelProps {
  className?: string;
}

export function BuildingStatusPanel({ className }: BuildingStatusPanelProps) {
  return (
    <Card className={cn("flex h-full min-h-0 flex-col p-6", className)}>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text-primary">
          Building Status
        </h2>
        <Button size="sm">Real-time view</Button>
      </div>

      <div className="flex-1 min-h-0">
        <div className="space-y-4 overflow-y-auto pr-1 pb-6">
          {floors.map((floor) => (
            <div
              key={floor.floor}
              className="flex items-center justify-between rounded-lg bg-surfaceMuted p-4 transition-colors hover:bg-surfaceHover"
            >
              <div className="flex flex-1 items-center gap-4">
                <Circle
                  className={`h-3 w-3 flex-shrink-0 ${
                    floor.status === "error"
                      ? "fill-current text-semantic-error"
                      : floor.status === "warning"
                      ? "fill-current text-semantic-warning"
                      : "fill-current text-semantic-success"
                  }`}
                />

                <div className="flex-1">
                  <h3 className="mb-1 text-sm font-medium text-text-primary">
                    {floor.floor}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-text-secondary">
                    <span
                      className={
                        floor.hvac === "Error"
                          ? "font-medium text-semantic-error"
                          : ""
                      }
                    >
                      HVAC: {floor.hvac}
                    </span>
                    <span className="flex items-center gap-1">
                      <Thermometer className="h-3 w-3" />
                      {floor.temperature}
                    </span>
                    <span>{floor.occupancy} occupancy</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 border-t border-border pt-6">
        <div className="flex items-center justify-around">
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surfaceMuted">
              <Thermometer className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xs text-text-secondary">Temperature</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surfaceMuted">
              <Lightbulb className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xs text-text-secondary">Lighting</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surfaceMuted">
              <Droplet className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xs text-text-secondary">Water</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surfaceMuted">
              <Wind className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xs text-text-secondary">Air Quality</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
