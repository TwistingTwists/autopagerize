export {
  i18n,
};

onMutation([{addedNodes: document.querySelectorAll('[tl]')}]);

if (document.readyState === 'loading') {
  const mo = new MutationObserver(onMutation);
  mo.observe(document, {subtree: true, childList: true});
  document.addEventListener('DOMContentLoaded', () => mo.disconnect(), {once: true});
}

function onMutation(mutations) {
  for (const m of mutations) {
    for (const node of m.addedNodes) {
      if (node.tagName && node.hasAttribute('tl')) {
        const textNode = node.firstChild;
        textNode.nodeValue = i18n(textNode.nodeValue.trim());
      }
    }
  }
}

function i18n(...args) {
  return chrome.i18n.getMessage(...args);
}
