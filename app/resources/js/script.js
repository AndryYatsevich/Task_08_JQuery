'use strict';
/**
 * @file script.js
 *
 * @author AndryYatsevich
 * @date 13/11/2017
 */

$(document).ready(function () {

    var product = [
        {name: 'Товар 4', email: 'product1@mail.com', count: 5, price: '12'},
        {name: 'Товар 55', email: 'product2@mail.com', count: 2, price: '120'},
        {name: 'Товар 3', email: 'product3@mail.com', count: 7, price: '73'}];
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
                //   $btnModal.addClass('disabled');
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
                // $btnModal.addClass('disabled');
                $requaredNameProduct
                    .removeClass('hidden requared-success')
                    .addClass('visible')
                    .text('Минимальное количество символов 3');
            } else if ($nameProduct.val().length > 20) {
                $nameProduct
                    .removeClass('input-success')
                    .addClass('input-danger')
                    .attr('data-correct', 'false');
                // $btnModal.addClass('disabled');
                $requaredNameProduct
                    .removeClass('hidden requared-success')
                    .addClass('visible')
                    .text('Максимально количество символов 20');
            } else if ($nameProduct.val().length >= 3 && $nameProduct.val().length <= 20) {
                $nameProduct
                    .removeClass('input-danger')
                    .addClass('input-success')
                    .attr('data-correct', 'true');
                //$btnModal.removeClass('disabled');
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

    function correct() {
        if ($nameProduct.attr('data-correct') == 'true' && $count.attr('data-correct') == 'true') {
            $btnModal.removeClass('disabled');
        } else {
            $btnModal.addClass('disabled');
        }
    }


    function render(product) {
        $tbody.empty();
        var tr;

        for (var i = 0; i < product.length; i++) {
            tr = $('<tr></tr>');
            tr.append(
                $('<td></td>').text(product[i].name).append(
                    $('<span></span>').addClass('badge pull-right').text(product[i].count)
                ),
                $('<td></td>').text('$' + product[i].price),
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

    $("#addNew").on('click', function () {
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

    $productList.on('click', '.btn-success', function () {
        if (modal) {
            modal.css('display', 'none');
            $('html').css('overflow-y', 'auto');
        }
        modal = $modalAdd;
        $('.modal-window-header').text('Edit product.');
        var $this = $(this);

        $('.modal-button').attr('data-id', 'btnUpd').text('Update');

        $('html').css('overflow-y', 'hidden');
        $modalAdd.css('display', 'block');
        $overlay.css('display', 'block');




        dataNumber = $this.closest('tr').attr('data-number');
        $('#nameProduct').val(product[dataNumber].name);
        $('#email').val(product[dataNumber].email);
        $('#count').val(product[dataNumber].count);
        $('#price').val(product[dataNumber].price);
        if ($count.val()) {
            $count
                .removeClass('input-danger')
                .addClass('input-success')
                .attr('data-correct', 'true');
            $requaredCount
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
        }
    });

    var $sel = $('#delivery');
    $sel.on('click', function () {

        var val = $sel.val();
        var $countries = $('#countries');
        var $cities = $('#cities');

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

    var $btnModal = $('#btnModal');

    $btnModal.click(function () {
        if ($btnModal.attr('data-id') == 'btnAdd') {
            return addProduct();

        }
        if ($btnModal.attr('data-id') == 'btnUpd') {
            return updProduct();
        }
    });

    function addProduct() {
        if ($nameProduct.attr('data-correct') == 'true') {

            var newProduct = {};
            newProduct.name = $('#nameProduct').val();
            newProduct.email = $('#email').val();
            newProduct.count = $('#count').val();
            newProduct.price = $('#price').val();

            console.log(newProduct);

            product.push(newProduct);
            console.log(product);
            $('html').css('overflow-y', 'auto');
            $nameProduct.removeClass('input-success input-danger');
            $requaredNameProduct.removeClass('visible').addClass('hidden');
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
        if ($nameProduct.attr('data-correct') == 'true') {
            product[dataNumber].name = $('#nameProduct').val();
            product[dataNumber].email = $('#email').val();
            product[dataNumber].count = $('#count').val();
            product[dataNumber].price = $('#price').val();

            render(product);
            $('html').css('overflow-y', 'auto');
            $nameProduct.removeClass('input-success input-danger');
            $requaredNameProduct.removeClass('visible').addClass('hidden');
            $modalAdd.css('display', 'none');
            $overlay.css('display', 'none');
            console.log('updProduct сработала', $btnUpd);
        } else {
            alert('Заполните корректно все обязательные поля');
        }
    }

    render(product);
});
