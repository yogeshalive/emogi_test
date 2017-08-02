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
   };


   EMOGI.changeHandler = (_this) => {
      let valueOfInput = _this.innerHTML,
         twoChar,
         isShortCutFound = false;

      config.emogis.forEach((emogi, index) => {
            valueOfInput = valueOfInput.replace(new RegExp(emogi.uniCode, 'gi'), emogi.spacialChar);
            if (valueOfInput.indexOf(emogi.sortCut) !== -1) {
                  const indexOfSortCut = valueOfInput.indexOf(emogi.sortCut),
                  lastIndexAfterShortCut = valueOfInput.substring(indexOfSortCut + emogi.sortCut.length , valueOfInput.length);;
                  isShortCutFound = true;
                  valueOfInput = valueOfInput.substring(0, indexOfSortCut);

                  valueOfInput+= '<img src="'+ imgRoot + emogi.imgName +'.png" width="20" height="20">';
                  valueOfInput+= lastIndexAfterShortCut;
            }
            
      });
      if (isShortCutFound) {
         isShortCutFound = false;
         _this.innerHTML = valueOfInput;
         placeCaretAtEnd(_this);
      }
   };
}(EMOGI = window.EMOGI = {}));