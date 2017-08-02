(function (EMOGI) {
   let lastFocus = 0;
   const config = {
      emogis: [{
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
      
   placeCaret = (el) => {
      if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
         let range = document.createRange(),
            operatedSelection = lastFocus,
            operatedChildNode;
         range.selectNodeContents(el);
         for (let index = 0; index < el.childNodes.length; index++) {
            const elmNode = el.childNodes[index];
            if (elmNode.length > operatedSelection || (elmNode.localName === 'img' && operatedSelection === 0)) {
               operatedChildNode = el.childNodes[index + 1];
               break;
            } else {
               operatedSelection -= elmNode.length ? elmNode.length : elmNode.outerHTML.length;
            }
         }
         range.setStart(operatedChildNode, operatedSelection);
         range.collapse(true);
         let sel = window.getSelection();
         sel.removeAllRanges();
         sel.addRange(range);

      }
      el.focus();
   };


   EMOGI.changeHandler = (_this) => {
      let valueOfInput = _this.innerHTML,
         twoChar,
         isShortCutFound = false,
         emogiName = '';

      config.emogis.forEach((emogi, index) => {
         valueOfInput = valueOfInput.replace(new RegExp(emogi.uniCode, 'gi'), emogi.spacialChar).replace(new RegExp('&nbsp;', 'gi'), ' ');

         if (valueOfInput.indexOf(emogi.sortCut) !== -1) {

            const indexOfSortCut = valueOfInput.indexOf(emogi.sortCut),
               lastIndexAfterShortCut = valueOfInput.substring(indexOfSortCut + emogi.sortCut.length, valueOfInput.length);;
            isShortCutFound = true;
            lastFocus = indexOfSortCut;
            valueOfInput = valueOfInput.substring(0, indexOfSortCut);

            valueOfInput += '<img src="' + imgRoot + emogi.imgName + '.png" width="20" height="20"> ';
            valueOfInput += lastIndexAfterShortCut;
         }

      });
      if (isShortCutFound) {
         isShortCutFound = false;
         _this.innerHTML = valueOfInput;
         placeCaret(_this);

      }
   };
} (EMOGI = window.EMOGI = {}));