/*
 * JavaScript for Accessible University Demo Site
 * http://uw.edu/accesscomputing/AU
 *
 * after-modal.js = Accessible Modal Dialog 
 *
 * This script handles basic functionalitty for showing and hiding the dialog in this example
 * It's too simple for widespread use  
 * 
 * Resources: 
 * 
 * MDN HTML dialog element: 
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
 *
 * W3C APG Dialog (Modal) pattern: 
 * https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/ 
 * 
 */


document.addEventListener("DOMContentLoaded", function(event) { 

    const dialogTrigger = document.getElementById('openDialog');
    const auDialog = document.getElementById('modalContent');
    const closeButton = document.getElementById('modalClose');
    const okButton = document.getElementById('modalOk');
    
    // If a browser doesn't support the dialog, then hide the
    // dialog contents by default.
    if (typeof auDialog.showModal !== 'function') {
      auDialog.hidden = true;
      /* a fallback script to allow this dialog/form to function
         for legacy browsers that do not support <dialog>
        could be provided here.
      */
    }
    // Handle click on the dialogTrigger button
    dialogTrigger.addEventListener('click', () => {
      if (typeof auDialog.showModal === "function") {
        auDialog.showModal();
        // trap keyboard focus within dialog 
        // (browsers don't do this natively, as of Nov 2022)
        document.addEventListener('keydown',trapTabKey); 

      } 
      else {
        console.log ("Sorry, the <dialog> API is not supported by this browser."); 
      }
    });

    // Handle click on the close & OK buttons 
    closeButton.addEventListener('click',function() { 
      auDialog.close();
    });
    okButton.addEventListener('click',function() { 
      auDialog.close();
    });

    // HTML dialog element has its own 'close' event 
    auDialog.addEventListener('close', () => {
      // remove tab event listener 
      document.removeEventListener('keydown',trapTabKey); 
    });

    function trapTabKey(e) {
      
      var key = e.key || e.keyCode || e.which; 

      // if tab or shift-tab pressed
      if (key === 'Tab' || key === 9) { 
        e.preventDefault(); 
        /* This is an extreme oversimplification 
          since we know we only have two buttons. 
          A more robus dialog would build an array of all focusable elements 
          and move to the next or previous element in the array 
          as user tabs or shift+tabs 
        */ 
        if (e.target === closeButton) { 
          okButton.focus(); 
        }
        else if (e.target === okButton) { 
          closeButton.focus(); 
        }
      }
    };

});