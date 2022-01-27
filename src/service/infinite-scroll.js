const options = {
  rootMargin: '150px',
};

const callback = function (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('Внутри Foreach');
      console.log(entry);
    }
    
  });
}

const imageObserver = new IntersectionObserver(callback, options);

imageObserver.observe(document.querySelector('#loading'));