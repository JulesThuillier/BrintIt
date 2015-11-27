angular.module('app.controllers', [])
 
.controller('shoppingListCtrl', ['$scope', function($scope, EventCreator) {
    
    $scope.data = {
        item: '',
        items: []
    };
    
    $scope.shouldShowDelete = true;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true
    
    // Add new item
    $scope.addItem = function() {
        if($scope.data.item != null && $scope.data.item != ""){
            var valueToPush = { };
            valueToPush.name = $scope.data.item;
            valueToPush.quantity = 1;
            $scope.data.items.unshift(valueToPush);
            console.log("'" + $scope.data.item + "' added to list.");
            $scope.data.item = "";
            
            EventCreator.addItemShoppingList(valueToPush.name, valueToPush.quantity);
        }
    };
    
    // Remove Item
    $scope.removeItem = function(item) {
        EventCreator.removeItemShoppingList(item);
        $scope.data.items.splice(item, 1);
    };
    
    // Increase item quantity
    $scope.quantityPlus = function(item) {
        console.log("increasing quantity");
        $scope.data.items[item].quantity++;
        EventCreator.updateItemQuantityShoppingList(item, $scope.data.items[item].quantity);
    };
    
    // Decrease item quantity
    $scope.quantityMinus = function(item) {
        if($scope.data.items[item].quantity == 1){
            EventCreator.removeItemShoppingList(item);
            $scope.data.items.splice(item, 1);
        }
        else {
            $scope.data.items[item].quantity--;
            EventCreator.updateItemQuantityShoppingList(item, $scope.data.items[item].quantity);
        }
    };
    
}]);