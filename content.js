/**
 * @author Jason Parrott
 *
 * Copyright (C) 2014 Jason Parrott.
 * This code is licensed under the zlib license. See LICENSE for details.
 */

(function() {

  var mContainer = null;

  if (document.readyState === 'complete') {
    initialize();
  } else {
    window.addEventListener('load', initialize, false);
  }

  function initialize() {
    mContainer = document.getElementById('_timeLine');

    if (mContainer === null) {
      console.error('Could not find main timeline element. Aborting!');

      return;
    }

    var tWatcher = new MutationObserver(timelineObserver);

    tWatcher.observe(mContainer, {
      childList: true
    });
  }

  function timelineObserver(pMutations) {
    var i, il, j, jl, n, nl, m;
    var tNodes;
    var tNode;
    var tPreList, tPreListNode, tPreNodes, tPreNode;

    // 0 = Not checked
    // 1 = Not needed
    // 2 = Needed
    var tScrollStatus = 0;

    function checkScroll() {
      tScrollStatus = (mContainer.scrollHeight - (mContainer.scrollTop + mContainer.offsetHeight)) === 0 ? 2 : 1;
    }

    for (i = 0, il = pMutations.length; i < il; i++) {
      tNodes = pMutations[i].addedNodes;

      for (j = 0, jl = tNodes.length; j < jl; j++) {
        tNode = tNodes[j];

        if (tNode.classList.contains('_message')) {
          tPreList = tNode.querySelectorAll('pre, div.quoteText');

          for (n = 0, nl = tPreList.length; n < nl; n++) {
            tPreListNode = tPreList[n];
            tPreNodes = tPreListNode.childNodes;

            for (m = tPreNodes.length - 1; m >= 0; m--) {
              tPreNode = tPreNodes[m];

              if (tPreNode.nodeType !== 3) {
                // Don't do anything with non-text nodes.
                continue;
              }

              if (tScrollStatus === 0) {
                // Delay this as much as possible
                // to avoid unneeded layouts.
                checkScroll();
              }

              processNode(tPreNode);
            }
          }
        }
      }

      if (tScrollStatus === 2) {
        mContainer.lastElementChild.scrollIntoViewIfNeeded();
      }
    }
  }

  function processNode(pNode) {
    var tParts = pNode.textContent.split('```');
    var tPart, tToAdd;
    var tIndex = -1;

    var i;
    var il = tParts.length;

    if (il <= 1) {
      return;
    }

    var tFragment = document.createDocumentFragment();
    var tIsCode = false;

    for (i = 0; i < il; i++) {
      tPart = tParts[i];

      if (!tIsCode) {
        if (tPart.length > 0) {
          tFragment.appendChild(document.createTextNode(tPart));
        }
      } else {
        if (tPart.length > 0) {
          tToAdd = document.createElement('x-chatworkcoder');

          if (tPart[0] === '|') {
            // Set the language
            tIndex = tPart.indexOf(' ');
            tToAdd.className = 'language-' + tPart.substring(1, tIndex);
            tPart = tPart.substr(tIndex + 1);
          }

          tToAdd.textContent = tPart;
          hljs.highlightBlock(tToAdd);

          tFragment.appendChild(tToAdd);
        }
      }

      tIsCode = !tIsCode;
    }

    pNode.parentNode.replaceChild(tFragment, pNode);
  }

}());