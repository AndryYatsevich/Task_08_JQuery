'use strict';
/**
 * @file script.js
 *
 * @author AndryYatsevich
 * @date 13/11/2017
 */

$(document).ready(function () {

    var product = [];
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
        getAllProduct(function (data) {
            product = [];
            productSort = [].concat(data.data);
            console.log('search', productSort);
            var inputSearch = $('#inputSearch').val().toLowerCase();

            for (var i = 0; i < productSort.length; i++) {
                console.log('for в search', productSort[i]);
                if (productSort[i].name.toLowerCase().indexOf(inputSearch) !== -1) {
                    product.push(productSort[i]);
                    console.log('for в search', productSort[i]);
                }
            }
            render(product);
        });
       /* productSort = [];
        var inputSearch = $('#inputSearch').val().toLowerCase();

        for (var i = 0; i < product.length; i++) {
            if (product[i].name.toLowerCase().indexOf(inputSearch) !== -1) {
                productSort.push(product[i]);
            }
        }
        render(productSort);*/
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
        if (checkToken()) {

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
                ).attr('data-number', product[i]._id);
                $tbody.append(tr);
            }
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
        $.ajax({
            url: 'http://127.0.0.1:3000/products/' + dataNumber,
            headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
            type: 'DELETE',
            success: function (data) {

                getAllProduct();
                console.log(data.data);
                $html.css('overflow-y', 'auto');
                hideModal($modalDelete);
            }
        });
    });

    $('#addNew').on('click', function () {            //модалка Add
        if (checkToken()) {
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
        } else {
            alert('Please log in!');
        }
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
        productSortObj = product.filter(function (v) {
            console.log(dataNumber, productSortObj);
            return v._id == dataNumber;

        });
        $.ajax({
            url: 'http://127.0.0.1:3000/products/' + dataNumber,
            headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
            type: 'GET',
            success: function (data) {
                console.log('update modal', data.data);
                $nameProduct.val(data.data.name);
                $email.val(data.data.email);
                $count.val(data.data.count);
                $price.val(data.data.price);
                validation.productName();
                validation.email();
                validation.count();
                validation.price();
                correct();
                var val = data.data.delivery;
                $sel.val(val);
                if (val === 'Страна') {
                    console.log(data.data.country);
                    $countries.removeClass('hidden').addClass('visible');
                    $('[data-radio=' + data.data.country + ']').prop('checked', true);
                } else if (val === 'Пусто') {
                    $cities.removeClass('visible').addClass('hidden');
                    $countries.removeClass('visible').addClass('hidden');
                } else {
                    $cities.removeClass('hidden').addClass('visible');
                    var checkAll = true;
                    console.log(data.data.deliveryCity);
                    if (data.data.deliveryCity.saratov) {
                        $('#checkSar').prop('checked', true);
                    } else {
                        $('#checkSar').prop('checked', false);
                    }
                    if (data.data.deliveryCity.moscow) {
                        $('#checkMsk').prop('checked', true);
                    } else {
                        $('#checkMsk').prop('checked', false);
                    }
                    if (data.data.deliveryCity.habarovsk) {
                        $('#checkHab').prop('checked', true);
                    } else {
                        $('#checkHab').prop('checked', false);
                    }
                    for (var key in data.data.deliveryCity) { //hasOwnProperty
                        if (!data.data.deliveryCity.hasOwnProperty(key)) continue;
                        if (!data.data.deliveryCity[key]) {
                            checkAll = false;
                        }
                    }
                    $checkAll.prop('checked', checkAll);
                    // $('[data-check=' + j + ']').prop('checked', data.data.deliveryCity[j]);
                }
            }


    });


});

