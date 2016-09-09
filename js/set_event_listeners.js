;(function() {
    function setEventListeners() {
        var buttonAddNewGood = document.getElementById('js-add-new-good');
        var priceList = document.getElementById('js-price-list');
        var buttonGoodsEditorSubmit = document.getElementById('js-goods-editor-submit');
        var searchForm = document.getElementById('js-search-form')

        buttonAddNewGood.addEventListener('click', getAddGoodHandler());
        priceList.addEventListener('click', getPriceListHandler());
        buttonGoodsEditorSubmit.addEventListener('click', getGoodsEditorSubmitHandler());
        searchForm.addEventListener('submit', getSearchHandler());
    }

    function getAddGoodHandler() {
        return function(event) {
            var goodsEditor = document.getElementById('js-goods-editor');

            document.getElementById('js-goods-editor-submit').innerHTML = 'Add';

            PriceListUtils.clearGoodsEditor();
            PriceListUtils.showElement(goodsEditor);

            event.preventDefault();
        }
    }

    function getPriceListHandler() {
        return function(event) {
            switch (event.target.id) {
                case 'js-good-edit':
                    handleEditGoodEvent(event);
                    break;
                case 'js-good-remove':
                    handleRemoveGoodEvent(event);
                    break;
            }

            event.preventDefault();
        }
    }

    function handleEditGoodEvent(event) {
        var goodsEditor = document.getElementById('js-goods-editor');
        var currentRowCells = event.target.closest('tr').cells;
        var editorInputs = goodsEditor.querySelectorAll('input');

        document.getElementById('js-goods-editor-submit').innerHTML = 'Update';

        for (var i = 0; i < editorInputs.length; i++) {
            editorInputs[i].value = currentRowCells[i].innerHTML;
        }

        PriceListUtils.showElement(goodsEditor);
    }

    function handleRemoveGoodEvent(event) {
        var currentRowCells = event.target.closest('tr');
        var goodId = currentRowCells.getAttribute('data-id');

        PriceListDB.removeGood(goodId);
        PriceList.removeGood(goodId);
    }

    function getGoodsEditorSubmitHandler() {
        return function(event) {
            var goodsEditor = document.getElementById('js-goods-editor');
            var editorInputs = goodsEditor.querySelectorAll('input');

            var id = editorInputs[0].value;
            var name = editorInputs[1].value;
            var count = +editorInputs[2].value;
            var price = +editorInputs[3].value;

            if (PriceListDB.isGoodDataValid(name, count, price)) {
                if (id && PriceListDB.isGoodExists(id)) {
                    PriceListDB.editGood(id, name, count, price);
                    PriceList.editGood(id, name, count, price);
                } else if (!id) {
                    PriceListDB.append(name, count, price);
                    PriceList.appendRow(PriceListDB.length - 1, name, count, price);
                }

            } else {
                alert('Data is not valid');
            }

            event.preventDefault();
        }
    }

    function getSearchHandler() {
        return function(event) {
            var query = this.querySelector('input').value;
            var goods = PriceListDB.search(query);

            PriceList.renderRows(goods, true);

            event.preventDefault();
        }
    }


    setEventListeners();

})();