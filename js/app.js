angular
.module('delivery-clone', ['ui.router', 'ngResource'])
.config(['$stateProvider', RouterFunction])
.controller('RootController',['RestaurantFactory',function(RestaurantFactory){
    this.featured = RestaurantFactory.query()
    console.log(this.featured)
}])

// Below is Controllers for 'Restaurant'

.controller('RestaurantIndexController',['RestaurantFactory',function(RestaurantFactory){
    this.restaurants = RestaurantFactory.query()
    console.log(this.restaurants)
}])
.controller('RestaurantShowController',['$stateParams','RestaurantFactory',function($stateParams ,RestaurantFactory){
    this.restaurant = RestaurantFactory.get({id: $stateParams.id })
    console.log(this.restaurant)
}])

// Below is Controllers for 'Blog'

.controller('BlogIndexController', ['BlogFactory', function(BlogFactory){
    this.blogs = BlogFactory.query();
    $.getJSON('https://app-hangry.herokuapp.com/blogs.json', function(data){
        const posts = data;
        for(let i = 0; i < data.collections.length; i++) {
            $('#blogs').append(`<div class="row"><a href="${data.collections[i].collection.url}"><div class="col-lg-12 blog-post"><h2>${data.collections[i].collection.title}</h2><img class="blog-img" src="${data.collections[i].collection.image_url}"><h4>${data.collections[i].collection.description}</h4></div></a></div>`)
        }
    })
}])
// Below is Controllers for 'Order'

.controller('OrderIndexController', ['OrderFactory', function(OrderFactory){
    this.orders = OrderFactory.query()
}])
// .controller('OrderCreateController', ['$stateParams', 'RestaurantFactory', function($stateParams, RestaurantFactory){
//     this.order = RestaurantFactory.create({
//         restaurant_id: $stateParams.restaurant_id,
//         id: $stateParams.id
//     })
//     console.log(this.order)
// }])
.controller('OrderNewController', ['$stateParams', 'OrderFactory', function($stateParams, OrderFactory){
    this.order = OrderFactory.get({
        restaurant_id: $stateParams.restaurant_id,
        id: $stateParams.id
    })
    console.log(this.order)
}])
.controller('OrderEditController', ['$stateParams', 'OrderFactory', function($stateParams, OrderFactory){
    this.order = OrderFactory.edit({
        restaurant_id: $stateParams.restaurant_id,
        id: $stateParams.id
    })
    console.log(this.order)
}])
.controller('OrderShowController', ['$stateParams','OrderFactory', function($stateParams, OrderFactory){
    this.order = OrderFactory.get({
        restaurant_id: $stateParams.restaurant_id,
        id: $stateParams.id
    })
    this.itemDets = [];
    console.log(this.order)
}])
.controller('OrderUpdateController', ['$stateParams', 'OrderFactory', function($stateParams, OrderFactory){
    this.order = OrderFactory.update({
        restaurant_id: $stateParams.restaurant_id,
        id: $stateParams.id
    })
    console.log(this.order)
}])
.controller('OrderDestroyController', ['$stateParams', 'OrderFactory', function($stateParams, OrderFactory){
    this.order = OrderFactory.destroy({
        restaurant_id: $stateParams.restaurant_id,
        id: $stateParams.id
    })
    console.log(this.order)
}])
.factory('BlogFactory', ['$resource', function($resource){
    return $resource('https://app-hangry.herokuapp.com/blogs/:id.json',{},{'query': {method: 'GET', isArray: false}})
}])
.factory('RestaurantFactory', ['$resource', function($resource){
    return $resource('https://app-hangry.herokuapp.com/restaurants/:id.json',{},{'query': {method: 'GET', isArray: true}})
}])
.factory('OrderFactory', ['$resource', function($resource){
    return $resource('https://app-hangry.herokuapp.com/order/:id.json',{},{'query': {method: 'GET', isArray: true}})
}])
function RouterFunction($stateProvider){
    $stateProvider
    .state('landing', {
        url: '/',
        templateUrl: 'js/ng-views/landing.html',
        controller: 'RootController',
        controllerAs: 'vm'
    })
    .state('RestaurantIndex', {
        url: '/restaurants',
        templateUrl: 'js/ng-views/restaurant-index.html',
        controller: 'RestaurantIndexController',
        controllerAs: 'vm'
    })
    .state('RestaurantShow', {
        url: '/restaurants/:id',
        templateUrl: 'js/ng-views/restaurant-show.html',
        controller: 'RestaurantShowController',
        controllerAs: 'vm'
    })
    .state('OrderIndex', {
        url: '/orders',
        templateUrl: 'js/ng-views/order-index.html',
        controller: 'OrderIndexController',
        controllerAs: 'vm'
    })
    .state('OrderNew', {
        url: '/restaurants/:restaurant_id/order/new',
        templateUrl: 'js/ng-views/order-new.html',
        controller: 'OrderNewController',
        controllerAs: 'vm'
    })
    .state('OrderEdit', {
        url: '/restaurants/:restaurant_id/order/:id/edit',
        templateUrl: 'js/ng-views/order-edit.html',
        controller: 'OrderEditController',
        controllerAs: 'vm'
    })
    .state('OrderShow', {
        url: '/restaurants/:restaurant_id/order/:id',
        templateUrl: 'js/ng-views/order-show.html',
        controller: 'OrderShowController',
        controllerAs: 'vm'
    })
    .state('OrderUpdate', {
        url: '/orders/:id',
        controller: 'OrderUpdateController',
        controllerAs: 'vm'
    })
    .state('OrderDestroy', {
        url: '/orders/:id',
        controller: 'OrderDestroyController',
        controllerAs: 'vm'
    })
    .state('BlogIndex', {
        url: '/blogs',
        templateUrl: 'js/ng-views/blog-index.html',
        controller: 'BlogIndexController',
        controllerAs: 'vm'
    })
}