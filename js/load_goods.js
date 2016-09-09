;(function() {
    window.PriceList = {
        'priceListTable': document.getElementById('js-price-list')
    };

    PriceList.createRow = function(id, name, count, price) {
        var row = document.createElement('tr');

        row.setAttribute('data-id', id);

        for (var i = 0; i < 4; i++) {
            var td = document.createElement('td');
            td.innerHTML = arguments[i];

            row.appendChild(td);
        }

        td = document.createElement('td');

        td.appendChild(this.createEditGoodLink());
        td.appendChild(this.createRemoveGoodLink());
        row.appendChild(td);

        return row
    };

    PriceList.createEditGoodLink = function() {
        var a = document.createElement('a');

        a.href = '#';
        a.id = 'js-good-edit';
        a.className = 'btn btn-blue'
        a.innerHTML = 'Edit';

        return a;
    };

    PriceList.createRemoveGoodLink = function() {
        var a = document.createElement('a');

        a.href = '#';
        a.id = 'js-good-remove';
        a.innerHTML = 'Remove';
        a.className = 'btn btn-red';

        return a;
    };

    PriceList.editGood = function(id, name, count, price) {
        var currentRowCells = this.priceListTable.querySelector('tr[data-id="' + id + '"]').cells;

        if(currentRowCells) {
            for (var i = 0; i < arguments.length; i++) {
                currentRowCells[i].innerHTML = arguments[i];
            }
        }

        PriceListUtils.clearGoodsEditor();
    };

    PriceList.appendRow = function(id, name, count, price) {
        var tr = this.createRow(id, name, count, price);
        var currentRowCells = tr.cells;

        this.priceListTable.appendChild(tr);

        PriceListUtils.clearGoodsEditor();
        PriceListUtils.showElement(this.priceListTable);
        PriceListUtils.hideElement(document.getElementById('js-price-list-is-empty'))
    };

    PriceList.removeGood = function(id) {
        var rowToRemove = this.priceListTable.querySelector('tr[data-id="' + id + '"]');
        this.priceListTable.removeChild(rowToRemove);

        if (this.priceListTable.rows.length <= 1) {
            PriceListUtils.hideElement(this.priceListTable);
        }
    };

    PriceList.clearPriceList = function() {
        while (this.priceListTable.rows.length > 1) {
            this.priceListTable.removeChild(this.priceListTable.rows[1]);
        }
    };

    PriceList.renderRows = function(goods, clearFlag) {
        var trList = document.createDocumentFragment();

        if (clearFlag) {
            this.clearPriceList();
        }

        if (!goods.length) {
            var priceListIsEmpty = document.getElementById('js-price-list-is-empty');

            PriceListUtils.hideElement(this.priceListTable);
            PriceListUtils.showElement(priceListIsEmpty);

            return;
        }

        for (var i = 0; i < goods.length; i++) {
            if (goods[i] !== undefined) {
                trList.appendChild(PriceList.createRow(i, goods[i].name, goods[i].count, goods[i].price));
            }
        }

        this.priceListTable.appendChild(trList);
    };

    PriceList.loadGoodsToPriceList = function() {
        var goods = PriceListDB.getGoods();

        this.renderRows(goods);
    };


    PriceList.loadGoodsToPriceList();

})();