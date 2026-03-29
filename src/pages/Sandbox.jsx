import { Button } from "../components/Button/Button";

/**
 * A sandbox page for showcasing and testing various components.
 * This page provides a visual playground for developers to see and interact with different
 * UI components in isolation, which helps in development and debugging.
 *
 * @returns {JSX.Element} A container with a title and a collection of `Button` components.
 */
export const Sandbox = () => {
  return (
    <div style={{ padding: "2rem", background: "var(--color-whitespace)" }}>
      <h1 style={{ color: "var(--color-text)" }}>Component Sandbox</h1>
      <hr style={{ margin: "1rem 0", borderColor: "var(--color-border)" }} />

      <section>
        <h2>Buttons & Gradients</h2>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Button variant="main">Main Gradient</Button>
          <Button variant="pink">Pink Gradient</Button>
          <Button variant="gold">Golden Prize</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </section>
    </div>
  );
};
