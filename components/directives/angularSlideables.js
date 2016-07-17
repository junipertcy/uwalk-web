'use strict';

angular.module('simhood')
.directive('slideable', function () {
    return {
        restrict:'C',
        compile: function (element, attr) {
            // wrap tag
            var contents = element.html();
            element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + contents + '</div>');

            return function postLink(scope, element, attrs) {
                // default properties
                attrs.duration = (!attrs.duration) ? '1s' : attrs.duration;
                attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
                element.css({
                    'overflow': 'visible',
                    'height': '80px',
                    'background-color': 'white',
                    'opacity': 1,
                    'transitionProperty': 'height',
                    'transitionDuration': attrs.duration,
                    'transitionTimingFunction': attrs.easing
                });
            };
        }
    };
})
.directive('slideToggle', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var target = document.querySelector(attrs.slideToggle);
            attrs.expanded = false;
            element.bind('click', function() {
                var content = target.querySelector('.slideable_content');
                if(!attrs.expanded) {
                    var y = content.clientHeight;
                    content.style.overflow = 'visible';
                    content.style.height = '80px';
                    content.style['background-color'] = 'transparent';
                    content.style["border"] = "2px solid lightblue";
                    content.style["border-radius"] = "5px";
                    target.style.height = '60px';
                } else {
                    target.style.height = '0px';
                    target.style["background-color"] = "transparent";
                    content.style["border"] = "2px solid transparent";
                }
                attrs.expanded = !attrs.expanded;
            });
        }
    }
});
