// Makes existing CSS :hover effects (card highlights, button color changes,
// etc.) also trigger on tap for touch devices, which don't have a mouse
// pointer to trigger :hover naturally. Works by registering a real touch
// listener, which is what makes touch browsers apply :hover on tap at all.
document.addEventListener('touchstart', function(){}, {passive: true});
