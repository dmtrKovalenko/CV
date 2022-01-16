export function useAnalytics(): (
  label: string,
  options?: { props?: any; callback?: () => void }
) => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  return (
    // @ts-expect-error analytics types
    window.plausible ||
    function () {
      // @ts-expect-error analytics types
      (window.plausible.q = window.plausible.q || []).push(arguments);
    }
  );
}
