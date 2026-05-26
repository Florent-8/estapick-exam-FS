export default function Loading() {
  return (
    <main className="app-shell">
      <section className="results-pane">
        <div className="skeleton skeleton-header" />
        <div className="skeleton skeleton-filter" />
        <div className="skeleton skeleton-card" />
        <div className="skeleton skeleton-card" />
        <div className="skeleton skeleton-card" />
      </section>
      <section className="map-panel" aria-label="Loading map">
        <div className="map-grid" />
      </section>
    </main>
  );
}

