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
    }
];

var app = angular.module('app', []);
app.controller('ctrl', function ($scope) {
    $scope.search = 0;
    $scope.searchProposals = function () {
        $scope.res = testData
    }
});