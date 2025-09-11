import { component$, useSignal } from "@builder.io/qwik";
import { QwikSnackbarProvider, useSnackbarContext } from "./components";

const TestComponent = component$(() => {
  const { enqueueSnackbar$ } = useSnackbarContext();
  const autoClose = useSignal(true);
  const variant = useSignal<"default" | "error" | "success" | "warning">(
    "default",
  );

  const location = useSignal<
    | "top-right"
    | "top-left"
    | "top-center"
    | "bottom-right"
    | "bottom-left"
    | "bottom-center"
  >("top-right");

  const animation = useSignal<"slide" | "fade">("slide");
  const animationLocation = useSignal<"top" | "right" | "bottom" | "left">(
    "right",
  );

  const duration = useSignal<string>("5000");

  return (
    <div class="flex h-screen w-screen flex-col items-center justify-center">
      <h1 class="mb-4 text-2xl font-bold">Qwik Snackbar Demo</h1>

      <div class="flex items-center gap-4 border-b border-gray-300 pb-4">
        <div class="flex flex-col items-center">
          <label for="autoClose" class="mr-2">
            Auto Close
          </label>
          <input
            type="checkbox"
            id="autoClose"
            name="autoClose"
            class="w-[150px]"
            checked={autoClose.value}
            onChange$={() => (autoClose.value = !autoClose.value)}
          />
        </div>
        <div class="flex flex-col items-center">
          <label for="variant">Variant</label>
          <select
            name="variant"
            id="variant"
            onChange$={(e) =>
              (variant.value = (e.target as HTMLSelectElement).value as any)
            }
            value={variant.value}
            class="mt-2 w-[150px] rounded border border-gray-300 p-2"
          >
            <option value="default">Default</option>
            <option value="error">Error</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
          </select>
        </div>
        <div class="flex flex-col items-center">
          <label for="variant">Location</label>
          <select
            name="variant"
            id="variant"
            onChange$={(e) =>
              (location.value = (e.target as HTMLSelectElement).value as any)
            }
            value={location.value}
            class="mt-2 w-[150px] rounded border border-gray-300 p-2"
          >
            <option value="top-right">Top Right</option>
            <option value="top-left">Top Left</option>
            <option value="top-center">Top Center</option>
            <option value="bottom-right">Bottom Right</option>
            <option value="bottom-left">Bottom Left</option>
            <option value="bottom-center">Bottom Center</option>
          </select>
        </div>
        <div class="flex flex-col items-center">
          <label for="variant">Animation</label>
          <select
            name="variant"
            id="variant"
            onChange$={(e) =>
              (animation.value = (e.target as HTMLSelectElement).value as any)
            }
            value={animation.value}
            class="mt-2 w-[150px] rounded border border-gray-300 p-2"
          >
            <option value="slide">Slide</option>
            <option value="fade">Fade</option>
          </select>
        </div>
        <div class="flex flex-col items-center">
          <label for="variant">Animation Location</label>
          <select
            name="variant"
            id="variant"
            onChange$={(e) =>
              (animationLocation.value = (e.target as HTMLSelectElement)
                .value as any)
            }
            value={animationLocation.value}
            class="mt-2 w-[150px] rounded border border-gray-300 p-2"
          >
            <option value="right">Right</option>
            <option value="left">Left</option>
            <option value="down">Down</option>
            <option value="up">Up</option>
          </select>
        </div>
        <div class="flex flex-col items-center">
          <label for="variant">Duration (ms)</label>
          <input
            type="text"
            placeholder="Duration (ms)"
            class="mt-2 w-[150px] rounded border border-gray-300 p-2"
            value={duration.value}
            onInput$={(e) =>
              (duration.value = (e.target as HTMLInputElement).value)
            }
          />
        </div>
      </div>
      <div class="mt-4 flex items-center gap-4">
        <button
          class="mt-4 cursor-pointer rounded-full bg-gray-800 px-4 py-2 font-semibold text-white hover:bg-gray-700"
          onClick$={() =>
            enqueueSnackbar$("This is a test message", {
              variant: variant.value,
              autoClose: autoClose.value,
              location: location.value,
              animation: animation.value,
              animationLocation: animationLocation.value,
              duration: parseInt(duration.value),
            })
          }
        >
          Open Snackbar
        </button>

        <button
          class="mt-4 cursor-pointer rounded-full bg-gray-800 px-4 py-2 font-semibold text-white hover:bg-gray-700"
          onClick$={() =>
            enqueueSnackbar$(
              <div class="flex flex-col">
                <p>
                  <strong>This is a custom JSX message!</strong>
                </p>
                <br />
                <p>You can put any JSX content here.</p>
                <br />
                <a
                  href="https://www.google.com/"
                  target="_blank"
                  class="text-yellow-300 underline"
                >
                  Even links!
                </a>
              </div>,
              {
                variant: variant.value,
                autoClose: autoClose.value,
                location: location.value,
                animation: animation.value,
                animationLocation: animationLocation.value,
                duration: parseInt(duration.value),
              },
            )
          }
        >
          Open Custom Snackbar
        </button>
      </div>
    </div>
  );
});

export default component$(() => {
  return (
    <>
      <head>
        <meta charset="utf-8" />
        <title>Qwik Snackbar</title>
      </head>
      <body>
        <QwikSnackbarProvider>
          <TestComponent />
        </QwikSnackbarProvider>
      </body>
    </>
  );
});
