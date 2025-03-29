/**
 * ATTENTION !!! ATTENTION !!! ATTENTION
 * USE AT YOUR OWN RISK, MESSAGES DELETED FROM FACEBOOK MENSENGER CAN SYNC ON DEVICES, SOMETIMES CAN NOT BE RECOVERED
 * Script to delete all friends conversations (not market) from your facebook account
 */

(function () {
  function deleteChats() {
    // Get the chats container
    let chats = document.querySelector('div[aria-label="Chats"]');
    let friends = chats.querySelectorAll('div[data-virtualized="false"]');

    // Ensure there are friends to delete
    if (friends.length === 0) {
      console.log("No more chats to delete.");
      return; // Exit if no chats are found
    }

    // Get the "More Options" button (SVG) for the first friend
    let moreOptions = null;
    try {
      moreOptions =
        friends[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].querySelector(
          "svg:nth-child(1)"
        );
    } catch (e) {
      moreOptions =
        friends[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].querySelector(
          "svg:nth-child(1)"
        );
    }

    // Simulate a click on the "More Options" button
    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    moreOptions.dispatchEvent(clickEvent);

    setTimeout(function () {
      // Find the menu that appears after clicking "More Options"
      let menu = document.querySelector('[role="menu"]');
      let menuItems = menu.querySelectorAll("span"); // Query for all spans, which may contain the text

      // Search for the "Delete chat" text and find the corresponding span
      let deleteBtn = Array.from(menuItems).find(
        (span) => span.textContent.trim() === "Delete chat"
      );

      if (deleteBtn) {
        // Click on the "Delete chat" option
        const clickDeleteEvent = new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        });
        deleteBtn.dispatchEvent(clickDeleteEvent);

        setTimeout(function () {
          // Find the confirmation dialog that appears after clicking "Delete"
          let dialog = document.querySelector('[aria-label="Delete chat"]');
          let confirmDelete = dialog.querySelectorAll("span")[7]; // Confirm delete (click the 8th span)

          // Trigger the click event to confirm deletion
          confirmDelete.dispatchEvent(clickDeleteEvent);

          // After the deletion, call the function again after a 2-second delay
          setTimeout(deleteChats, 1000); // Recursively call deleteChats after 2 seconds
        }, 800);
      } else {
        console.log("Delete chat button not found.");
        setTimeout(deleteChats, 800); // Retry after 2 seconds if not found
      }
    }, 800);
  }

  // Start the deleteChats process
  deleteChats();
})();
