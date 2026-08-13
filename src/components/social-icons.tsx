// Self-contained social SVG icons (lucide 1.x não tem brand icons)
import type { ComponentType, SVGProps } from "react";

const baseProps = (label: string): SVGProps<SVGSVGElement> => ({
  viewBox: "0 0 24 24",
  width: 20,
  height: 20,
  fill: "currentColor",
  "aria-label": label,
  role: "img",
});

export const InstagramIcon: ComponentType<SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg {...baseProps("Instagram")} {...props}>
    <path d="M12 2c2.7 0 3.05 0 4.12.06 1.07.05 1.8.22 2.43.47.66.26 1.22.6 1.77 1.16.56.55.9 1.11 1.16 1.77.25.63.42 1.36.47 2.43.05 1.07.06 1.42.06 4.12s-.01 3.05-.06 4.12c-.05 1.07-.22 1.8-.47 2.43a4.92 4.92 0 0 1-1.16 1.77c-.55.56-1.11.9-1.77 1.16-.63.25-1.36.42-2.43.47-1.07.05-1.42.06-4.12.06s-3.05-.01-4.12-.06c-1.07-.05-1.8-.22-2.43-.47a4.92 4.92 0 0 1-1.77-1.16 4.92 4.92 0 0 1-1.16-1.77c-.25-.63-.42-1.36-.47-2.43C2.01 15.05 2 14.7 2 12s.01-3.05.06-4.12c.05-1.07.22-1.8.47-2.43A4.92 4.92 0 0 1 3.69 3.69c.55-.56 1.11-.9 1.77-1.16.63-.25 1.36-.42 2.43-.47C8.95 2.01 9.3 2 12 2zm0 1.8c-2.65 0-2.97.01-4.02.06-.98.04-1.5.21-1.86.34-.47.18-.8.4-1.15.75-.35.35-.57.68-.75 1.15-.13.36-.3.88-.34 1.86-.05 1.05-.06 1.37-.06 4.02s.01 2.97.06 4.02c.04.98.21 1.5.34 1.86.18.47.4.8.75 1.15.35.35.68.57 1.15.75.36.13.88.3 1.86.34 1.05.05 1.37.06 4.02.06s2.97-.01 4.02-.06c.98-.04 1.5-.21 1.86-.34.47-.18.8-.4 1.15-.75.35-.35.57-.68.75-1.15.13-.36.3-.88.34-1.86.05-1.05.06-1.37.06-4.02s-.01-2.97-.06-4.02c-.04-.98-.21-1.5-.34-1.86a3.07 3.07 0 0 0-.75-1.15 3.07 3.07 0 0 0-1.15-.75c-.36-.13-.88-.3-1.86-.34-1.05-.05-1.37-.06-4.02-.06zm0 3.06a5.14 5.14 0 1 1 0 10.28 5.14 5.14 0 0 1 0-10.28zm0 8.48a3.34 3.34 0 1 0 0-6.68 3.34 3.34 0 0 0 0 6.68zm6.54-8.68a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
  </svg>
);

export const YoutubeIcon: ComponentType<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...baseProps("YouTube")} {...props}>
    <path d="M23.5 6.5a3 3 0 0 0-2.1-2.1C19.6 3.8 12 3.8 12 3.8s-7.6 0-9.4.6A3 3 0 0 0 .5 6.5C0 8.3 0 12 0 12s0 3.7.5 5.5a3 3 0 0 0 2.1 2.1c1.8.6 9.4.6 9.4.6s7.6 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.8.5-5.5.5-5.5s0-3.7-.5-5.5zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
  </svg>
);

export const TwitterIcon: ComponentType<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...baseProps("X")} {...props}>
    <path d="M18.9 2H22l-7.3 8.3L23 22h-6.8l-5.3-7-6.1 7H1.7l7.8-9L1 2h6.9l4.8 6.4L18.9 2zm-1.2 18h1.7L7.4 3.8H5.6L17.7 20z" />
  </svg>
);

export const FacebookIcon: ComponentType<SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg {...baseProps("Facebook")} {...props}>
    <path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 5 3.7 9.1 8.4 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7c4.7-.8 8.4-4.9 8.4-9.9z" />
  </svg>
);

export const SOCIAL = [
  { Icon: InstagramIcon, label: "Instagram" },
  { Icon: YoutubeIcon, label: "YouTube" },
  { Icon: TwitterIcon, label: "X (Twitter)" },
  { Icon: FacebookIcon, label: "Facebook" },
];
