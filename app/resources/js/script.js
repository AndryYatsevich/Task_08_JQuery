'use strict';
/**
 * @file script.js
 *
 * @author opa_oz
 * @date 27/07/2017
 */

$(document).ready(function () {

    var product = [
        {name: 'Товар 4', email: 'product1@mail.com', count: 5, price: '$12'},
        {name: 'Товар 55', email: 'product2@mail.com', count: 2, price: '$120'},
        {name: 'Товар 3', email: 'product3@mail.com', count: 7, price: '$73'}];
    var $table = $('#productList');
    var $tbody = $('tbody', $table);
    var dataNumber;
    var modal;

    function render(product) {
        $tbody.empty();
        var tr;

        for (var i = 0; i < product.length; i++) {
            tr = $('<tr></tr>');
            tr.append(
                $('<td></td>').text(product[i].name).append(
                    $('<span></span>').addClass('badge pull-right').text(product[i].count)
                ),
                $('<td></td>').text(product[i].price),
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
        if(modal){
            modal.css('display', 'none');
            $('html').css('overflow-y', 'auto');
        }
        $('#addProductForm')[0].reset();
        modal = $modalAdd;
        $('.modal-window-header').text('Add new product.');
        $('#btnAdd').text('Add');
        $('html').css('overflow-y', 'hidden');
        modal.css('display', 'block');
        $overlay.css('display', 'block');


    });

    $productList.on('click', '.btn-success', function () {
        if(modal){
            modal.css('display', 'none');
            $('html').css('overflow-y', 'auto');
        }
        modal = $modalAdd;
        $('.modal-window-header').text('Edit product.');
        $('#btnAdd').text('Update');
        $('html').css('overflow-y', 'hidden');
        $modalAdd.css('display', 'block');
        $overlay.css('display', 'block');

        var $this = $(this);
        dataNumber = $this.closest('tr').attr('data-number');
        $('#nameProduct').val(product[dataNumber].name);
        $('#email').val(product[dataNumber].email);
        $('#count').val(product[dataNumber].count);
        $('#price').val(product[dataNumber].price);
        /*newProduct.name = $('#nameProduct').val();
        newProduct.email = $('#email').val();
        newProduct.count = $('#count').val();
        newProduct.price = $('#price').val();*/

        console.log('клик по кнопке добавить', product[dataNumber].name);
    });


    $(document).on('click', function (e) {
        if (e.target.className === 'overlay') {
            $('html').css('overflow-y', 'auto');
            $modalAdd.css('display', 'none');
            $modalDelete.css('display', 'none');
            $overlay.css('display', 'none');
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

    var $btnAdd = $('#btnAdd');
    $btnAdd.click(addProduct);

    function addProduct() {
        var newProduct = {};
        newProduct.name = $('#nameProduct').val();
        newProduct.email = $('#email').val();
        newProduct.count = $('#count').val();
        newProduct.price = $('#price').val();

        console.log(newProduct);
        product.push(newProduct);
        console.log(product);

        render(product);

        $('#addProductForm')[0].reset();
    }

    render(product);
});
