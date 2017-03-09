function showProducts() {
    var productList = JSON.parse(localStorage.getItem('products'));
    var n = 1;
    var html = '';
    $('.productitems').remove();
    for (var i in productList) {
        var item = productList[i];
        
        console.log(n, "is NAN")
        if(n == 1){
            console.log("row");
            html += '<div class="row productitems">';
        }
         html += '<div class="col-md-3"><div class="thumbnail">' + '<div class="caption">' + '<h3>' + item.name + '</h3>' + '<p>' + item.description + '</p>' + '<a href="#" class="btn btn-default buyproduct" data-id="' + item.id + '"  data-price="'+ item.price +'" data-name="'+ item.name +'" role="button">Buy</a></p>' + '</div>' + '</div>'+ '</div>';
        
        if(n%4 == 0){
            console.log("row");
            html += '</div>';
            if(n != productList.length){
                html += '<div class="row productitems">';
            }
        }
        n++;
    }
    $('.products').append(html);
}

function showOrders() {
    var ordersList = JSON.parse(localStorage.getItem('orders'));
    $('.orderitem').remove();
    for (var i in ordersList) {
    
        $('.orderslist').append('<li class="orderitem list-group-item">'+ ordersList[i].name + ' <a href="#" class="removeitem close pull-right" data-id="'+ ordersList[i].id +'">&times;</a><b class="pull-right">' + ordersList[i].price + 'грн &nbsp; </b></li>')
    
    }
}

$('.newproduct').click(function () {
    console.log('new Product');
    var products = [];
    var product = {
        id: "id" + (localStorage.length + 1),
        name: $('#forProductName').val(),
        price: $('#forProductPrice').val(),
        description: $('#forProductDescription').val()
    };
    
    if(JSON.parse(localStorage.getItem('products')) != null){
        products = JSON.parse(localStorage.getItem('products'));
    } 
    
    console.log(products);
    
    products.push(product);
    
    localStorage.setItem("products", JSON.stringify(products));

    $('#modalfornewproduct').modal('hide');
    $('#forProductName').val('');
    $('#forProductPrice').val('');
    $('#forProductDescription').val('');
    
    showProducts();
});

$('.orders').click(function(){
    showOrders();
});

$(document).on("click", ".buyproduct", function(){
    console.log("buy new product", $(this).data('name'), $(this).data('price') + "грн");
    var orders = [];
    var order = {
        id: $(this).data('id'),
        name: $(this).data('name'),
        price: $(this).data('price')
    };
    
    if(JSON.parse(localStorage.getItem('orders')) != null){
        orders = JSON.parse(localStorage.getItem('orders'));
    } 
    
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
});


$(document).on('click', '.removeitem', function(){
    $(this).parent().remove();
    var orders = JSON.parse(localStorage.getItem('orders'));
    
    for(var n in orders){
        if(orders[n].id == $(this).data('id')){
            console.log(orders[n]);
            console.log(orders);
        }
    }
    localStorage.setItem('orders', JSON.stringify(orders));
    
})

showProducts();