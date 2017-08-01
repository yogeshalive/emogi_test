(function (EMOGI) {
   
   const config = {
      emogis : [{
         sortCut: ':)',
         imgName: 'smile',
         spacialChar: '',
         uniCode: '',
      }, {
         sortCut: '<3',
         spacialChar: '<',
         uniCode: '&lt;',
         imgName: 'heart'
      }]
   },
   imgRoot = './assets/';
   placeCaretAtEnd = (el) => {
      el.focus();
      if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
         var range = document.createRange();
         range.selectNodeContents(el);
         range.collapse(false);
         var sel = window.getSelection();
         sel.removeAllRanges();
         sel.addRange(range);
      } else if (typeof document.body.createTextRange != "undefined") {
         var textRange = document.body.createTextRange();
         textRange.moveToElementText(el);
         textRange.collapse(false);
         textRange.select();
      }
}


   EMOGI.changeHandler = (_this) => {
      let valueOfInput = _this.innerHTML,
         lastTwoChar,
         isShortCutFound = false;

      config.emogis.forEach((emogi, index) => {
         valueOfInput = valueOfInput.replace(new RegExp( emogi.uniCode, 'gi'), emogi.spacialChar);
         lastTwoChar = valueOfInput.substring(valueOfInput.length-2, valueOfInput.length);
         if (lastTwoChar === emogi.sortCut) {
            isShortCutFound = true;
            valueOfInput = valueOfInput.substring(0, valueOfInput.length-2);
            valueOfInput+= '<img src="'+ imgRoot + emogi.imgName +'.png" width="20" height="20">'
         }
      });
      if (isShortCutFound) {
         isShortCutFound = false;
         _this.innerHTML = valueOfInput;
         placeCaretAtEnd(_this);
      }
   };
}(EMOGI = window.EMOGI = {}));