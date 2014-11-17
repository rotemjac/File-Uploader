
 /* Provides a responsive and configurable grid component  */
 myApp.directive('dynamicColumns', function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template: function (tElement, tAttrs) {
                var resTemp =
                    '<div class="row clearfix ">'
                    + '   <div class="col-md-12 column">'
                    + '        <div class="column "></div>'
                    + '        <div class="column " ></div>'
                    + '        <div class="column "></div>'
                    + '        <div class="column "></div>'
                    + '    </div>'
                    + ' </div>  ' ;
                return resTemp;
            } ,
            link: function (scope,iElement, iAttrs,controller, $transclude) {
                var allColumns = iElement.find(".column");
                angular.element(allColumns[1]).addClass("col-md-" + iAttrs.c1);
                angular.element(allColumns[2]).addClass("col-md-" + iAttrs.c2);
                angular.element(allColumns[3]).addClass("col-md-" + iAttrs.c3);
                angular.element(allColumns[4]).addClass("col-md-" + iAttrs.c4);

                /*
                 Here we have only one main content and it should go the the col-md-10
                 */
                if (iAttrs.colnum == 3) {
                    $transclude(function(clone) {
                        var mainContent  = clone[1];
                        angular.element(allColumns[2]).append(mainContent);
                    });
                }
                /*
                 Here we have TWO main content:
                 The first  one (clone[1]) should go the "c2" column
                 The second one (clone[3]) should go the "c4" column
                 The "c1" and "c3" columns are just columns spaces
                 View the structure of "allColumns" and "clone" for a better understanding...
                 */
                else if (iAttrs.colnum == 4){
                    $transclude(function(clone) {
                        var leftContent  = clone[1];
                        var rightContent = clone[3];

                        angular.element(allColumns[2]).append(leftContent);
                        angular.element(allColumns[4]).append(rightContent);
                    });
                }

            }
        }
    });


