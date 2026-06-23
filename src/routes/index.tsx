import { createFileRoute } from "@tanstack/react-router";
import ToonhubHero from "@/components/ToonhubHero";

export const Route = createFileRoute("/")({
  component: ToonhubHero,
});
