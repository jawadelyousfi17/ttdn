import {
  BadgeCheck,
  Clock3,
  Film,
  Images,
  Layers,
  Lock,
  Music4,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";

import type { IconName } from "@/types/content";

/**
 * Maps the copy layer's icon slugs onto components. This indirection is what
 * lets lib/content.ts stay plain serializable data — no React imports in the
 * copy — while the closed IconName union still makes a missing entry here a
 * compile error rather than a blank space on the page.
 */
const ICONS: Record<IconName, LucideIcon> = {
  shield: ShieldCheck,
  bolt: Zap,
  music: Music4,
  images: Images,
  sparkle: Sparkles,
  lock: Lock,
  wallet: Wallet,
  device: Smartphone,
  layers: Layers,
  clock: Clock3,
  check: BadgeCheck,
  film: Film,
};

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
}

export function Icon({ name, className, size = 18 }: IconProps) {
  const Component = ICONS[name];
  return <Component size={size} className={className} aria-hidden strokeWidth={1.75} />;
}
