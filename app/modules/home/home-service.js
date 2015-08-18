HomeService.$inject = ['$q'];

function HomeService ($q) {

    "use strict";

    this.getLocation = function () {

        return $q(function (resolve) {
            resolve("Webpack");
        });
    };
}

module.exports = HomeService;
