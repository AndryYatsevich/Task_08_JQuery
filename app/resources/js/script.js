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
    console.log(productSort, product);
    var $productList = $("#productList");
    var $tbody = $('tbody', $productList);
    var dataNumber;
    var modal;
    var $btnAdd;
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
    var validationFields = {name: false, email: false, count: false, price: false};
    var validationValue = true;
    var validation = {
        'productName': function () {

            if (!$nameProduct.val().length) {
                changeClassesValidation($nameProduct, 'dangerInput');
                changeClassesValidation($requiredNameProduct, 'incorrectly');
                $requiredNameProduct.text('Поле обязательно для заполнения');
                validationFields.name = false;
            } else if ($nameProduct.val().length < 3 && $nameProduct.val().length) {
                changeClassesValidation($nameProduct, 'dangerInput');
                changeClassesValidation($requiredNameProduct, 'incorrectly');
                $requiredNameProduct.text('Минимальное количество символов 3');
                validationFields.name = false;
            } else if ($nameProduct.val().length > 20) {
                changeClassesValidation($nameProduct, 'dangerInput');
                changeClassesValidation($requiredNameProduct, 'incorrectly');
                $requiredNameProduct.text('Максимально количество символов 20');
                validationFields.name = false;
            } else if ($nameProduct.val().length >= 3 && $nameProduct.val().length <= 20) {
                changeClassesValidation($nameProduct, 'successInput');
                changeClassesValidation($requiredNameProduct, 'correctField');
                validationFields.name = true;
                console.log(validationFields);
            }
        },
        'email': function () {
            var valEmail = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;

            if (!$email.val()) {
                changeClassesValidation($email, 'dangerInput');
                changeClassesValidation($requiredEmail, 'incorrectly');
                $requiredEmail.text('Поле обязательно для заполнения');
                validationFields.email = false;
            } else if (!valEmail.test($email.val())) {
                changeClassesValidation($email, 'dangerInput');
                changeClassesValidation($requiredEmail, 'incorrectly');
                $requiredEmail.text('Поле заполнено не корректно');
                validationFields.email = false;
            } else {
                changeClassesValidation($email, 'successInput');
                changeClassesValidation($requiredEmail, 'correctField');
                validationFields.email = true;
                console.log(validationFields);
            }
        },
        'price': function () {
            var countNumber = Number($price.val());
            if (!$price.val()) {
                changeClassesValidation($price, 'dangerInput');
                changeClassesValidation($requiredPrice, 'incorrectly');
                $requiredPrice.text('Поле обязательно для заполнения');
                validationFields.price = false;
            } else if (!countNumber) {
                changeClassesValidation($price, 'dangerInput');
                changeClassesValidation($requiredPrice, 'incorrectly');
                $requiredPrice.text('Должны быть введены только цифры');
                validationFields.price = false;
            } else {
                changeClassesValidation($price, 'successInput');
                changeClassesValidation($requiredPrice, 'correctField');
                validationFields.price = true;
                console.log(validationFields);
            }
        },
        'count': function () {
            var countNumber = Number($count.val());
            if (!$count.val()) {
                changeClassesValidation($count, 'dangerInput');
                changeClassesValidation($requiredCount, 'incorrectly');
                $requiredCount.text('Поле обязательно для заполнения');
                validationFields.count = false;
            } else if (!countNumber) {
                changeClassesValidation($count, 'dangerInput');
                changeClassesValidation($requiredCount, 'incorrectly');
                $requiredCount.text('Должны быть введены только цифры');
                validationFields.count = false;
            } else {
                changeClassesValidation($count, 'successInput');
                changeClassesValidation($requiredCount, 'correctField');
                validationFields.count = true;
                console.log(validationFields);
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
        productSort = [];
        var inputSearch = $('#inputSearch').val().toLowerCase();

        for (var i = 0; i < product.length; i++) {
            if (product[i].name.toLowerCase().indexOf(inputSearch) !== -1) {
                productSort.push(product[i]);
            }
            console.log(product[i].name.indexOf(inputSearch));
        }
        console.log('Product: ', product, 'ProductSort', productSort);
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

            if (!validationFields[key]) {
                console.log(validationValue);
                validationValue = false;
            }
            console.log(validationValue);
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


    var $modalDelete = $("#modalDelete");
    var $overlay = $("#overlay");
    var $modalAdd = $("#modalAdd");
    var productSortObj;

    $productList.on('click', '.btn-danger', function () {
        if (modal) {
            modal.css('display', 'none');
            $('html').css('overflow-y', 'auto');
        }
        modal = $modalDelete;
        var $this = $(this);

        $modalDelete.css('display', 'block');
        $overlay.css('display', 'block');
        $('html').css('overflow-y', 'hidden');
        dataNumber = $this.closest('tr').attr('data-number');
        productSortObj = productSort.filter(function (v) {
            return v.id == dataNumber;
        });
    });

    $modalDelete.on('click', '.btn-danger', function () {
        $modalDelete.css('display', 'none');
        $overlay.css('display', 'none');
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
        $('html').css('overflow-y', 'auto');
        $modalDelete.css('display', 'none');
        $overlay.css('display', 'none');
    });

    $("#addNew").on('click', function () {          //модалка Add
        validationFields = {name: false, email: false, count: false, price: false};
        correct();
        if (modal) {
            modal.css('display', 'none');
            $('html').css('overflow-y', 'auto');
        }
        $('#addProductForm')[0].reset();
        modal = $modalAdd;
        $('.modal-button').attr('data-id', 'btnAdd').text('Add');
        $('.modal-window-header').text('Add new product.');

        $('html').css('overflow-y', 'hidden');
        modal.css('display', 'block');
        $overlay.css('display', 'block');
    });

    $productList.on('click', '.btn-success', function () { //модалка update
        validationFields = {name: false, email: false, count: false, price: false};
        if (modal) {
            modal.css('display', 'none');
            $('html').css('overflow-y', 'auto');
        }
        console.log(validationValue);
        modal = $modalAdd;
        $('.modal-window-header').text('Edit product.');
        var $this = $(this);

        $btnModal.removeClass('disabled');

        $('.modal-button').attr('data-id', 'btnUpd').text('Update');

        $('html').css('overflow-y', 'hidden');
        $modalAdd.css('display', 'block');
        $overlay.css('display', 'block');

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
            console.log(productSortObj[0].countries);
            $('[data-radio=' + productSortObj[0].countries + ']').prop("checked", true);
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
                $('[data-check=' + j + ']').prop("checked", productSortObj[0].checkedAllCheckbox[j]);
                $checkAll.prop("checked", checkAll);
            }
        }
    });

    $(document).on('click', function (e) {
        if (e.target.className === 'overlay') {
            $('html').css('overflow-y', 'auto');
            $modalAdd.css('display', 'none');
            $modalDelete.css('display', 'none');
            $overlay.css('display', 'none');
            $nameProduct.removeClass('input-success input-danger');
            $requiredNameProduct.removeClass('visible').addClass('hidden');
            $count.removeClass('input-success input-danger');
            $requiredCount.removeClass('visible').addClass('hidden');
            $price.removeClass('input-success input-danger');
            $requiredPrice.removeClass('visible').addClass('hidden');
            $email.removeClass('input-success input-danger');
            $requiredEmail.removeClass('visible').addClass('hidden');
            $countries.removeClass('visible').addClass('hidden');
            $cities.removeClass('visible').addClass('hidden');
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
        checkedAllCheckbox[$(this).attr('data-check')] = !!$(this).is(":checked");

        var checkAll = true;
        for (var j = 0; j < checkedAllCheckbox.length; j++) {
            if (!checkedAllCheckbox[j]) {
                console.log(checkedAllCheckbox, checkedAllCheckbox[j]);
                checkAll = false;
            }
        }

        $checkAll.prop("checked", checkAll);
    }

    function selectAll() {
        $("input[type=checkbox]").each(function () {
            $(this).prop("checked", $checkAll.prop("checked"));
        });
        return checkedAllCheckbox = [true, true, true];
    }

    $("input[type=radio]").click(checkedRadio);
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
    var $sortNameUp = $('#sortNameUp');
    var $sortNameDown = $('#sortNameDown');

    var $sortPrice = $('#sortPrice');
    var $sortPriceUp = $('#sortPriceUp');
    var $sortPriceDown = $('#sortPriceDown');
    $sortName.click(sortName);
    var productSortFirst = [];

    function sortName() {
        $sortPriceDown.addClass('hidden').removeClass('visible');
        $sortPriceUp.addClass('hidden').removeClass('visible');
        $sortPrice.attr('data-sortStep', 'first');
        if ($sortName.attr('data-sortStep') === 'first') {
            productSortFirst = [].concat(productSort);
            $sortName.attr('data-sortStep', 'second');
            $sortNameUp.removeClass('hidden').addClass('visible');
            $sortNameDown.addClass('hidden').removeClass('visible');
            productSort.sort(sortNameUp('name'));
        } else if ($sortName.attr('data-sortStep') === 'second') {
            $sortName.attr('data-sortStep', 'third');
            $sortNameUp.addClass('hidden').removeClass('visible');
            $sortNameDown.addClass('visible').removeClass('hidden');
            productSort.sort(sortNameDown('name'));
        } else if ($sortName.attr('data-sortStep') === 'third') {
            $sortName.attr('data-sortStep', 'first');
            $sortNameDown.removeClass('visible').addClass('hidden');
            productSort = [].concat(productSortFirst);
        }
        render(productSort);
    }

    $sortPrice.click(sortPrice);

    function sortPrice() {
        $sortNameDown.addClass('hidden').removeClass('visible');
        $sortNameUp.addClass('hidden').removeClass('visible');
        $sortName.attr('data-sortStep', 'first');
        if ($sortPrice.attr('data-sortStep') === 'first') {
            productSortFirst = [].concat(productSort);
            $sortPrice.attr('data-sortStep', 'second');
            $sortPriceUp.removeClass('hidden').addClass('visible');
            $sortPriceDown.addClass('hidden').removeClass('visible');
            productSort.sort(sortPriceUp('price'));
        } else if ($sortPrice.attr('data-sortStep') === 'second') {
            $sortPrice.attr('data-sortStep', 'third');
            $sortPriceUp.addClass('hidden').removeClass('visible');
            $sortPriceDown.addClass('visible').removeClass('hidden');
            productSort.sort(sortPriceDown('price'));
        } else if ($sortPrice.attr('data-sortStep') === 'third') {
            $sortPrice.attr('data-sortStep', 'first');
            $sortPriceDown.removeClass('visible').addClass('hidden');
            productSort = [].concat(productSortFirst);
        }

        render(productSort);
    }

    function sortPriceUp(prop) {
        return function (a, b) {
            return b[prop] - a[prop];
        }
    }

    function sortPriceDown(prop) {
        return function (a, b) {
            return a[prop] - b[prop];
        }
    }

    function sortNameUp(prop) {
        return function (a, b) {
            var c = b[prop];
            var d = a[prop];
            console.log('сработала', b[prop]);
            return c > d;
        }
    }

    function sortNameDown(prop) {
        return function (a, b) {
            var c = b[prop];
            var d = a[prop];
            console.log('сработала', b[prop]);
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

            console.log(newProduct);
            console.log(productSort, product);
            product.push(newProduct);
            productSort.push(newProduct);
            console.log(product);
            $('html').css('overflow-y', 'auto');
            $requiredNameProduct.removeClass('visible').addClass('hidden');
            $requiredCount.removeClass('visible').addClass('hidden');
            $requiredPrice.removeClass('visible').addClass('hidden');
            $requiredEmail.removeClass('visible').addClass('hidden');
            $countries.removeClass('visible').addClass('hidden');
            $cities.removeClass('visible').addClass('hidden');
            $btnModal.addClass('disabled');
            $modalAdd.css('display', 'none');
            $overlay.css('display', 'none');


            render(productSort);
            validationFields = {name: false, email: false, count: false, price: false};

            $('#addProductForm')[0].reset();
            console.log('addProduct', $btnAdd)
        } else {
            alert('Заполните корректно все обязательные поля');
        }

    }

    function updProduct() {
        if (validationValue) {
            productSort[dataNumber].name = $('#nameProduct').val();
            productSort[dataNumber].email = $('#email').val();
            productSort[dataNumber].count = parseInt($('#count').val());
            productSort[dataNumber].price = parseInt($('#price').val());
            productSort[dataNumber].delivery = $sel.val();
            if ($sel.val() === 'Страна') {
                productSort[dataNumber].countries = selectedRadio;
            } else {
                productSort[dataNumber].checkedAllCheckbox = [].concat(checkedAllCheckbox);
            }
            checkedAllCheckbox = [false, false, false];
            $requiredNameProduct.removeClass('visible').addClass('hidden');
            $requiredCount.removeClass('visible').addClass('hidden');
            $requiredPrice.removeClass('visible').addClass('hidden');
            $requiredEmail.removeClass('visible').addClass('hidden');
            $countries.removeClass('visible').addClass('hidden');
            $cities.removeClass('visible').addClass('hidden');
            //productSort = [].concat(product);
            render(productSort);
            $('html').css('overflow-y', 'auto');
            $nameProduct.removeClass('input-success input-danger');
            $email.removeClass('input-success input-danger');
            $count.removeClass('input-success input-danger');
            $price.removeClass('input-success input-danger');
            $requiredNameProduct.removeClass('visible').addClass('hidden');

            $modalAdd.css('display', 'none');
            $overlay.css('display', 'none');
            console.log('updProduct сработала', product);
            validationFields = {name: false, email: false, count: false, price: false};
        } else {
            console.log(validationValue);
            alert('Заполните корректно все обязательные поля');
        }
    }

    render(productSort);
});
