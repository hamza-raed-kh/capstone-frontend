import { Button } from "../components/Button/Button";
import Navigation from "../components/Navigation/Navigation";

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

      <section style={{ marginTop: "2rem" }}>
        <h2>Navigation Component</h2>
        <div style={{ padding: "1rem", background: "var(--color-white, #fff)", width: "300px", borderRadius: "8px" }}>
          <Navigation 
            links={[
              { to: "/home-test", label: "Home", icon: "mdi:home" },
              { to: "/explore", label: "Explore", icon: "mdi:compass" },
              { to: "/sandbox", label: "Sandbox (Active)", icon: "mdi:cube" },
              { to: "/settings", label: "Settings", icon: "mdi:cog", disabled: true }
            ]} 
          />
        </div>
      </section>
    </div>
  );
};
