chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'CHANGE_PAGE_COLOR') {
    try {
      document.body.style.backgroundColor = '#8AB9F1';

      sendResponse({
        status: true,
      });
    } catch (error) {
      console.error('Unexpected error : ', error);

      sendResponse({
        status: false,
        errorMessage: 'Unexpected error occurred.',
      });
    }
  }
  return true;
});
