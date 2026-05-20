"use client";

import { Button } from "@/components/ui/button";
import { logOnServer } from "./actions";

export function ButtonGroup() {
  return (
    <div className="flex gap-4">
      <Button
        onClick={() => {
          const rand = Math.floor(Math.random() * 900 + 100);
          console.log(`[console][client][${rand}] Client-side log only`);
        }}
      >
        Client Log
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          logOnServer();
        }}
      >
        Server Log
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          const rand = Math.floor(Math.random() * 900 + 100);
          console.log(`[console][client][${rand}] Client-side log (before server action)`);
          logOnServer();
        }}
      >
        Both Logs
      </Button>
    </div>
  );
}
