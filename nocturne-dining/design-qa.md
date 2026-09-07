# Nocturne repair QA — 2026-09-05

Preserved the existing dark hearth visual direction and assets. Replaced false reservation confirmation with an explicitly local demo plan saved on this device. Added required current-date validation, associated form labels, accurate six/eight guest pricing, native modal semantics, Escape/Tab support, focus restoration, scroll locking, mobile spacing and reduced-motion styles. Storage errors appear inside the dialog.

The current source has no sound toggle or audio feature to repair.

Validation: production build and Sites worker checks were initially blocked by sandbox child-process `EPERM`; retried with approved execution outside that sandbox. Final results are reported by the repair agent. Browser screenshots and interactive visual QA are assigned to the coordinating agent; no rendered pass is claimed here.

Browser follow-up: inspect 390px and desktop layouts, open each reservation entry point, Tab through the dialog, dismiss with Escape, check focus returns, reject a past/empty date, save a valid demo plan, and confirm the device-local receipt. No backend reservation or email delivery is provided.
