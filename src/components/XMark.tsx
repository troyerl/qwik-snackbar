import { component$ } from "@builder.io/qwik";

export interface IconProps {
  class?: string;
}

export const XMark = component$<IconProps>((props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class={props.class || "size-6"}
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  </svg>
));
