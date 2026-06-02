/**
 * JSX type augmentation for the Stencil-based Aspentech web components and
 * for any Shoelace web components used directly in the demo. We loosely type
 * them so React/TS won't complain about unknown intrinsic elements.
 */
import type { DetailedHTMLProps, HTMLAttributes } from "react";

type WC<T = Record<string, unknown>> = DetailedHTMLProps<
  HTMLAttributes<HTMLElement> & T,
  HTMLElement
>;

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      // Aspentech / EDS components
      "aspentech-logo": WC;
      "aspentech-short-logo": WC;
      "eds-alert": WC<{
        variant?: "primary" | "success" | "neutral" | "warning" | "danger";
        heading?: string;
        closable?: boolean;
        "link-label"?: string;
        "link-url"?: string;
      }>;
      "eds-attachment": WC<{
        "file-name"?: string;
        "file-size"?: string;
        "help-text"?: string;
        size?: "small" | "medium" | "large";
        removable?: boolean;
        interactive?: boolean;
      }>;
      "eds-button-card": WC<{ heading?: string; disabled?: boolean }>;
      "eds-combobox": WC<{
        label?: string;
        placeholder?: string;
        "help-text"?: string;
        clearable?: boolean;
        multiple?: boolean;
        size?: "small" | "medium" | "large";
      }>;
      "eds-copyright": WC<{
        company?: string;
        "company-location"?: string;
        text?: string;
      }>;
      "eds-dots-animation": WC;
      "eds-file-uploader": WC<{
        label?: string;
        text?: string;
        "help-text"?: string;
        accept?: string;
        multiple?: boolean;
        dropzone?: boolean;
      }>;
      "eds-progress-indicator": WC<{
        "current-step"?: number;
        direction?: "horizontal" | "vertical";
      }>;
      "eds-selectable-card": WC<{
        heading?: string;
        control?: "checkbox" | "switch";
        selected?: boolean;
      }>;
      "eds-slider": WC<{
        label?: string;
        "help-text"?: string;
        min?: number;
        max?: number;
        step?: number;
        value?: number;
        "display-value"?: boolean;
      }>;
      "eds-toast": WC<{
        text?: string;
        lifetime?: number;
        "hide-icon"?: boolean;
      }>;
      "eds-toggle-button": WC<{
        label?: string;
        icon?: string;
        "icon-library"?: string;
        checked?: boolean;
      }>;
      "emerson-logo": WC;
      "emerson-short-logo": WC;

      // A few Shoelace primitives we use directly in the demo
      "sl-button": WC<{
        variant?:
          | "default"
          | "primary"
          | "success"
          | "neutral"
          | "warning"
          | "danger"
          | "text";
        size?: "small" | "medium" | "large";
        outline?: boolean;
        pill?: boolean;
        loading?: boolean;
        disabled?: boolean;
      }>;
      "sl-input": WC<{
        label?: string;
        placeholder?: string;
        type?: string;
        clearable?: boolean;
        size?: "small" | "medium" | "large";
        value?: string;
      }>;
      "sl-card": WC;
      "sl-badge": WC<{ variant?: string; pill?: boolean; pulse?: boolean }>;
      "sl-divider": WC<{ vertical?: boolean }>;
      "sl-icon": WC<{ name?: string; library?: string; label?: string }>;
    }
  }
}
// Side-effect CSS imports from third-party packages
declare module "@aspentech/pf-ui-core/css";
declare module "@shoelace-style/shoelace/dist/themes/light.css";
declare module "@shoelace-style/shoelace/dist/shoelace-autoloader.js";
declare module "@shoelace-style/shoelace/dist/utilities/base-path.js" {
  export function setBasePath(path: string): void;
  export function getBasePath(subpath?: string): string;
}
declare module "@material-design-icons/font";
declare module "@aspentech/pf-ui-core/loader" {
  export function defineCustomElements(
    win?: Window,
    opts?: Record<string, unknown>,
  ): void;
}
export {};
