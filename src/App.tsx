import { useEffect, useRef, useState } from "react";

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
  { value: "elderberry", label: "Elderberry" },
];

const steps = ["Account", "Profile", "Preferences", "Review"];

function App() {
  const [step, setStep] = useState(1);
  const [sliderValue, setSliderValue] = useState(40);
  const [toggle, setToggle] = useState(false);
  const [selected, setSelected] = useState<string | null>("plan-pro");

  const comboboxRef = useRef<HTMLElement>(null);
  const toastRef = useRef<HTMLElement & { show?: () => void }>(null);

  // Wire data-typed props on web components (these accept JS values, not strings)
  useEffect(() => {
    if (comboboxRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (comboboxRef.current as any).data = fruits;
    }
  }, []);

  useEffect(() => {
    const el = document.querySelector("eds-progress-indicator") as
      | (HTMLElement & { labels?: string[] })
      | null;
    if (el) el.labels = steps;
  }, []);

  const showToast = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const t: any = toastRef.current;
    if (t && typeof t.show === "function") t.show();
  };

  return (
    <div className="demo-app">
      <header className="demo-header">
        <div className="brand">
          <aspentech-logo />
          <h1>Core UI · Component Demo</h1>
        </div>
        <div className="demo-row">
          <sl-badge variant="success" pill>
            v0.19
          </sl-badge>
          <sl-button variant="primary" size="small" onClick={showToast}>
            Show toast
          </sl-button>
        </div>
      </header>

      <main className="demo-main">
        <section className="demo-section">
          <h2>Alerts</h2>
          <eds-alert variant="primary" heading="Heads up">
            This is an Aspentech alert built on top of Shoelace.
          </eds-alert>
          <eds-alert variant="success" heading="All set" closable>
            Your changes were saved successfully.
          </eds-alert>
          <eds-alert
            variant="warning"
            heading="Check your input"
            link-label="Learn more"
            link-url="https://aspentech.com"
          >
            One or more fields need your attention.
          </eds-alert>
          <eds-alert variant="danger" heading="Something went wrong" closable>
            We couldn’t complete the request. Please try again.
          </eds-alert>
        </section>

        <section className="demo-section">
          <h2>Buttons & Toggles</h2>
          <div className="demo-row">
            <sl-button variant="primary">Primary</sl-button>
            <sl-button variant="success">Success</sl-button>
            <sl-button variant="warning">Warning</sl-button>
            <sl-button variant="danger" outline>
              Danger
            </sl-button>
            <sl-button variant="neutral" pill>
              Neutral
            </sl-button>
          </div>
          <sl-divider />
          <div className="demo-row">
            <eds-toggle-button
              label="Bold"
              icon="format_bold"
              icon-library="material"
              checked={toggle}
              onClick={() => setToggle((v) => !v)}
            />
            <eds-toggle-button
              label="Italic"
              icon="format_italic"
              icon-library="material"
            />
            <eds-toggle-button
              label="Underline"
              icon="format_underlined"
              icon-library="material"
            />
          </div>
        </section>

        <section className="demo-section">
          <h2>Form Controls</h2>
          <sl-input
            label="Full name"
            placeholder="Jane Doe"
            clearable
            size="medium"
          />
          <eds-combobox
            ref={comboboxRef}
            label="Favorite fruit"
            placeholder="Pick one…"
            help-text="Type to filter the list"
            clearable
          />
          <eds-slider
            label={`Volume: ${sliderValue}`}
            min={0}
            max={100}
            step={1}
            value={sliderValue}
            display-value
            onInput={(e: Event | React.SyntheticEvent) => {
              const detail = (e as CustomEvent<{ value: number }>).detail;
              if (detail && typeof detail.value === "number") {
                setSliderValue(detail.value);
              }
            }}
          />
        </section>

        <section className="demo-section">
          <h2>Cards & Selection</h2>
          {(["plan-basic", "plan-pro", "plan-enterprise"] as const).map(
            (id) => (
              <eds-selectable-card
                key={id}
                heading={id
                  .replace("plan-", "")
                  .replace(/^./, (c) => c.toUpperCase())}
                control="switch"
                selected={selected === id}
                onClick={() => setSelected(id)}
              >
                <span slot="description">
                  {id === "plan-pro"
                    ? "Best for growing teams that need more power."
                    : "A great option to get started."}
                </span>
              </eds-selectable-card>
            ),
          )}
          <eds-button-card heading="Add new workspace">
            <span slot="description">Create a fresh sandbox to play in.</span>
          </eds-button-card>
        </section>

        <section className="demo-section">
          <h2>Files</h2>
          <eds-file-uploader
            label="Upload documents"
            text="Drop files here or click to browse"
            help-text="PDF, DOCX, PNG up to 10MB"
            accept=".pdf,.docx,.png"
            multiple
            dropzone
          />
          <eds-attachment
            file-name="quarterly-report.pdf"
            file-size="2.4 MB"
            removable
            interactive
          />
          <eds-attachment
            file-name="diagram.png"
            file-size="540 KB"
            removable
          />
        </section>

        <section className="demo-section">
          <h2>Progress</h2>
          <eds-progress-indicator current-step={step} direction="horizontal" />
          <div className="demo-row">
            <sl-button
              variant="default"
              size="small"
              disabled={step === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
            >
              Back
            </sl-button>
            <sl-button
              variant="primary"
              size="small"
              disabled={step >= steps.length - 1}
              onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
            >
              Next
            </sl-button>
            <span style={{ marginLeft: "auto" }}>
              Step {step + 1} of {steps.length}
            </span>
          </div>
          <sl-divider />
          <div className="demo-row">
            <span>Loading</span>
            <eds-dots-animation />
          </div>
        </section>
      </main>

      <footer className="demo-footer">
        <eds-copyright company="AspenTech" company-location="Bedford, MA" />
      </footer>

      <eds-toast
        ref={toastRef}
        text="Hello from Aspentech Core!"
        lifetime={3000}
      />
    </div>
  );
}

export default App;
