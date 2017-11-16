'use strict';
/**
 * @file script.js
 *
 * @author opa_oz
 * @date 27/07/2017
 */

$(document).ready(function () {

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
    })

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
        var $nameProduct = $('#nameProduct');
        var $price = $('#price');
        console.log($nameProduct.val());
        var tr = $('<tr></tr>');
        tr.append(
            $('<td></td>').text($nameProduct.val()),
            $('<td></td>').text($price.val()),
            $('<td></td>').append(
                $('<button></button>').addClass('btn btn-success').text('Edit'),
                $('<span> </span>'),
                $('<button></button>').addClass('btn btn-danger').text('Delete')
            )
        );

        $productList.append(tr);

    }
});
