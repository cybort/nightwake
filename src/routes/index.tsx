import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { HomePage } from "@/components/home-page";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <Shell>
      <HomePage />
    </Shell>
  );
}
