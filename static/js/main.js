var testData = [
    { 
        "postTitle": "Cavite-Bataan Express Bridge",
        "postDescription": "Construct an express bridge from Cavite to Bataan to avoid Metro Manila traffic",
        "tags": ["DPWH", "Bridge", "Infrastructure"],
        "posted": "2011-08-23",
        "updated": "2017-02-25",
        "upvote": 523,
        "downvote": 121,
        "comments": 23
    },{ 
        "postTitle": "Declogging of Drainages in Sta Ana, Manila",
        "postDescription": "Consistent flooding occurance in Sta Ana, Manila.",
        "tags": ["DPWH", "Flooding", "Sewege", "Infrastructure"],
        "posted": "2012-12-31",
        "updated": "2012-02-02",
        "upvote": 25,
        "downvote": 103,
        "comments": 123
    },{ 
        "postTitle": "Removal of the Hotel near Rizal Park",
        "postDescription": "An insult to our national and cultural identity",
        "tags": ["DPWH", "Tourism"],
        "posted": "2015-01-12",
        "updated": "2016-08-06",
        "upvote": 53,
        "downvote": 103,
        "comments": 531
    },{ 
        "postTitle": "Modernization of LRT1 stations",
        "postDescription": "LRT1 station frequently suffers from malfunctioning equipment and poor ventilation.",
        "tags": ["DOTC", "Transportation", "LRT"],
        "posted": "2013-04-06",
        "updated": "2014-04-09",
        "upvote": 523,
        "downvote": 23,
        "comments": 21
    }
];

var app = angular.module('app', []);

app.controller('ctrl', function ($scope, $http) {
    $scope.searchProposals = function () {
        $scope.res = testData;

        $http({
            method: 'POST',
            url: '/search',
            data: {"search":$scope.search}
        }).then(function successCallback(response) {
            console.log(response.data);
        }, function errorCallback(response) {
            console.log(response.data);
        });
    }
});