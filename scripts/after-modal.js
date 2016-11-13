/*
 * JavaScript for Accessible University Demo Site
 * http://uw.edu/accesscomputing/AU
 *
 * after-modal.js = Accessible Modal
 *
 * This script features a modified version of Greg Kraus's Accessible Modal Dialog
 * https://github.com/gdkraus/accessible-modal-dialog
 * The license for Accessible Modal Dialog follows

============================================
 License for Application
 ============================================

 This license is governed by United States copyright law, and with respect to matters
 of tort, contract, and other causes of action it is governed by North Carolina law,
 without regard to North Carolina choice of law provisions.  The forum for any dispute
 resolution shall be in Wake County, North Carolina.

 Redistribution and use in source and binary forms, with or without modification, are
 permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice, this list
 of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright notice, this
 list of conditions and the following disclaimer in the documentation and/or other
 materials provided with the distribution.

 3. The name of the author may not be used to endorse or promote products derived from
 this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE AUTHOR "AS IS" AND ANY EXPRESS OR IMPLIED
 WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY
 AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE AUTHOR BE
 LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

 */

// jQuery formatted selector to search for focusable items
var focusableElementsString = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";

// store the item that has focus before opening the modal window
var focusedElementBeforeModal;


$(document).ready(function() {

  $('a[href="cheatsheet.html"]').on('click',function(event) {
    showModal($('#modalContent'));
    event.preventDefault();
  });

  // handle click on X or Ok button in modal dialog
  $(document).on('click','#modalXButton, #modalOkButton',function(event) {
    hideModal();
  })

  $('#modalContent').keydown(function(event) {
    trapTabKey($(this), event);
    trapEscapeKey($(this), event);
  })
});

function trapEscapeKey(obj, evt) {

  // if escape pressed
  if (evt.which == 27) {

    // get list of all children elements in given object
    var o = obj.find('*');

    // get list of focusable items
    var cancelElement;
    cancelElement = o.filter("#modalXButton")

    // close the modal window
    cancelElement.click();
    evt.preventDefault();
  }
}

function trapTabKey(obj, evt) {

  // if tab or shift-tab pressed
  if (evt.which == 9) {

    // get list of all children elements in given object
    var o = obj.find('*');

    // get list of focusable items
    var focusableItems;
    focusableItems = o.filter(focusableElementsString).filter(':visible')

    // get currently focused item
    var focusedItem;
    focusedItem = $(':focus');

    // get the number of focusable items
    var numberOfFocusableItems;
    numberOfFocusableItems = focusableItems.length

    // get the index of the currently focused item
    var focusedItemIndex;
    focusedItemIndex = focusableItems.index(focusedItem);

    if (evt.shiftKey) {
      //back tab
      // if focused on first item and user preses back-tab, go to the last focusable item
      if (focusedItemIndex == 0) {
        focusableItems.get(numberOfFocusableItems - 1).focus();
        evt.preventDefault();
      }
    }
    else {
      //forward tab
      // if focused on the last item and user preses tab, go to the first focusable item
      if (focusedItemIndex == numberOfFocusableItems - 1) {
        focusableItems.get(0).focus();
        evt.preventDefault();
      }
    }
  }
}

function setInitialFocusModal(obj) {
  // get list of all children elements in given object
  var o = obj.find('*');

  // set focus to first focusable item
  var focusableItems;
  focusableItems = o.filter(focusableElementsString).filter(':visible').first().focus();
}

function setFocusToFirstItemInModal(obj){
  // get list of all children elements in given object
  var o = obj.find('*');

  // set the focus to the first keyboard focusable item
  o.filter(focusableElementsString).filter(':visible').first().focus();
}

function showModal(obj) {
  $('#content').attr('aria-hidden', 'true'); // mark the main content as hidden
  $('#modalMask').css('display', 'block'); // make the mask visible (visual indication that background is unavailable)
  $('#modalContent').css('display','block').attr('aria-hidden','false'); // make the modal window visible
  // attach a listener to redirect the tab to the modal window if the user somehow gets out of the modal window
  $('body').on('focusin','#mainPage',function() {
    setFocusToFirstItemInModal($('#modalContent'));
  })

  // save focus that triggered modal
  focusedElementBeforeModal = $(':focus');

  setFocusToFirstItemInModal(obj);
}

function hideModal() {
  $('#modalMask').css('display', 'none'); // remove the overlay
  $('#modalContent').css('display', 'none').attr('aria-hidden','true'); // hide the modal window
  $('#content').attr('aria-hidden', 'false'); // mark the main content as visible
  // remove the listener which redirects tab keys in the main content area to the modal
  $('body').off('focusin','#mainPage');

  // set focus back to element that had it before the modal was opened
  focusedElementBeforeModal.focus();
}