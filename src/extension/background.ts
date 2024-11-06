chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({
    openPanelOnActionClick: true,
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'COLOR_CHANGE_REQUEST') {
    try {
      chrome.tabs.sendMessage(
        request.tabId,
        { action: 'CHANGE_PAGE_COLOR' },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error(
              'Error sending message to content : ',
              chrome.runtime.lastError
            );
            alert('Error sending message to content please try again');
            return;
          }
        }
      );
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
