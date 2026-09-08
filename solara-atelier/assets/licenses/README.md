# Animation component sources

The application uses local JavaScript adaptations so the original React/CSS layout does not require Tailwind or a second component framework. All three libraries share the installed `motion` dependency.

- Motion Primitives: [TextEffect](https://github.com/ibelick/motion-primitives/blob/main/components/core/text-effect.tsx) and [AnimatedGroup](https://github.com/ibelick/motion-primitives/blob/main/components/core/animated-group.tsx). Adapted to line reveals, viewport triggers, semantic accessible text, and reduced motion. See `motion-primitives.md`.
- Animate UI: [Button](https://github.com/imskyleen/animate-ui/blob/main/apps/www/registry/primitives/buttons/button/index.tsx). Native button implementation with smaller hover/tap scales and reduced-motion support. See `animate-ui.md` (MIT + Commons Clause).
- Cult UI: [ShiftCard](https://github.com/nolly-studio/cult-ui/blob/main/apps/www/registry/default/ui/shift-card.tsx). Adapted to watch cards with hover/focus lift, image movement, and collection enter/exit/layout transitions. Product copy and controls remain visible rather than occupying collapsing panels. See `cult-ui.md`.

Implementation: `src/animation.jsx` and `src/animation.css`. Upstream licenses are retained beside this file and included in the public build.
