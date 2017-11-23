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
    var validation = {
        'productName': function () {
            /*
                        !$('#nameProduct').val().length ?
                            $('#requaredNameProduct').removeClass('hidden').addClass('visible') :
                            $('#requaredNameProduct').removeClass('visible').addClass('hidden');

                        $('#nameProduct').val().length < 3 && $('#nameProduct').val().length ?
                            $('#minRequaredNameProduct').removeClass('hidden').addClass('visible') :
                            $('#minRequaredNameProduct').removeClass('visible').addClass('hidden');

                        $('#nameProduct').val().length > 20 ?
                            $('#maxRequaredNameProduct').removeClass('hidden').addClass('visible') :
                            $('#maxRequaredNameProduct').removeClass('visible').addClass('hidden');
                        $('#requaredNameProduct')
                            .toggleClass('visible', !$('#nameProduct').val().length)
                            .toggleClass('hidden', $('#nameProduct').val().length);

                        $('#minRequaredNameProduct')
                            .toggleClass('hidden', $('#nameProduct').val().length > 3 && !$('#nameProduct').val().length)
                            .toggleClass('visible', $('#nameProduct').val().length < 3);


                        $('#maxRequaredNameProduct')
                            .toggleClass('visible', $('#nameProduct').val().length > 20)
                            .toggleClass('hidden', $('#nameProduct').val().length < 20);
            */

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
            } else if ($nameProduct.val().length < 3 && $nameProduct.val().length) {
                $nameProduct
                    .removeClass('input-success')
                    .addClass('input-danger')
                    .attr('data-correct', 'false');
                $requaredNameProduct
                    .removeClass('hidden requared-success')
                    .addClass('visible')
                    .text('Минимальное количество символов 3');
            } else if ($nameProduct.val().length > 20) {
                $nameProduct
                    .removeClass('input-success')
                    .addClass('input-danger')
                    .attr('data-correct', 'false');
                $requaredNameProduct
                    .removeClass('hidden requared-success')
                    .addClass('visible')
                    .text('Максимально количество символов 20');
            } else if ($nameProduct.val().length >= 3 && $nameProduct.val().length <= 20) {
                $nameProduct
                    .removeClass('input-danger')
                    .addClass('input-success')
                    .attr('data-correct', 'true');
                $requaredNameProduct
                    .text('Поле заполнено корректно')
                    .removeClass('hidden')
                    .addClass('visible requared-success');
            } else {

                $nameProduct
                    .removeClass('input-success')
                    .addClass('input-danger')
                    .attr('data-correct', 'false');
                $requaredNameProduct
                    .removeClass('visible')
                    .addClass('hidden');
            }
            console.log('валидация попыталась сработать');
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
            } else if (!valEmail.test($email.val())) {
                $email
                    .removeClass('input-success')
                    .addClass('input-danger')
                    .attr('data-correct', 'false');
                $requaredEmail
                    .text('Поле заполнено не корректно')
                    .removeClass('hidden  requared-success')
                    .addClass('visible');
            } else {
                $email
                    .removeClass('input-danger')
                    .addClass('input-success')
                    .attr('data-correct', 'true');
                $requaredEmail
                    .text('Поле заполнено корректно')
                    .removeClass('hidden')
                    .addClass('visible requared-success');
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
            } else if (!countNumber) {
                $price
                    .removeClass('input-success')
                    .addClass('input-danger')
                    .attr('data-correct', 'false');
                $requaredPrice
                    .text('Должны быть введены только цифры')
                    .removeClass('hidden requared-success')
                    .addClass('visible requared');

            } else {
                $price
                    .removeClass('input-danger')
                    .addClass('input-success')
                    .attr('data-correct', 'true');
                $requaredPrice
                    .text('Поле заполнено корректно')
                    .removeClass('hidden')
                    .addClass('visible requared-success');
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
            } else if (!countNumber) {
                $count
                    .removeClass('input-success')
                    .addClass('input-danger')
                    .attr('data-correct', 'false');
                $requaredCount
                    .text('Должны быть введены только цифры')
                    .removeClass('hidden requared-success')
                    .addClass('visible requared');

            } else {
                $count
                    .removeClass('input-danger')
                    .addClass('input-success')
                    .attr('data-correct', 'true');
                $requaredCount
                    .text('Поле заполнено корректно')
                    .removeClass('hidden')
                    .addClass('visible requared-success');
            }
        }
    };
    $nameProduct.keyup(validation.productName).keyup(correct);
    $count.keyup(validation.count).keyup(correct);
    $price.keyup(validation.price).keyup(correct);
    $email.keyup(validation.email).keyup(correct);

    function correct() {
        if ($nameProduct.attr('data-correct') == 'true' && $count.attr('data-correct') == 'true' && $price.attr('data-correct') == 'true' && $email.attr('data-correct') == 'true') {
            $btnModal.removeClass('disabled');
            console.log('takoe');
        } else {
            $btnModal.addClass('disabled');
        }
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
        if (modal) {
            modal.css('display', 'none');
            $('html').css('overflow-y', 'auto');
        }
        modal = $modalAdd;
        $('.modal-window-header').text('Edit product.');
        var $this = $(this);

        $btnModal.removeClass('disabled');

        $('.modal-button').attr('data-id', 'btnUpd').text('Update');

        $('html').css('overflow-y', 'hidden');
        $modalAdd.css('display', 'block');
        $overlay.css('display', 'block');

        dataNumber = $this.closest('tr').attr('data-number');
        $('#nameProduct').val(product[dataNumber].name);
        $('#email').val(product[dataNumber].email);
        $('#count').val(product[dataNumber].count);
        $('#price').val(product[dataNumber].price);
        var val = product[dataNumber].delivery;
        $sel.val(val);
        if (val === 'Страна') {
            $countries.removeClass('hidden').addClass('visible');
            console.log(product[dataNumber].countries);
            $('[data-radio=' + product[dataNumber].countries + ']').prop("checked", true);
        } else if (val === 'Пусто') {
            $cities.removeClass('visible').addClass('hidden');
            $countries.removeClass('visible').addClass('hidden');
        } else {
            $cities.removeClass('hidden').addClass('visible');
            var checkAll = true;
            for (var j = 0; j < product[dataNumber].checkedAllCheckbox.length; j++) {
                if (!product[dataNumber].checkedAllCheckbox[j]) {
                    checkAll = false;

                }
                $('[data-check=' + j + ']').prop("checked", product[dataNumber].checkedAllCheckbox[j]);
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

    $('#sortName').click(sortName);

    function sortName() {
        console.log('сортировка почти сработала', $('#sortNameDown').attr('data-sort') == 'off');
        if ($('#sortNameDown').attr('data-sort') == 'off') {
            $('#sortNameDown').removeClass('hidden').addClass('visible');
            $('#sortNameUp').addClass('hidden').removeClass('visible');
            $('#sortNameDown').attr('data-sort', 'on');
            $('#sortNameUp').attr('data-sort', 'off');
            product.sort(sortNameDown('name'));
        } else {
            $('#sortNameUp').removeClass('hidden').addClass('visible');
            $('#sortNameDown').addClass('hidden').removeClass('visible');
            $('#sortNameUp').attr('data-sort', 'on');
            $('#sortNameDown').attr('data-sort', 'off');
            product.sort(sortNameUp('name'));
        }
        render(product);
    }

    $('#sortPrice').click(sortPrice);

    function sortPrice() {
        console.log('сортировка почти сработала', $('#sortPriceDown').attr('data-sort') == 'off');
        if ($('#sortPriceDown').attr('data-sort') == 'off') {
            $('#sortPriceDown').removeClass('hidden').addClass('visible');
            $('#sortPriceUp').addClass('hidden').removeClass('visible');
            $('#sortPriceDown').attr('data-sort', 'on');
            $('#sortPriceUp').attr('data-sort', 'off');
            product.sort(sortPriceDown('price'));
        } else {
            $('#sortPriceUp').removeClass('hidden').addClass('visible');
            $('#sortPriceDown').addClass('hidden').removeClass('visible');
            $('#sortPriceUp').attr('data-sort', 'on');
            $('#sortPriceDown').attr('data-sort', 'off');
            product.sort(sortPriceUp('price'));
        }

      //  product.sort(sortFn('price'));



        render(product);
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
        if ($nameProduct.attr('data-correct') === 'true' && $count.attr('data-correct') === 'true' && $price.attr('data-correct') === 'true' && $email.attr('data-correct') === 'true') {

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

            product.push(newProduct);
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


            render(product);

            $('#addProductForm')[0].reset();
            console.log('addProduct', $btnAdd)
        } else {
            alert('Заполните корректно все обязательные поля');
        }

    }

    function updProduct() {
        if ($nameProduct.attr('data-correct') == 'true' && $count.attr('data-correct') == 'true' && $price.attr('data-correct') == 'true' && $email.attr('data-correct') == 'true') {
            product[dataNumber].name = $('#nameProduct').val();
            product[dataNumber].email = $('#email').val();
            product[dataNumber].count = $('#count').val();
            product[dataNumber].price = $('#price').val();
            product[dataNumber].delivery = $sel.val();
            if ($sel.val() === 'Страна') {
                product[dataNumber].countries = selectedRadio;
            } else {
                product[dataNumber].checkedAllCheckbox = [].concat(checkedAllCheckbox);
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
            render(product);
            $('html').css('overflow-y', 'auto');
            $nameProduct.removeClass('input-success input-danger');
            $requaredNameProduct.removeClass('visible').addClass('hidden');

            $modalAdd.css('display', 'none');
            $overlay.css('display', 'none');
            console.log('updProduct сработала', product);
        } else {
            alert('Заполните корректно все обязательные поля');
        }
    }

    render(product);
});
