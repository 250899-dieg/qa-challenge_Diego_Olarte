export function BookNowOverlay() {
  return (
    <div
      data-testid="book-overlay"
      className="pointer-events-auto absolute inset-y-0 right-6 z-50 block w-20 cursor-not-allowed bg-gradient-to-l from-brand.sky/30 via-brand.sky/10 to-transparent sm:hidden"
    >
      {/* QA-DEFECT-002: Overlay blocks Book Flight tap targets on small screens */}
    </div>
  );
}
