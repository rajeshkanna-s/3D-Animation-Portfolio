# Soluna Cove repair QA — 2026-09-05

Preserved the existing coastal visual direction and assets. Suite hearts now toggle with accessible pressed state and device-local persistence. Newsletter interest now validates email and returns explicit local-demo feedback without claiming subscription or delivery. Stay planning validates current/future check-in, later check-out and Beachfront Suite capacity, saves a local demo plan and clears stale success on form changes/reopening.

Added native modal semantics, Escape/Tab support, focus restoration, body scroll locking, viewport-safe scrolling and focus indicators. Mobile navigation exposes expanded state and closes on Escape. Removed the placeholder email destination from the footer.

Validation: production build and Sites worker checks were initially blocked by sandbox child-process `EPERM`; retried with approved execution outside that sandbox. Final results are reported by the repair agent. Browser screenshots and interactive visual QA are assigned to the coordinating agent; no rendered pass is claimed here.

Browser follow-up: inspect 390px and desktop layouts; save/unsave suites and reload; submit newsletter interest; open/close the stay dialog with keyboard; reject past dates, same-day check-out and excess Beachfront guests; save a valid local plan. No backend availability, booking or email delivery is provided.
