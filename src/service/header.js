(() => {

  const { height: pageHeaderHeight } = document
    .querySelector(".site-head")
    .getBoundingClientRect();
  
    document.body.style.paddingTop = `${pageHeaderHeight}px`;
    
})();