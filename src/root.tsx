import {
  $,
  component$,
  createContextId,
  Slot,
  useContext,
  useContextProvider,
  useSignal,
} from "@builder.io/qwik";
import {
  AnimationStyles,
  IMessageDisplay,
  ISnackbarContext,
  ISnackbarOptions,
  ISnackbarSettings,
  LocationStyles,
  VariantStyles,
} from "./models";
import { XMark } from "./XMark";

export const SnackbarContext =
  createContextId<ISnackbarContext>("snackbarcontext");

export const useSnackbarContext = () => {
  return useContext(SnackbarContext);
};

const defaultVariants: VariantStyles = {
  default: "bg-gray-800 text-white",
  error: "bg-red-600 text-white",
  success: "bg-green-600 text-white",
  warning: "bg-yellow-600 text-white",
};

const locationStyles: LocationStyles = {
  "top-right": "top-5 right-5",
  "top-left": "top-5 left-5",
  "top-center": "top-5 left-1/2 transform -translate-x-1/2",
  "bottom-right": "bottom-5 right-5",
  "bottom-left": "bottom-5 left-5",
  "bottom-center": "bottom-5 left-1/2 transform -translate-x-1/2",
};

const animationStyles: AnimationStyles = {
  slide: {
    right: {
      open: "animate-snackbar-slide-open-from-right",
      close: "animate-snackbar-slide-close-for-right",
    },
    left: {
      open: "animate-snackbar-slide-open-from-left",
      close: "animate-snackbar-slide-close-for-left",
    },
    top: {
      open: "animate-snackbar-slide-open-from-top",
      close: "animate-snackbar-slide-close-for-top",
    },
    bottom: {
      open: "animate-snackbar-slide-open-from-bottom",
      close: "animate-snackbar-slide-close-for-bottom",
    },
  },
  fade: {
    open: "animate-snackbar-fade-in",
    close: "animate-snackbar-fade-out",
  },
};

export interface ISnackbarContextProviderProps {
  variants?: VariantStyles;
}

const defaultLocationSettings = {
  "top-right": animationStyles.slide.right,
  "top-left": animationStyles.slide.left,
  "top-center": animationStyles.slide.top,
  "bottom-right": animationStyles.slide.right,
  "bottom-left": animationStyles.slide.left,
  "bottom-center": animationStyles.slide.bottom,
};

export default component$<ISnackbarContextProviderProps>(
  ({ variants = defaultVariants }) => {
    const snackBarAnimation = useSignal<string>("");
    const settings = useSignal<ISnackbarSettings>({});
    const message = useSignal<IMessageDisplay>("");

    const dequeueSnackbar$ = $(() => {
      if (settings.value.animation === "fade") {
        snackBarAnimation.value = animationStyles.fade.close;
      } else {
        if (settings.value.animationLocation) {
          snackBarAnimation.value =
            animationStyles.slide[settings.value.animationLocation].close;
        } else {
          snackBarAnimation.value =
            defaultLocationSettings[
              settings.value.location || "top-right"
            ].close;
        }
      }

      setTimeout(() => {
        settings.value = {};
        message.value = "";
        snackBarAnimation.value = "";
      }, 500); // Match the duration of the closing animation
    });

    const enqueueSnackbar$ = $(
      (messageDisplay: IMessageDisplay, options?: ISnackbarOptions) => {
        const {
          autoClose = false,
          duration,
          ...snackbarSettings
        } = options || {};

        message.value = messageDisplay;
        settings.value = { ...snackbarSettings, autoClose };

        if (snackbarSettings.animation === "fade") {
          snackBarAnimation.value = animationStyles.fade.open;
        } else {
          if (snackbarSettings.animationLocation) {
            snackBarAnimation.value =
              animationStyles.slide[snackbarSettings.animationLocation].open;
          } else {
            snackBarAnimation.value =
              defaultLocationSettings[
                snackbarSettings.location || "top-right"
              ].open;
          }
        }

        if (autoClose) {
          setTimeout(() => {
            dequeueSnackbar$();
          }, duration || 10000); // Hide after 10 seconds
        }
      }
    );

    useContextProvider(SnackbarContext, { enqueueSnackbar$, dequeueSnackbar$ });

    return (
      <>
        {snackBarAnimation.value && (
          <div
            class={`fixed z-50 w-auto rounded-md px-4 py-3 opacity-0 shadow-lg ${snackBarAnimation.value} ${locationStyles[settings.value.location || "top-right"]} ${variants[settings.value.variant || "default"]} ${settings.value.class || ""} `}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            aria-label={settings.value.ariaLabel || "Snackbar notification"}
          >
            <div class="flex items-center gap-4">
              {typeof message.value !== "function" ? (
                message.value
              ) : (
                <message.value />
              )}
              <button
                type="button"
                onClick$={dequeueSnackbar$}
                class="rounded-full hover:cursor-pointer"
                aria-label={
                  settings.value.closeButtonAriaLabel ||
                  `Close snackbar button, ${settings.value.autoClose ? "this snackbar will close automatically" : "this snackbar will not close automatically"}`
                }
              >
                <XMark />
              </button>
            </div>
          </div>
        )}
        <Slot />
      </>
    );
  }
);
