
/*
    Inputs:
    1. Header
    2. Transcluded content
   Output:
    A responsive collapsible nav
*/
myApp.directive('responsiveNav', function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: 'scripts/templates/animationTemplates/responsiveNav.html',
        link: function (scope,iElement, iAttrs,controller, $transclude) {

             iElement.find("#yourHeaderHere")[0].innerText = iAttrs.header;

             /* Could write a simply 'ng-transclude' in the view but i'm preparing it for a more generic use */
             $transclude(function(clone) {
              var navContent = iElement.find("#yourContentHere")[0];
              angular.element(navContent).append(clone);
             });
        }
    }
});

/*
    Act like a single accordion item - just a template that contains 2 inner directives (collapsibleWrapper and collapsible ) that has the logic for the accordion)
*/

myApp.directive('infoCollapse', function() {
    return {
        restrict: 'E',
        templateUrl: "scripts/templates/animationTemplates/infoCollapse.html"
    };
});

/*
    The outer part of the single accordion item (the header and the animation logic)
*/
myApp.directive('collapsibleWrapper', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "scripts/templates/animationTemplates/handsCollapse.html",
        transclude: true,
        controller: function ($scope) {

            $scope.sharedData = {
                visible : false
            };

            $scope.toggleVisibility = function () {
                $scope.sharedData.visible=!$scope.sharedData.visible;
            };

            this.scope = $scope;
        }
    };
});

/*
 The inner part of the single accordion item (the hidden/displayed data)
*/
//Using protypical inheritance
myApp.directive('collapsible', function() {
    return {
        restrict: 'E',
        replace: true,
        template: '<div collapse = "!sharedData.visible" >'
            + 	'<span ng-transclude> </span>'
            +'</div>',

        transclude: true
    };
});





