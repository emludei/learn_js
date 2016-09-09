;(function() {
    window.PriceListUtils = {};

    PriceListUtils.showElement = function(elem) {
        if (elem.getAttribute('hidden') == 'true') {
            elem.setAttribute('hidden', 'false');
        }
    };

    PriceListUtils.hideElement = function(elem) {
        elem.setAttribute('hidden', 'true');
    };

    PriceListUtils.clearGoodsEditor = function() {
        var editorInputs = document.querySelectorAll('#js-goods-editor input');

        for (var i = 0; i < editorInputs.length; i++) {
            editorInputs[i].value = '';
        }
    };

})();