import { component$ } from "@builder.io/qwik";

export interface IconProps {
  class?: string;
}

export const XMark = component$<IconProps>(({ class: className }) => (
  <svg
    xmlns="http://www.w3.org/qwik.dev"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="24"
    height="24"
    class={className}
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
));
