'use strict';
/**
 * @file script.js
 *
 * @author opa_oz
 * @date 27/07/2017
 */

$(document).ready(function () {

    console.log(1);
});

$(function () {

    $("#productList ").on('click', '.btn-danger', function () {
        $("#modalDelete").modal('show');
        console.log('клик по кнопке удалить');
    });

    $("#productList ").on('click', '.btn-success', function () {
        $("#modalAdd").modal('show');
        console.log('клик по кнопке добавить');
    });

});