$(document).on('click', function (e) {
    if (e.target.className === 'overlay') {
        $html.css('overflow-y', 'auto');
        $modalAdd.css('display', 'none');
        $modalDelete.css('display', 'none');
        $authorization.css('display', 'none');
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
var deliveryCity = {'moscow': false, 'habarovsk': false, 'saratov': false};
$('#checkHab').click(checkedCheckbox);
$('#checkSar').click(checkedCheckbox);
$('#checkMsk').click(checkedCheckbox);

function checkedCheckbox() {
    deliveryCity.moscow = !!$('#checkMsk').is(':checked');
    deliveryCity.habarovsk = !!$('#checkHab').is(':checked');
    deliveryCity.saratov = !!$('#checkSar').is(':checked');
    //deliveryCity[$(this).attr('data-check')] = !!$(this).is(':checked');

    var checkAll = true;
    console.log(deliveryCity);
    for (var key in deliveryCity) { //hasOwnProperty
        if (!deliveryCity.hasOwnProperty(key)) continue;
        if (!deliveryCity[key]) {
            checkAll = false;
        }
    }
    $checkAll.prop('checked', checkAll);
}

function selectAll() {
    $('input[type=checkbox]').each(function () {
        $(this).prop('checked', $checkAll.prop('checked'));
    });
    return deliveryCity = {'moscow': true, 'habarovsk': true, 'saratov': true};
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

function sort(sortFieldName, sortArrows, sortField, otherSortFieldName, otherArrows) {

    var sortVal = sortFieldName.attr('data-sortStep');

    otherArrows.addClass('hidden');
    otherSortFieldName.attr('data-sortStep', 'first');
    switch (sortVal) {
        case 'first':
                sortFieldName.attr('data-sortStep', 'second');
                product.sort(sortNameUp(sortField));
                render(product);
            break;
        case 'second':
                sortFieldName.attr('data-sortStep', 'third');
                product.sort(sortNameDown(sortField));
                render(product);
            break;
        case 'third':


            getAllProduct(function (data) {
                sortFieldName.attr('data-sortStep', 'first');
                render(data.data);
            });
            break
    }
    sortArrows
        .toggleClass('glyphicon-chevron-up', sortVal === 'first')
        .toggleClass('glyphicon-chevron-down', sortVal === 'second')
        .toggleClass('hidden', sortVal === 'third');
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

            newProduct.country = parseInt(selectedRadio);
        } else {
            console.log('addProduct: ', deliveryCity);
            //_.extend({}, deliveryCity);
            newProduct.deliveryCity = _.extend({}, deliveryCity);
        }


        console.log(newProduct);
        $.ajax({
            url: 'http://127.0.0.1:3000/products',
            data: JSON.stringify(newProduct),
            headers: {Authorization: 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json'},
            type: 'POST',
            success: function () {
                $html.css('overflow-y', 'auto');
                hiddenRequiredFieldsText();
                $btnModal.addClass('disabled');
                hideModal($modalAdd);
                getAllProduct();
            },
            error: function () {
                alert('Invalid email or password');
            }
        });
        //  product.push(newProduct);
        //  productSort.push(newProduct);


        //      render(productSort);
        validationFields = {name: false, email: false, count: false, price: false};
        deliveryCity = {'moscow': false, 'habarovsk': false, 'saratov': false};
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
        var updProduct = {};
        updProduct.name = $('#nameProduct').val();
        updProduct.email = $('#email').val();
        updProduct.count = parseInt($('#count').val());
        updProduct.price = parseInt($('#price').val());
        updProduct.delivery = $sel.val();
        if ($sel.val() === 'Страна') {
            updProduct.country = parseInt(selectedRadio);
        } else {
            updProduct.deliveryCity = _.extend({}, deliveryCity);
        }

        $.ajax({
            url: 'http://127.0.0.1:3000/products/' + dataNumber,
            headers: {Authorization: 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json'},
            data: JSON.stringify(updProduct),
            type: 'PUT',
            success: function () {
                hiddenRequiredFieldsText();
                $html.css('overflow-y', 'auto');
                hideModal($modalAdd);
                validationFields = {name: false, email: false, count: false, price: false};
                getAllProduct();
            }
        });

        deliveryCity = {'moscow': false, 'habarovsk': false, 'saratov': false};
        //render(productSort);


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

$('#btnLogin').on('click', function () {
    var login = {};
    login.email = $('#loginEmail').val();
    login.password = $('#loginPassword').val();
    console.log(login);

    $.ajax({
        url: 'http://127.0.0.1:3000/auth/login',
        data: login,
        type: 'POST',
        success: function (data) {
            console.log(data.data.token);
            localStorage.setItem('token', data.data.token);
            hideModal($authorization);
            render(productSort);
            getAllProduct();
        },
        error: function () {
            alert('Invalid email or password');
        }

    });
});

function getAllProduct(cb) {
    $.ajax({
        url: 'http://127.0.0.1:3000/products',
        headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
        type: 'GET',
        success: function (data) {
            product = data.data;
            render(data.data);
            console.log(data.data);
            if(_.isFunction(cb)){
                cb(data);
            }
        }
    })
}

var $authorization = $('#authorization');

function checkToken() {
    var checkToken = localStorage.getItem('token');
    if (!checkToken) {
        showModal($authorization);
        return false;
    } else {
        return true;
    }
}

$(document).ready(checkToken()).ready(getAllProduct());


//  render(productSort);
}
)
;
