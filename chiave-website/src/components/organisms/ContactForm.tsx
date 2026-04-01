"use client";

import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const inputClasses =
  "h-auto rounded-none border-0 border-b border-[#2a2a2a] bg-[#1a1a1a] px-4 py-4 text-sm text-[#e8e2d8] placeholder:text-[#8a8278] focus-visible:border-[#c8a96e] focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors duration-300";

export function ContactForm() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <Input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className={inputClasses}
          style={{ fontFamily: "var(--font-body)" }}
        />
      </div>

      {/* Email */}
      <div>
        <Input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          className={inputClasses}
          style={{ fontFamily: "var(--font-body)" }}
        />
      </div>

      {/* Subject */}
      <div>
        <Input
          type="text"
          name="subject"
          placeholder="Subject"
          className={inputClasses}
          style={{ fontFamily: "var(--font-body)" }}
        />
      </div>

      {/* Brand Interest */}
      <div>
        <Input
          type="text"
          name="brand"
          placeholder="Which brand are you interested in?"
          className={inputClasses}
          style={{ fontFamily: "var(--font-body)" }}
        />
      </div>

      {/* Message */}
      <div>
        <Textarea
          name="message"
          placeholder="Tell us about your vision..."
          rows={5}
          className={`${inputClasses} min-h-0 resize-none field-sizing-fixed`}
          style={{ fontFamily: "var(--font-body)" }}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-[#c8a96e] px-8 py-4 text-xs font-medium uppercase tracking-[0.3em] text-[#0a0a0a] transition-all duration-500 hover:bg-[#b8995e]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Send Inquiry
      </button>
    </form>
  );
}
