var testData = [
    { 
        "title": "Cavite-Bataan Express Bridge",
        "description": "Construct an express bridge from Cavite to Bataan to avoid Metro Manila traffic",
        "tags": ["DPWH", "Bridge", "Infrastructure"],
        "posted": "2011-08-23",
        "updated": "2017-02-25",
        "upvote": 523,
        "downvote": 121,
        "comments": 23
    },{ 
        "title": "Declogging of Drainages in Sta Ana, Manila",
        "description": "Consistent flooding occurance in Sta Ana, Manila.",
        "tags": ["DPWH", "Flooding", "Sewege", "Infrastructure"],
        "posted": "2012-12-31",
        "updated": "2012-02-02",
        "upvote": 25,
        "downvote": 103,
        "comments": 123
    },{ 
        "title": "Removal of the Hotel near Rizal Park",
        "description": "An insult to our national and cultural identity",
        "tags": ["DPWH", "Tourism"],
        "posted": "2015-01-12",
        "updated": "2016-08-06",
        "upvote": 53,
        "downvote": 103,
        "comments": 531
    },{ 
        "title": "Modernization of LRT1 stations",
        "description": "LRT1 station frequently suffers from malfunctioning equipment and poor ventilation.",
        "tags": ["DOTC", "Transportation", "LRT"],
        "posted": "2013-04-06",
        "updated": "2014-04-09",
        "upvote": 523,
        "downvote": 23,
        "comments": 21
    }
];



var app = angular.module('app', []);
var loginType = 0;
var username;

$("#write-proposal").click(function() {
    location.href = "/createproposal";
});


$("#decline-proposal").click(function() {
    alert(1);
    basicModal.show();
});

$("#logout-mode").hide();
$("#profile-section").hide();
$("#login").click(function() {
    var name = $("#username").val();
    var success = 1;
    if(name == "blaise") {
        loginType = 0;
        username = "Blaise Cruz";
        $("#user").text(username);
    }else if(name == "albert"){
        loginType = 1;
        username = "Albert Dizon";
        $("#user").text(username);
    }else {
        success = 0;
    }
    
    if(success) {
        $("#login-mode").hide();
        $("#logout-mode").show();
        $("#username-logout").val(username);
        $("#profile-section").show();
    }else {
        $("#profile-section").hide();
    }
});


$("#logout").click(function(){
    $("#profile-section").hide();
});

function voteup() {
    alert(1);
}
    
// search for proposals
app.controller('ctrl', function ($scope, $http) {
    $scope.searchProposals = function () {
        $scope.res = testData;

        $http({
            method: 'POST',
            url: '/search',
            data: {"search":$scope.search}
        }).then(function successCallback(response) {
            console.log(response.data);
            $scope.res = response.data['result'];
        }, function errorCallback(response) {
            console.log(response.data);
        });
    }
});

app.controller('submitController', function ($scope, $http) {
    $scope.submitProposal = function () {
        console.log("Submit new proposal");
        $http({
            method: 'POST',
            url: '/submitProposal',
            data: {
                "title":$scope.proposalTitle,
                "details":$scope.proposalDetails,
                "tags":$scope.proposalTags
            }
        }).then(function successCallback(response) {
            console.log(response.data);
            
            $("#title").val("");
            $("#description").val("");
            $("#tag").val("");
            
        }, function errorCallback(response) {
            console.log(response.data);
        });
    }
});
