"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getLogTag } from "@/lib/log-tag";
import { logOnServer } from "./actions";

export function ButtonGroup() {
  const [lastTag, setLastTag] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="font-mono text-lg">{lastTag ?? "—"}</p>
      <div className="flex gap-4">
        <Button
          onClick={() => {
            const tag = getLogTag();
            console.log(`[console][client][${tag}] Client-side log only`);
            setLastTag(tag);
          }}
        >
          Client Log
        </Button>
        <Button
          variant="secondary"
          onClick={async () => {
            const tag = await logOnServer();
            setLastTag(tag);
          }}
        >
          Server Log
        </Button>
        <Button
          variant="outline"
          onClick={async () => {
            const tag = getLogTag();
            console.log(`[console][client][${tag}] Client-side log (before server action)`);
            setLastTag(tag);
            const serverTag = await logOnServer();
            setLastTag(serverTag);
          }}
        >
          Both Logs
        </Button>
      </div>
    </div>
  );
}
