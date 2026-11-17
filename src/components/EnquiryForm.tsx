"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { buttonClasses } from "./Button";

export type EnquiryType = "product" | "packaging" | "printing" | "general";
const TYPE_LABELS: Record<EnquiryType, string> = {
  product: "Product enquiry",
  packaging: "Packaging / custom packaging quote",
  printing: "Printing & branding enquiry",
  general: "General enquiry",
};

const inputClass = "min-h-11 w-full rounded-md border border-muted bg-white px-3 text-base";

function Field({ id, label, required, hint, children }: { id: string; label: string; required?: boolean; hint?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-semibold text-navy">
        {label}{required && <span aria-hidden="true" className="text-brass-dark"> *</span>}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {children}
      {hint && <p id={`${id}-hint`} className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}

/** DESIGN ONLY. Submitting shows a preview message; nothing is sent or stored until Phase 6. */
export function EnquiryForm({ defaultType = "product", defaultReference = "" }: { defaultType?: EnquiryType; defaultReference?: string }) {
  const [type, setType] = useState<EnquiryType>(defaultType);
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div role="status" className="rounded-lg border border-brass bg-white p-6">
        <h2 className="font-sans text-xl font-semibold text-navy">Template preview only</h2>
        <p className="mt-2 text-muted">
          This is how the confirmation message will look. Nothing was sent or stored, because enquiry saving and email are built in a later phase.
        </p>
        <button type="button" className={`${buttonClasses("secondary", "sm")} mt-4`} onClick={() => setSubmitted(false)}>Back to the form</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-lg border border-line bg-white p-5 sm:p-8">
      <p className="rounded-md border border-dashed border-brass-dark p-3 text-sm text-brass-dark">
        Template preview: this form does not send or store anything yet.
      </p>

      <Field id="enq-type" label="What is your enquiry about?" required>
        <select id="enq-type" value={type} onChange={(e) => setType(e.target.value as EnquiryType)} className={inputClass}>
          {(Object.keys(TYPE_LABELS) as EnquiryType[]).map((k) => <option key={k} value={k}>{TYPE_LABELS[k]}</option>)}
        </select>
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="enq-name" label="Your name" required><input id="enq-name" name="name" required autoComplete="name" className={inputClass} /></Field>
        <Field id="enq-company" label="Company name"><input id="enq-company" name="company" autoComplete="organization" className={inputClass} /></Field>
        <Field id="enq-email" label="Business email" required><input id="enq-email" name="email" type="email" required autoComplete="email" className={inputClass} /></Field>
        <Field id="enq-phone" label="Phone"><input id="enq-phone" name="phone" type="tel" autoComplete="tel" className={inputClass} /></Field>
        <Field id="enq-country" label="Country"><input id="enq-country" name="country" autoComplete="country-name" className={inputClass} /></Field>
        <Field id="enq-city" label="City"><input id="enq-city" name="city" autoComplete="address-level2" className={inputClass} /></Field>
      </div>

      <Field id="enq-ref" label="Product or service reference" hint="Filled automatically when you come from a product page.">
        <input id="enq-ref" name="reference" defaultValue={defaultReference} aria-describedby="enq-ref-hint" className={inputClass} />
      </Field>

      {type === "packaging" && (
        <fieldset className="space-y-5 rounded-md border border-line p-4">
          <legend className="px-2 text-sm font-semibold text-navy">Packaging details (optional)</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="enq-pk-type" label="Packaging type"><input id="enq-pk-type" name="packagingType" className={inputClass} /></Field>
            <Field id="enq-pk-dim" label="Approximate dimensions"><input id="enq-pk-dim" name="dimensions" className={inputClass} /></Field>
            <Field id="enq-pk-mat" label="Material preference"><input id="enq-pk-mat" name="material" className={inputClass} /></Field>
            <Field id="enq-pk-print" label="Printing / colours"><input id="enq-pk-print" name="printing" className={inputClass} /></Field>
          </div>
        </fieldset>
      )}

      {type === "printing" && (
        <fieldset className="space-y-5 rounded-md border border-line p-4">
          <legend className="px-2 text-sm font-semibold text-navy">Printing details (optional)</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="enq-pr-item" label="Item to be printed"><input id="enq-pr-item" name="printItem" className={inputClass} /></Field>
            <Field id="enq-pr-fin" label="Finishing requirements"><input id="enq-pr-fin" name="finishing" className={inputClass} /></Field>
          </div>
        </fieldset>
      )}

      <Field id="enq-qty" label="Estimated quantity or requirement"><input id="enq-qty" name="quantity" className={inputClass} /></Field>

      <Field id="enq-msg" label="Message" required>
        <textarea id="enq-msg" name="message" required rows={5} className="w-full rounded-md border border-muted bg-white px-3 py-2 text-base" />
      </Field>

      <Field id="enq-file" label="Attachment (artwork or documents)" hint="File upload will be enabled in a later phase, with private storage.">
        <input id="enq-file" type="file" disabled aria-describedby="enq-file-hint" className="block w-full text-sm text-muted" />
      </Field>

      <div className="flex items-start gap-3">
        <input id="enq-consent" type="checkbox" required className="mt-1 h-5 w-5" />
        <label htmlFor="enq-consent" className="text-sm text-muted">
          I agree that Shree Jee Enterprises may contact me about this enquiry. <span className="text-brass-dark">[Final consent wording requires business/legal review]</span>
        </label>
      </div>

      <button type="submit" className={buttonClasses("primary")}>Send Enquiry</button>
    </form>
  );
}
