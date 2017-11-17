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

    function render(product) {
        var table = $('#productList');
        var tr;

        for (var i = 0; i < product.length; i++) {
            tr = $('<tr></tr>')
            tr.append(
                $('<td></td>').text(product[i].name),
                $('<td></td>').text(product[i].price),
                $('<td></td>').append(
                    $('<button></button>').addClass('btn btn-success').text('Edit'),
                    $('<span> </span>'),
                    $('<button></button>').addClass('btn btn-danger').text('Delete')
                )
            );
            table.append(tr);
        }

    }

    var $productList = $("#productList");
    var $modalDelete = $("#modalDelete");
    var $overlay = $("#overlay");
    var $modalAdd = $("#modalAdd");

    $productList.on('click', '.btn-danger', function () {
        $modalDelete.css('display', 'block');
        $overlay.css('display', 'block');
        console.log('клик по кнопке удалить');
    });

    $modalDelete.on('click', '.btn-danger', function () {


        $modalDelete.css('display', 'none');
        $overlay.css('display', 'none');
        console.log('клик по кнопке No');
    });

    $("#addNew").on('click', function () {
        $modalAdd.css('display', 'block');
        $overlay.css('display', 'block');
    });

    $productList.on('click', '.btn-success', function () {

        $modalAdd.css('display', 'block');
        $overlay.css('display', 'block');


        console.log('клик по кнопке добавить');
    });


    $(document).on('click', function (e) {
        if (e.target.className === 'overlay') {
            $modalAdd.css('display', 'none');
            $modalDelete.css('display', 'none');
            $overlay.css('display', 'none');
        }
    });

    var $sel = $('#delivery');
    $sel.on('click', function () {
        var val = $sel.val();
        if (val === 'Страна') {
            $('#countries').css('display', 'block');
        } else {
            $('#countries').css('display', 'none');
        }
        if (val === 'Город') {
            $('#cities').css('display', 'block');
        } else {
            $('#cities').css('display', 'none');
        }
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
        var table = $('#productList');
        var tr;

        tr = $('<tr></tr>');
        tr.append(
            $('<td></td>').text($('#nameProduct').val()),
            $('<td></td>').text($('#price').val()),
            $('<td></td>').append(
                $('<button></button>').addClass('btn btn-success').text('Edit'),
                $('<span> </span>'),
                $('<button></button>').addClass('btn btn-danger').text('Delete')
            )
        );
        table.append(tr);

        $('#addProductForm')[0].reset();
    }

    render(product);
});
