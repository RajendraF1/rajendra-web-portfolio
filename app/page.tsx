import HorizontalScroller from "@/components/HorizontalScroller";
import type { SectionKey } from "@/components/sections/registry";

const sections: { id: SectionKey; label: string; bgClass: string }[] = [
  { id: "home", label: "Home", bgClass: "bg-0" },
  { id: "about", label: "About", bgClass: "bg-1" },
  { id: "projects", label: "Projects", bgClass: "bg-2" },
  { id: "skills", label: "Skills", bgClass: "bg-3" },
  { id: "contact", label: "Contact", bgClass: "bg-4" },
];

export default function Page() {
  return <HorizontalScroller sections={sections} />;
}
