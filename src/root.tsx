import { component$, useSignal } from "@builder.io/qwik";
import { QwikSnackbarProvider, useSnackbarContext } from "./components";
import {
  SnackbarLocation,
  Variants,
  Animation,
  AnimationLocation,
} from "./models";

const TestComponent = component$(() => {
  const { enqueueSnackbar$ } = useSnackbarContext();
  const autoClose = useSignal(true);
  const variant = useSignal<Variants>("default");
  const location = useSignal<SnackbarLocation>("top-right");
  const animation = useSignal<Animation>("slide");
  const animationLocation = useSignal<AnimationLocation>("right");
  const duration = useSignal<string>("5000");

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          marginBottom: "1rem",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        Qwik Snackbar Demo
      </h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          borderBottom: "1px solid #e5e7eb",
          paddingBottom: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <label for="autoClose" style={{ marginRight: "0.5rem" }}>
            Auto Close
          </label>
          <input
            type="checkbox"
            id="autoClose"
            name="autoClose"
            style={{ width: "150px" }}
            checked={autoClose.value}
            onChange$={() => (autoClose.value = !autoClose.value)}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <label for="variant">Variant</label>
          <select
            name="variant"
            id="variant"
            onChange$={(e: Event) =>
              (variant.value = (e.target as HTMLSelectElement)
                .value as Variants)
            }
            value={variant.value}
            style={{
              marginTop: "0.5rem",
              width: "150px",
              borderRadius: "4px",
              border: "1px solid #e5e7eb",
              padding: "0.5rem",
            }}
          >
            <option value="default">Default</option>
            <option value="error">Error</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
          </select>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <label for="location">Location</label>
          <select
            name="location"
            id="location"
            onChange$={(e: Event) =>
              (location.value = (e.target as HTMLSelectElement)
                .value as SnackbarLocation)
            }
            value={location.value}
            style={{
              marginTop: "0.5rem",
              width: "150px",
              borderRadius: "4px",
              border: "1px solid #e5e7eb",
              padding: "0.5rem",
            }}
          >
            <option value="top-right">Top Right</option>
            <option value="top-left">Top Left</option>
            <option value="top-center">Top Center</option>
            <option value="bottom-right">Bottom Right</option>
            <option value="bottom-left">Bottom Left</option>
            <option value="bottom-center">Bottom Center</option>
          </select>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <label for="animation">Animation</label>
          <select
            name="animation"
            id="animation"
            onChange$={(e: Event) =>
              (animation.value = (e.target as HTMLSelectElement)
                .value as Animation)
            }
            value={animation.value}
            style={{
              marginTop: "0.5rem",
              width: "150px",
              borderRadius: "4px",
              border: "1px solid #e5e7eb",
              padding: "0.5rem",
            }}
          >
            <option value="slide">Slide</option>
            <option value="fade">Fade</option>
          </select>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <label for="animationLocation">Animation Location</label>
          <select
            name="animationLocation"
            id="animationLocation"
            onChange$={(e: Event) =>
              (animationLocation.value = (e.target as HTMLSelectElement)
                .value as AnimationLocation)
            }
            value={animationLocation.value}
            style={{
              marginTop: "0.5rem",
              width: "150px",
              borderRadius: "4px",
              border: "1px solid #e5e7eb",
              padding: "0.5rem",
            }}
          >
            <option value="right">Right</option>
            <option value="left">Left</option>
            <option value="down">Down</option>
            <option value="up">Up</option>
          </select>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <label for="duration">Duration (ms)</label>
          <input
            type="text"
            placeholder="Duration (ms)"
            style={{
              marginTop: "0.5rem",
              width: "150px",
              borderRadius: "4px",
              border: "1px solid #e5e7eb",
              padding: "0.5rem",
            }}
            value={duration.value}
            onInput$={(e: Event) =>
              (duration.value = (e.target as HTMLInputElement).value)
            }
          />
        </div>
      </div>

      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <button
          style={{
            marginTop: "1rem",
            cursor: "pointer",
            borderRadius: "9999px",
            backgroundColor: "#1f2937",
            padding: "0.5rem 1rem",
            fontWeight: "600",
            color: "white",
          }}
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
          style={{
            marginTop: "1rem",
            cursor: "pointer",
            borderRadius: "9999px",
            backgroundColor: "#1f2937",
            padding: "0.5rem 1rem",
            fontWeight: "600",
            color: "white",
          }}
          onClick$={() =>
            enqueueSnackbar$(
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p>
                  <strong>This is a custom JSX message!</strong>
                </p>
                <br />
                <p>You can put any JSX content here.</p>
                <br />
                <a
                  href="https://www.google.com/"
                  target="_blank"
                  style={{ color: "#fde047", textDecoration: "underline" }}
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
