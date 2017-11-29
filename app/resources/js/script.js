'use strict';
/**
 * @file script.js
 *
 * @author AndryYatsevich
 * @date 13/11/2017
 */

$(document).ready(function () {

    var product = [
        {id: 0, name: 'Товар 4', email: 'product1@mail.com', count: 5, price: 12321232123.2, delivery: 'Пусто'},
        {
            id: 1,
            name: 'Товар 55',
            email: 'product2@mail.com',
            count: 2,
            price: 1202223.2334341,
            delivery: 'Страна',
            countries: 1
        },
        {
            id: 2,
            name: 'Товар 3',
            email: 'product3@mail.com',
            count: 7,
            price: 73000000.4343,
            delivery: 'Город',
            checkedAllCheckbox: [true, true, true]
        },
        {
            id: 3,
            name: 'Товар 5',
            email: 'product3@mail.com',
            count: 7,
            price: 73003453000.4343,
            delivery: 'Город',
            checkedAllCheckbox: [true, true, true]
        },
        {
            id: 4,
            name: 'Товар 555',
            email: 'product3@mail.com',
            count: 7,
            price: 730000.4343,
            delivery: 'Город',
            checkedAllCheckbox: [true, true, true]
        }];
    var productSort = [].concat(product); //
    var $productList = $('#productList');
    var $tbody = $('tbody', $productList);
    var dataNumber;
    var modal;
    var $nameProduct = $('#nameProduct');
    var $requiredNameProduct = $('#requiredNameProduct');
    var $count = $('#count');
    var $requiredCount = $('#requiredCount');
    var $price = $('#price');
    var $requiredPrice = $('#requiredPrice');
    var $btnModal = $('#btnModal');
    var $email = $('#email');
    var $requiredEmail = $('#requiredEmail');
    var $countries = $('#countries');
    var $cities = $('#cities');
    var $modalHeader = $('.modal-window-header');
    var $html = $('html');
    var validationFields = {name: false, email: false, count: false, price: false};
    var validationValue = true;

    var validation = {
        'productName': function () {
            var $nameProductVal = $nameProduct.val();
            if ($nameProductVal.length < 3 || $nameProductVal.length > 20 || !$nameProductVal.length) {
                changeClassesValidation($nameProduct, 'dangerInput');
                changeClassesValidation($requiredNameProduct, 'incorrectly');
                !$nameProductVal.length ? $requiredNameProduct.text('Поле обязательно для заполнения')
                    : $requiredNameProduct.text('Минимальное количество символов 3, максимальное 20.');
                validationFields.name = false;
            } else {
                changeClassesValidation($nameProduct, 'successInput');
                changeClassesValidation($requiredNameProduct, 'correctField');
                validationFields.name = true;
            }
        },
        'email': function () {
            var valEmail = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
            var $mailVal = $email.val();
            if (!$mailVal || !valEmail.test($mailVal)) {
                changeClassesValidation($email, 'dangerInput');
                changeClassesValidation($requiredEmail, 'incorrectly');
                !$mailVal ? $requiredEmail.text('Поле обязательно для заполнения')
                    : $requiredEmail.text('Поле заполнено не корректно');
                validationFields.email = false;
            } else {
                changeClassesValidation($email, 'successInput');
                changeClassesValidation($requiredEmail, 'correctField');
                validationFields.email = true;
            }
        },
        'price': function () {
            var countNumber = Number($price.val());
            var priceVal = $price.val();

            if (!priceVal || !countNumber) {
                changeClassesValidation($price, 'dangerInput');
                changeClassesValidation($requiredPrice, 'incorrectly');
                !priceVal ? $requiredPrice.text('Поле обязательно для заполнения')
                    : $requiredPrice.text('Должны быть введены только цифры');
                validationFields.price = false;
            } else {
                changeClassesValidation($price, 'successInput');
                changeClassesValidation($requiredPrice, 'correctField');
                validationFields.price = true;
            }
        },
        'count': function () {
            var countNumber = Number($count.val());
            var countVal = $count.val();

            if (!countVal || !countNumber) {
                changeClassesValidation($count, 'dangerInput');
                changeClassesValidation($requiredCount, 'incorrectly');
                !countVal ? $requiredCount.text('Поле обязательно для заполнения')
                    : $requiredCount.text('Должны быть введены только цифры');
                validationFields.count = false;
            } else {
                changeClassesValidation($count, 'successInput');
                changeClassesValidation($requiredCount, 'correctField');
                validationFields.count = true;
            }
        }
    };

    function changeClassesValidation(obj, status) {

        obj
            .toggleClass('input-danger', status === 'dangerInput')
            .toggleClass('input-success', status === 'successInput');

        if (status === 'correctField') {
            obj
                .text('Поле заполнено корректно')
                .removeClass('hidden')
                .addClass('visible required-success');
        }

        if (status === 'incorrectly') {
            obj
                .removeClass('hidden required-success')
                .addClass('visible required');
        }
    }

    $('#search').on('click', function () {
        $sortArrowsName.addClass('hidden');
        $sortName.attr('data-sortStep', 'first');
        $sortArrowsPrice.addClass('hidden');
        $sortPrice.attr('data-sortStep', 'first');
        productSort = [];
        var inputSearch = $('#inputSearch').val().toLowerCase();

        for (var i = 0; i < product.length; i++) {
            if (product[i].name.toLowerCase().indexOf(inputSearch) !== -1) {
                productSort.push(product[i]);
            }
        }
        render(productSort);
    });

    $nameProduct.keyup(validation.productName);
    $count.keyup(validation.count);
    $price.keyup(validation.price);
    $email.keyup(validation.email);

    $nameProduct.blur(correct);
    $count.blur(correct);
    $price.blur(correct);
    $email.blur(correct);

    function correct() {

        validationValue = true;

        for (var key in validationFields) { //hasOwnProperty
            if (!validationFields.hasOwnProperty(key)) continue;
            if (!validationFields[key]) {
                validationValue = false;
            }
        }
        $btnModal.toggleClass('disabled', !validationValue);
    }

    function render(product) {
        $tbody.empty();
        var tr;
        var price, separatePrice, separateFirstPartPrice, comma;

        for (var i = 0; i < product.length; i++) {
            price = product[i].price.toFixed(2);
            separatePrice = price.split('.');
            comma = [];
            separateFirstPartPrice = separatePrice[0].split('');
            for (var p = separateFirstPartPrice.length; p > 0; p--) {

                comma.push(separateFirstPartPrice[p - 1]);
                if ((separateFirstPartPrice.length - (p - 1)) % 3 === 0 && p !== 1) {
                    comma.push(',');
                }
            }
            comma.reverse();
            separatePrice[0] = comma.join('');
            price = separatePrice.join('.');

            tr = $('<tr></tr>');
            tr.append(
                $('<td></td>').text(product[i].name).append(
                    $('<span></span>').addClass('badge pull-right').text(product[i].count)
                ),
                $('<td></td>').text('$' + price),
                $('<td></td>').append(
                    $('<button></button>').addClass('btn btn-success').text('Edit'),
                    $('<span> </span>'),
                    $('<button></button>').addClass('btn btn-danger').text('Delete')
                )
            ).attr('data-number', product[i].id);
            $tbody.append(tr);
        }
    }

    var $modalDelete = $('#modalDelete');
    var $overlay = $('#overlay');
    var $modalAdd = $('#modalAdd');
    var productSortObj;

    $productList.on('click', '.btn-danger', function () {

        if (modal) {
            modal.css('display', 'none');
            $html.css('overflow-y', 'auto');
        }
        modal = $modalDelete;
        var $this = $(this);

        $modalDelete.css('display', 'block');
        $overlay.css('display', 'block');
        $html.css('overflow-y', 'hidden');
        dataNumber = $this.closest('tr').attr('data-number');
        productSortObj = productSort.filter(function (v) {
            return v.id == dataNumber;
        });
    });

    $modalDelete.on('click', '.btn-danger', function () {
        hideModal($modalDelete);
    });

    $modalDelete.on('click', '.btn-success', function () {
        product = product.filter(function (v) {
            return !(v.id == dataNumber);
        });
        productSort = productSort.filter(function (v) {
            return !(v.id == dataNumber);
        });
        productSortFirst = productSortFirst.filter(function (v) {
            return !(v.id == dataNumber);
        });
        render(productSort);
        $html.css('overflow-y', 'auto');
        hideModal($modalDelete);
    });

    $('#addNew').on('click', function () {          //модалка Add
        validationFields = {name: false, email: false, count: false, price: false};
        correct();
        if (modal) {
            modal.css('display', 'none');
            $html.css('overflow-y', 'auto');
        }
        $('#addProductForm')[0].reset();
        modal = $modalAdd;
        $('.modal-button').attr('data-id', 'btnAdd').text('Add');
        $modalHeader.text('Add new product.');

        $html.css('overflow-y', 'hidden');
        modal.css('display', 'block');
        $overlay.css('display', 'block');
    });

    $productList.on('click', '.btn-success', function () { //модалка update

        validationFields = {name: false, email: false, count: false, price: false};

        if (modal) {
            modal.css('display', 'none');
            $html.css('overflow-y', 'auto');
        }

        modal = $modalAdd;
        showModal(modal);

        $modalHeader.text('Edit product.');
        $btnModal.removeClass('disabled');
        $('.modal-button').attr('data-id', 'btnUpd').text('Update');
        $html.css('overflow-y', 'hidden');

        var $this = $(this);
        dataNumber = $this.closest('tr').attr('data-number');
        productSortObj = productSort.filter(function (v) {
            return v.id == dataNumber;
        });
        $nameProduct.val(productSortObj[0].name);
        $email.val(productSortObj[0].email);
        $count.val(productSortObj[0].count);
        $price.val(productSortObj[0].price);
        validation.productName();
        validation.email();
        validation.count();
        validation.price();
        correct();
        var val = productSortObj[0].delivery;
        $sel.val(val);
        if (val === 'Страна') {
            $countries.removeClass('hidden').addClass('visible');
            $('[data-radio=' + productSortObj[0].countries + ']').prop('checked', true);
        } else if (val === 'Пусто') {
            $cities.removeClass('visible').addClass('hidden');
            $countries.removeClass('visible').addClass('hidden');
        } else {
            $cities.removeClass('hidden').addClass('visible');
            var checkAll = true;
            for (var j = 0; j < productSortObj[0].checkedAllCheckbox.length; j++) {
                if (!productSortObj[0].checkedAllCheckbox[j]) {
                    checkAll = false;
                }
                $('[data-check=' + j + ']').prop('checked', productSortObj[0].checkedAllCheckbox[j]);
                $checkAll.prop('checked', checkAll);
            }
        }
    });

    $(document).on('click', function (e) {
        if (e.target.className === 'overlay') {
            $html.css('overflow-y', 'auto');
            $modalAdd.css('display', 'none');
            $modalDelete.css('display', 'none');
            $overlay.css('display', 'none');
            hiddenRequiredFieldsText();
            validationValue = false;
        }
    });

    var $sel = $('#delivery');
    $sel.on('click', function () {

        var val = $sel.val();

        $countries
            .toggleClass('hidden', val !== 'Страна')
            .toggleClass('visible', val === 'Страна');

        $cities
            .toggleClass('hidden', val !== 'Город')
            .toggleClass('visible', val === 'Город');
    });

    var $checkAll = $('#checkAll');

    $checkAll.click(selectAll);
    var checkedAllCheckbox = [false, false, false];
    $('#checkHab').click(checkedCheckbox);
    $('#checkSar').click(checkedCheckbox);
    $('#checkMsk').click(checkedCheckbox);

    function checkedCheckbox() {
        checkedAllCheckbox[$(this).attr('data-check')] = !!$(this).is(':checked');

        var checkAll = true;
        for (var j = 0; j < checkedAllCheckbox.length; j++) {
            if (!checkedAllCheckbox[j]) {
                checkAll = false;
            }
        }
        $checkAll.prop('checked', checkAll);
    }

    function selectAll() {
        $('input[type=checkbox]').each(function () {
            $(this).prop('checked', $checkAll.prop('checked'));
        });
        return checkedAllCheckbox = [true, true, true];
    }

    $('input[type=radio]').click(checkedRadio);
    var selectedRadio;

    function checkedRadio() {
        return selectedRadio = $(this).attr('data-radio');
    }

    $btnModal.click(function () {
        if ($btnModal.attr('data-id') === 'btnAdd') {
            return addProduct();

        }
        if ($btnModal.attr('data-id') === 'btnUpd') {
            return updProduct();
        }
    });

    var $sortName = $('#sortName');
    var $sortArrowsName = $('#sortArrowsName');

    var $sortPrice = $('#sortPrice');
    var $sortArrowsPrice = $('#sortArrowsPrice');

    $sortName.click(function () {
        sort($sortName, $sortArrowsName, 'name', $sortPrice, $sortArrowsPrice);
    });

    $sortPrice.click(function () {
        sort($sortPrice, $sortArrowsPrice, 'price', $sortName, $sortArrowsName);
    });
    var productSortFirst = [];

    function sort(sortFieldName, sortArrows, sortField, otherSortFieldName, otherArrows) {
        var sortVal = sortFieldName.attr('data-sortStep');

        otherArrows.addClass('hidden');
        otherSortFieldName.attr('data-sortStep', 'first');
        switch (sortVal) {
            case 'first':
                productSortFirst = [].concat(productSort);
                sortFieldName.attr('data-sortStep', 'second');
                productSort.sort(sortNameUp(sortField));
                break;
            case 'second':
                sortFieldName.attr('data-sortStep', 'third');
                productSort.sort(sortNameDown(sortField));
                break;
            case 'third':
                sortFieldName.attr('data-sortStep', 'first');
                productSort = [].concat(productSortFirst);
                break
        }
        sortArrows
            .toggleClass('glyphicon-chevron-up', sortVal === 'first')
            .toggleClass('glyphicon-chevron-down', sortVal === 'second')
            .toggleClass('hidden', sortVal === 'third');
        render(productSort);
    }

        function sortNameUp(prop) {
            return function (a, b) {
                var c = b[prop];
                var d = a[prop];
                return c > d;
            }
        }

        function sortNameDown(prop) {
            return function (a, b) {
                var c = b[prop];
                var d = a[prop];
                return c < d;
            }
        }

        function addProduct() {
            if (validationValue) {
                validationFields = {name: false, email: false, count: false, price: false};
                var newProduct = {};
                newProduct.name = $('#nameProduct').val();
                newProduct.email = $('#email').val();
                newProduct.count = parseInt($('#count').val());
                newProduct.price = parseInt($('#price').val());
                newProduct.delivery = $sel.val();
                if ($sel.val() === 'Страна') {
                    newProduct.countries = selectedRadio;
                } else {
                    newProduct.checkedAllCheckbox = [].concat(checkedAllCheckbox);
                }
                checkedAllCheckbox = [false, false, false];

                product.push(newProduct);
                productSort.push(newProduct);
                $html.css('overflow-y', 'auto');
                hiddenRequiredFieldsText();
                $btnModal.addClass('disabled');
                hideModal($modalAdd);

                render(productSort);
                validationFields = {name: false, email: false, count: false, price: false};

                $('#addProductForm')[0].reset();
            } else {
                alert('Заполните корректно все обязательные поля');
            }
        }

        function updProduct() {
            if (validationValue) {
                productSortObj = productSort.filter(function (v) {
                    return v.id == dataNumber;
                });
                productSortObj[0].name = $('#nameProduct').val();
                productSortObj[0].email = $('#email').val();
                productSortObj[0].count = parseInt($('#count').val());
                productSortObj[0].price = parseInt($('#price').val());
                productSortObj[0].delivery = $sel.val();
                if ($sel.val() === 'Страна') {
                    productSortObj[0].countries = selectedRadio;
                } else {
                    productSortObj[0].checkedAllCheckbox = [].concat(checkedAllCheckbox);
                }
                checkedAllCheckbox = [false, false, false];
                hiddenRequiredFieldsText();
                render(productSort);
                $html.css('overflow-y', 'auto');
                hideModal($modalAdd);
                validationFields = {name: false, email: false, count: false, price: false};
            } else {
                alert('Заполните корректно все обязательные поля');
            }
        }

        function showModal(modal) {
            modal.css('display', 'block');
            $overlay.css('display', 'block');
        }

        function hideModal(modal) {
            modal.css('display', 'none');
            $overlay.css('display', 'none');
        }

        function hiddenRequiredFieldsText() {
            $requiredNameProduct.removeClass('visible').addClass('hidden');
            $requiredCount.removeClass('visible').addClass('hidden');
            $requiredPrice.removeClass('visible').addClass('hidden');
            $requiredEmail.removeClass('visible').addClass('hidden');
            $countries.removeClass('visible').addClass('hidden');
            $cities.removeClass('visible').addClass('hidden');
            $nameProduct.removeClass('input-success input-danger');
            $email.removeClass('input-success input-danger');
            $count.removeClass('input-success input-danger');
            $price.removeClass('input-success input-danger');
        }

        render(productSort);
    }
);
