;(function() {
    function GoodsDB() {
        this._goods = [];
    }

    // constants

    GoodsDB.prototype.MAX_GOOD_NAME_LENGTH = 20;

    // methods

    GoodsDB.prototype.append = function(name, count, price) {
        if (this.isGoodDataValid(name, count, price)) {
            this._goods.push(new Good(name, count, price));
        }
    };

    GoodsDB.prototype.editGood = function(id, name, count, price) {
        if (this.isGoodDataValid(name, count, price) && this._goods[id] instanceof Good) {
            this._goods[id].name = name;
            this._goods[id].count = count;
            this._goods[id].price = price;
        }
    }

    GoodsDB.prototype.getGoods = function() {
        return this._goods.slice();
    };

    GoodsDB.prototype.isGoodExists = function(id) {
        return this._goods[id] instanceof Good;
    };

    GoodsDB.prototype.removeGood = function(id) {
        this._goods[id] = undefined;
    };

    GoodsDB.prototype.search = function(query) {
        return this._goods.filter(function(good) {
            if (good === undefined) {
                return -1;
            }

            var lowerNameOfGood = good.name.toLowerCase();

            return lowerNameOfGood.indexOf(query.toLowerCase()) >= 0;
        });
    };

    GoodsDB.prototype.isGoodDataValid = function(name, count, price) {
        return this.isNameValid(name) && this.isCountValid(count) && this.isPriceValid(price);
    };

    GoodsDB.prototype.isNameValid = function(name) {
        return !!name.trim() && name.length <= this.MAX_GOOD_NAME_LENGTH;
    };

    GoodsDB.prototype.isCountValid = function(count) {
        return isFinite(count) && count > 0 && isInteger(count);
    };

    GoodsDB.prototype.isPriceValid = function(price) {
        return isFinite(price) && price > 0;
    };

    GoodsDB.prototype.toSrting = function() {
        return '[object GoodsDB]';
    };

    Object.defineProperty(GoodsDB.prototype, 'toSrting', {
        'writable': false,
        'configurable': false,
        'enumerable': false
    });

    Object.defineProperty(GoodsDB.prototype, 'length', {
        'configurable': false,
        'enumerable': false,
        'get': function() {
            return this._goods.length;
        }
    })


    function Good(name, count, price) {
        this.name = name;
        this.count = count;
        this.price = price;
    }

    Good.prototype.toSrting = function() {
        return '[object Good: name=' + this.name + ' count=' + this.count + ' price=' + this.price + ']';
    };

    Object.defineProperty(Good.prototype, 'toString', {
        'writable': false,
        'configurable': false,
        'enumerable': false
    });


    function isInteger(num) {
        return Math.round(num) === num;
    }


    window.GoodsDB = GoodsDB;
})();