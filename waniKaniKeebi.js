const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
const infoButton = document.getElementById("option-item-info");

// Configuration options for the mutation observer.
const observerConfig = {
  attributes: true,
  childList: false,
  characterData: false,
  subtree: false,
};


// Create a mutation observer on the infoButton.
const observerOfButton = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    // Here we're interested only in attribution changes. Later when we register
    // the observer, we'll send the config object above to ensure that we don't
    // even collect other data.
    if (mutation.type === 'attributes') {
       // WaniKani sets modifies the class attribute of the button we're after
       // when a user submits an answer during a review. Hook on that to click,
       // then disconnect from the observer and start a new one.
       if (mutation.attributeName === 'class') {
          infoButton.click();
          observerOfButton.disconnect();
          observerOfButton.observe(infoButton, observerConfig);
       }
    }
  });
});

observerOfButton.observe(infoButton, observerConfig);
