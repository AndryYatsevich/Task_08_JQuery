'use strict';
/**
 * @file script.js
 *
 * @author AndryYatsevich
 * @date 13/11/2017
 */

$(document).ready(function () {

    var product = [
        {name: 'Товар 4', email: 'product1@mail.com', count: 5, price: 12321232123.2, delivery: 'Пусто'},
        {
            name: 'Товар 55',
            email: 'product2@mail.com',
            count: 2,
            price: 1202223.2334341,
            delivery: 'Страна',
            countries: 1
        },
        {
            name: 'Товар 3',
            email: 'product3@mail.com',
            count: 7,
            price: 73000000.4343,
            delivery: 'Город',
            checkedAllCheckbox: [true, true, true]
        }];
    var productSort = [].concat(product);
    console.log(productSort, product);
    var $table = $('#productList');
    var $tbody = $('tbody', $table);
    var dataNumber;
    var modal;
    var $btnAdd;
    var $btnUpd;
    var $nameProduct = $('#nameProduct');
    var $requaredNameProduct = $('#requaredNameProduct');
    var $count = $('#count');
    var $requaredCount = $('#requaredCount');
    var $price = $('#price');
    var $requaredPrice = $('#requaredPrice');
    var $btnModal = $('#btnModal');
    var $email = $('#email');
    var $requaredEmail = $('#requaredEmail');
    var $countries = $('#countries');
    var $cities = $('#cities');
    var validationFields = {name: false, email: false, count: false, price: false};
    var validationValue = true;
    var validation = {
        'productName': function () {

            if (!$nameProduct.val().length) {
                $nameProduct
                    .removeClass('input-success')
                    .addClass('input-danger')
                    .attr('data-correct', 'false');
                $requaredNameProduct
                    .removeClass('hidden requared-success')
                    .addClass('visible')
                    .text('Поле обязательно для заполнения');
                console.log('валидация сработала');
                validationFields.name = false;
            } else if ($nameProduct.val().length < 3 && $nameProduct.val().length) {
                $nameProduct
                    .removeClass('input-success')
                    .addClass('input-danger')
                    .attr('data-correct', 'false');
                $requaredNameProduct
                    .removeClass('hidden requared-success')
                    .addClass('visible')
                    .text('Минимальное количество символов 3');
                validationFields.name = false;
            } else if ($nameProduct.val().length > 20) {
                $nameProduct
                    .removeClass('input-success')
                    .addClass('input-danger')
                    .attr('data-correct', 'false');
                $requaredNameProduct
                    .removeClass('hidden requared-success')
                    .addClass('visible')
                    .text('Максимально количество символов 20');
                validationFields.name = false;
            } else if ($nameProduct.val().length >= 3 && $nameProduct.val().length <= 20) {
                $nameProduct
                    .removeClass('input-danger')
                    .addClass('input-success')
                    .attr('data-correct', 'true');
                $requaredNameProduct
                    .text('Поле заполнено корректно')
                    .removeClass('hidden')
                    .addClass('visible requared-success');
                validationFields.name = true;
                console.log(validationFields);
            } else {

                $nameProduct
                    .removeClass('input-success')
                    .addClass('input-danger')
                    .attr('data-correct', 'false');
                $requaredNameProduct
                    .removeClass('visible')
                    .addClass('hidden');
            }
        },
        'email': function () {
            var valEmail = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;

            if (!$email.val()) {
                $email
                    .removeClass('input-success')
                    .addClass('input-danger')
                    .attr('data-correct', 'false');
                $requaredEmail
                    .text('Поле обязательно для заполнения')
                    .removeClass('hidden requared-success')
                    .addClass('visible requared');
                validationFields.email = false;
            } else if (!valEmail.test($email.val())) {
                $email
                    .removeClass('input-success')
                    .addClass('input-danger')
                    .attr('data-correct', 'false');
                $requaredEmail
                    .text('Поле заполнено не корректно')
                    .removeClass('hidden  requared-success')
                    .addClass('visible');
                validationFields.email = false;
            } else {
                $email
                    .removeClass('input-danger')
                    .addClass('input-success')
                    .attr('data-correct', 'true');
                $requaredEmail
                    .text('Поле заполнено корректно')
                    .removeClass('hidden')
                    .addClass('visible requared-success');
                validationFields.email = true;
                console.log(validationFields);
            }
        },
        'price': function () {
            var countNumber = Number($price.val());
            if (!$price.val()) {
                $price
                    .removeClass('input-success')
                    .addClass('input-danger')
                    .attr('data-correct', 'false');
                $requaredPrice
                    .text('Поле обязательно для заполнения')
                    .removeClass('hidden requared-success')
                    .addClass('visible requared');
                validationFields.price = false;
            } else if (!countNumber) {
                $price
                    .removeClass('input-success')
                    .addClass('input-danger')
                    .attr('data-correct', 'false');
                $requaredPrice
                    .text('Должны быть введены только цифры')
                    .removeClass('hidden requared-success')
                    .addClass('visible requared');
                validationFields.price = false;
            } else {
                $price
                    .removeClass('input-danger')
                    .addClass('input-success')
                    .attr('data-correct', 'true');
                $requaredPrice
                    .text('Поле заполнено корректно')
                    .removeClass('hidden')
                    .addClass('visible requared-success');
                validationFields.price = true;
                console.log(validationFields);
            }
        },
        'count': function () {
            var countNumber = Number($count.val());
            if (!$count.val()) {
                $count
                    .removeClass('input-success')
                    .addClass('input-danger')
                    .attr('data-correct', 'false');
                $requaredCount
                    .text('Поле обязательно для заполнения')
                    .removeClass('hidden requared-success')
                    .addClass('visible requared');
                validationFields.count = false;
            } else if (!countNumber) {
                $count
                    .removeClass('input-success')
                    .addClass('input-danger')
                    .attr('data-correct', 'false');
                $requaredCount
                    .text('Должны быть введены только цифры')
                    .removeClass('hidden requared-success')
                    .addClass('visible requared');
                validationFields.count = false;
            } else {
                $count
                    .removeClass('input-danger')
                    .addClass('input-success')
                    .attr('data-correct', 'true');
                $requaredCount
                    .text('Поле заполнено корректно')
                    .removeClass('hidden')
                    .addClass('visible requared-success');
                validationFields.count = true;
                console.log(validationFields);
            }
        }
    };
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

        for (var key in validationFields){ //hasOwnProperty

            if(!validationFields[key]){
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
        var price;

        for (var i = 0; i < product.length; i++) {
            price = parseInt(product[i].price).toFixed(2);
            tr = $('<tr></tr>');
            tr.append(
                $('<td></td>').text(product[i].name).append(
                    $('<span></span>').addClass('badge pull-right').text(product[i].count)
                ),
                $('<td></td>').text('$' + price.replace(/(?=(\d\d\d)+([^\d]|$))/g, ",")),
                $('<td></td>').append(
                    $('<button></button>').addClass('btn btn-success').text('Edit'),
                    $('<span> </span>'),
                    $('<button></button>').addClass('btn btn-danger').text('Delete')
                )
            ).attr('data-number', i);
            $tbody.append(tr);
        }

    }

    var $productList = $("#productList");
    var $modalDelete = $("#modalDelete");
    var $overlay = $("#overlay");
    var $modalAdd = $("#modalAdd");

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
    });

    $modalDelete.on('click', '.btn-danger', function () {


        $modalDelete.css('display', 'none');
        $overlay.css('display', 'none');
        console.log('клик по кнопке No');
    });

    $modalDelete.on('click', '.btn-success', function () {
        product.splice(dataNumber, 1);
        console.log(product);
        render(product);
        $('html').css('overflow-y', 'auto');
        $modalDelete.css('display', 'none');
        $overlay.css('display', 'none');
        console.log('клик по кнопке No');
    });

    $("#addNew").on('click', function () {          //модалка Add
        validationFields = {name: false, email: false, count: false, price: false};
        correct();
        if (modal) {
            modal.css('display', 'none');
            $('html').css('overflow-y', 'auto');
        }
        $('#addProductForm')[0].reset();
        console.log(validationValue);
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
        $('#nameProduct').val(productSort[dataNumber].name);
        $('#email').val(productSort[dataNumber].email);
        $('#count').val(productSort[dataNumber].count);
        $('#price').val(productSort[dataNumber].price);
        $('#nameProduct').load(validation.productName);
        $('#email').load(validation.email);
        $('#count').load(validation.count);
        $('#price').load(validation.price);
        correct();
        var val = productSort[dataNumber].delivery;
        $sel.val(val);
        if (val === 'Страна') {
            $countries.removeClass('hidden').addClass('visible');
            console.log(productSort[dataNumber].countries);
            $('[data-radio=' + productSort[dataNumber].countries + ']').prop("checked", true);
        } else if (val === 'Пусто') {
            $cities.removeClass('visible').addClass('hidden');
            $countries.removeClass('visible').addClass('hidden');
        } else {
            $cities.removeClass('hidden').addClass('visible');
            var checkAll = true;
            for (var j = 0; j < productSort[dataNumber].checkedAllCheckbox.length; j++) {
                if (!productSort[dataNumber].checkedAllCheckbox[j]) {
                    checkAll = false;

                }
                $('[data-check=' + j + ']').prop("checked", productSort[dataNumber].checkedAllCheckbox[j]);
                $checkAll.prop("checked", checkAll);
            }
        }
        if ($count.val() && $nameProduct.val() && $price.val() && $email.val()) {
            $count
                .removeClass('input-danger')
                .addClass('input-success')
                .attr('data-correct', 'true');
            $requaredCount
                .text('Поле заполнено корректно')
                .removeClass('hidden')
                .addClass('visible requared-success');
            $price
                .removeClass('input-danger')
                .addClass('input-success')
                .attr('data-correct', 'true');
            $requaredPrice
                .text('Поле заполнено корректно')
                .removeClass('hidden')
                .addClass('visible requared-success');
            $nameProduct
                .removeClass('input-danger')
                .addClass('input-success')
                .attr('data-correct', 'true');
            $requaredNameProduct
                .text('Поле заполнено корректно')
                .removeClass('hidden')
                .addClass('visible requared-success');
            $email
                .removeClass('input-danger')
                .addClass('input-success')
                .attr('data-correct', 'true');
            $requaredEmail
                .text('Поле заполнено корректно')
                .removeClass('hidden')
                .addClass('visible requared-success');
        }

        console.log('клик по кнопке добавить', product[dataNumber].name);
    });


    $(document).on('click', function (e) {
        if (e.target.className === 'overlay') {
            $('html').css('overflow-y', 'auto');
            $modalAdd.css('display', 'none');
            $modalDelete.css('display', 'none');
            $overlay.css('display', 'none');
            $nameProduct.removeClass('input-success input-danger');
            $requaredNameProduct.removeClass('visible').addClass('hidden');
            $count.removeClass('input-success input-danger');
            $requaredCount.removeClass('visible').addClass('hidden');
            $price.removeClass('input-success input-danger');
            $requaredPrice.removeClass('visible').addClass('hidden');
            $email.removeClass('input-success input-danger');
            $requaredEmail.removeClass('visible').addClass('hidden');
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

        /*if (val === 'Страна') {
            $('#countries').css('display', 'block');
        } else {
            $('#countries').css('display', 'none');
        }
        if (val === 'Город') {
            $('#cities').css('display', 'block');
        } else {
            $('#cities').css('display', 'none');
        }*/
        console.log(val);
    });
    var $checkAll = $('#checkAll');

    /*  $checkAll.click(function () {
          if (!$checkAll.is(":checked"))
              $("input[type=checkbox]").prop('checked', true);
          else
              $("input[type=checkbox]").prop('checked', false);
      });*/

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
        //return checkedAllCheckbox;
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
    function sortName() {
        $sortPriceDown.addClass('hidden').removeClass('visible');
        $sortPriceUp.addClass('hidden').removeClass('visible');
        $sortPrice.attr('data-sortStep', 'first');
        if($sortName.attr('data-sortStep') === 'first'){
            $sortName.attr('data-sortStep', 'second');
            $sortNameUp.removeClass('hidden').addClass('visible');
            $sortNameDown.addClass('hidden').removeClass('visible');
            productSort = [].concat(product);
            productSort.sort(sortNameUp('name'));
        } else if($sortName.attr('data-sortStep') === 'second'){
            $sortName.attr('data-sortStep', 'third');
            $sortNameUp.addClass('hidden').removeClass('visible');
            $sortNameDown.addClass('visible').removeClass('hidden');
            productSort = [].concat(product);
            productSort.sort(sortNameDown('name'));
        } else if($sortName.attr('data-sortStep') === 'third') {
            $sortName.attr('data-sortStep', 'first');
            $sortNameDown.removeClass('visible').addClass('hidden');
            productSort = [].concat(product);
            console.log('азаза');
        }
        render(productSort);
    }

    $('#sortPrice').click(sortPrice);

    function sortPrice() {
        $sortNameDown.addClass('hidden').removeClass('visible');
        $sortNameUp.addClass('hidden').removeClass('visible');
        $sortName.attr('data-sortStep', 'first');
        if($sortPrice.attr('data-sortStep') === 'first'){
            $sortPrice.attr('data-sortStep', 'second');
            $sortPriceUp.removeClass('hidden').addClass('visible');
            $sortPriceDown.addClass('hidden').removeClass('visible');
            productSort = [].concat(product);
            productSort.sort(sortPriceUp('price'));
        } else if($sortPrice.attr('data-sortStep') === 'second'){
            $sortPrice.attr('data-sortStep', 'third');
            $sortPriceUp.addClass('hidden').removeClass('visible');
            $sortPriceDown.addClass('visible').removeClass('hidden');
            productSort = [].concat(product);
            productSort.sort(sortPriceDown('price'));
        } else if($sortPrice.attr('data-sortStep') === 'third') {
            $sortPrice.attr('data-sortStep', 'first');
            $sortPriceDown.removeClass('visible').addClass('hidden');
            productSort = [].concat(product);
            console.log('азаза');
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
            return a[prop] - b[prop] ;
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
            productSort = [].concat(product);
            console.log(product);
            $('html').css('overflow-y', 'auto');
            $nameProduct.removeClass('input-success input-danger').attr('data-correct', 'false');
            $count.removeClass('input-success input-danger').attr('data-correct', 'false');
            $price.removeClass('input-success input-danger').attr('data-correct', 'false');
            $email.removeClass('input-success input-danger').attr('data-correct', 'false');
            $requaredNameProduct.removeClass('visible').addClass('hidden');
            $requaredCount.removeClass('visible').addClass('hidden');
            $requaredPrice.removeClass('visible').addClass('hidden');
            $requaredEmail.removeClass('visible').addClass('hidden');
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
            productSort[dataNumber].count = $('#count').val();
            productSort[dataNumber].price = $('#price').val();
            productSort[dataNumber].delivery = $sel.val();
            if ($sel.val() === 'Страна') {
                productSort[dataNumber].countries = selectedRadio;
            } else {
                productSort[dataNumber].checkedAllCheckbox = [].concat(checkedAllCheckbox);
            }
            checkedAllCheckbox = [false, false, false];
            $nameProduct.removeClass('input-success input-danger').attr('data-correct', 'false');
            $count.removeClass('input-success input-danger').attr('data-correct', 'false');
            $price.removeClass('input-success input-danger').attr('data-correct', 'false');
            $email.removeClass('input-success input-danger').attr('data-correct', 'false');
            $requaredNameProduct.removeClass('visible').addClass('hidden');
            $requaredCount.removeClass('visible').addClass('hidden');
            $requaredPrice.removeClass('visible').addClass('hidden');
            $requaredEmail.removeClass('visible').addClass('hidden');
            $countries.removeClass('visible').addClass('hidden');
            $cities.removeClass('visible').addClass('hidden');
            productSort = [].concat(product);
            render(productSort);
            $('html').css('overflow-y', 'auto');
            $nameProduct.removeClass('input-success input-danger');
            $requaredNameProduct.removeClass('visible').addClass('hidden');

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
