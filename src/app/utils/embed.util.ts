export const EMBED_RESIZE_MESSAGE = 'cargo-calculator:resize';

export function isEmbedded(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const inIframe = window.self !== window.top;
  const embedParam = new URLSearchParams(window.location.search).has('embed');
  return inIframe || embedParam;
}

export function applyEmbedPageClass(): void {
  if (typeof document === 'undefined' || !isEmbedded()) {
    return;
  }

  document.documentElement.classList.add('cc-embed');
  document.body.classList.add('cc-page--embed');
}

export function postEmbedHeight(height: number): void {
  if (typeof window === 'undefined' || window.parent === window) {
    return;
  }

  window.parent.postMessage(
    {
      type: EMBED_RESIZE_MESSAGE,
      height: Math.ceil(height),
    },
    '*',
  );
}
