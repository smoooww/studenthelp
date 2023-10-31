var chatty = angular.module('chatty', []);
const inputField = document.querySelector('.inputField')
const btnSend = document.querySelector('.btnSend')
chatty.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if (event.which === 13) {
                scope.$apply(function() {
                    scope.$eval(attrs.ngEnter, {
                        'event': event
                    });
                });

                event.preventDefault();
            }
        });
    };
});

chatty.controller('appCtl', ['$scope', function($scope) {
    this.logout = function() {
        this.id = '';
        this.name = '';
        this.room = '';
    };

    this.initialize = function() {
        $scope.$broadcast('initialize');
    };
}]);

chatty.controller('loginCtl', ['$scope', function($scope) {
    this.do = function() {
        $scope.app.id = random(5);
        $scope.app.name = this.name;
        $scope.app.room = this.room || random(5);
        $scope.app.initialize();
    };

    var random = function(num) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < num; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }
}]);

chatty.controller('chatCtl', ['$scope', function($scope) {
    var chat = this;
    this.history = [];

    var scrollTimer = null;

    inputField.addEventListener('keypress', function(e) {
        if (e.keycode === 13) {
            message();
        }
    });


    btnSend.addEventListener('click', message);

    function message() {
        if (inputField.value.length === 0) {
            $('#errormessage').html("Error: The message field is empty!");
            return false;
        } else {
            $('#errormessage').html("");
        }
        inputField.value = '';
    }

    this.send = function() {
        $('.composer textarea').attr('disabled', true);
        dweetio.dweet_for("chatty-" + $scope.app.room, {
            id: $scope.app.id,
            name: $scope.app.name,
            message: this.message
        }, function(err, dweet) {
            chat.message = '';
            $('.composer textarea').attr('disabled', false);
        });
        inputField.value = '';
    };
    this.share = function() {
        $('.composer textarea').attr('disabled', true);
        dweetio.dweet_for("chatty-" + $scope.app.room, {
            id: $scope.app.id,
            name: $scope.app.name,
            message: `I'm ready to share!`,
        }, function(err, dweet) {
            chat.message = '';
            $('.composer textarea').attr('disabled', false);
        });
        inputField.value = '';
    };
    var isBottom = function() {
        return true;
    };
    var scroll = function() {
        $('body').scrollTo($('.record:last-child'), 200);
    };
    this.test = function() {
        var i = 0;
        var timer = setInterval(function() {
            chat.message = i;
            $scope.$apply();
            chat.send();
            chat.share();
            i++;
            if (i >= 40) {
                clearInterval(timer);
            }
        }, 100);
    };

    $scope.$on('initialize', function() {
        dweetio.listen_for("chatty-" + $scope.app.room, function(dweet) {
            chat.history.push(dweet);
            $scope.$apply();
            if (isBottom()) {
                if (scrollTimer) {
                    clearTimeout(scrollTimer);
                }

                scrollTimer = setTimeout(function() {
                    scroll();
                }, 250);
            };
        });

        setTimeout(function() {
            dweetio.dweet_for("chatty-" + $scope.app.room, {
                id: '',
                name: '',
                message: $scope.app.name + ' joined this chatroom.'
            }, function(err, dweet) {});
        }, 1000);
    });
}]);

document.getElementById('result').innerHTML =  localStorage.getItem('play');

function play() {
    let totalcoins = localStorage.getItem('play');
    totalcoins = parseInt(totalcoins);
    if (totalcoins) {
        localStorage.setItem('play', totalcoins + 1);
    } else {
        localStorage.setItem('play', 1);
    }
    coins.innerHTML = 'Your total coins: ' + totalcoins + '🪙';
}


