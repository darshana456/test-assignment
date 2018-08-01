var _dataUser;
var _loggedInFlag;
var stateObject;
var friendsList;

$(document).ready(function() {
  toStoreAndRetrieveUserData();
  toStoreFriendsData();
  historyManipulation();
});

function toStoreAndRetrieveUserData() {
  $.getJSON("/ajax/users.json", function(data) {
    _dataUserToStore = data;
    localforage.getItem('userDataStorage', function(err, value) {
      if(value == null) {
        localforage.setItem('userDataStorage', _dataUserToStore, function() {
          _dataUser = _dataUserToStore;
          toCheckLogIn();
        });
      } else {
        _dataUser = value;
        toCheckLogIn();
      }
    });
  });
}

function toCheckLogIn() {
  localforage.getItem('loggedIn', function(err, value) {
    _loggedInFlag = value;
    if(_loggedInFlag == 'true') {
      stateObject = {content: "about"};
      history.pushState(stateObject, null,"/about");
      var dashboard = new dashboardComponent(_dataUser);
      dashboard.addDashBoard();
      dashboard.addDashBoardHeader();
    } else {
      history.pushState(null, null, "/sign-in");
      var toSign = new toSignIn(_dataUser);
      toSign.signInContent();
    }
  });
}

function toStoreFriendsData() {
  localforage.getItem('friendsList', function(err, value) {
    if(value == null) {
      $.getJSON("/ajax/friendslist.json", function(data) {
        localforage.setItem('friendsList', data, function() {
        });
        friendsList = data;
      });
    } else {
      friendsList = value;
    }
  });
}

function historyManipulation() {
  window.onpopstate = function(event) {
    var stateObject = history.state;
    switch (stateObject.content) {
      case "timeline":
          $(".nav-item .marked").hide();
          $(".timeline1 .marked").show();
          var timelineComp = new timelineComponent(postData);
          timelineComp.addTimeline();
          break;
      case "about":
          $(".nav-item .marked").hide();
          $(".about .marked").show();
          var aboutComp = new aboutComponent(_dataUser);
          aboutComp.addAbout();
          break;
      case "photos":
          $(".nav-item .marked").hide();
          $(".photos .marked").show();
          var photosComp = new photosComponent();
          photosComp.addPhotos();
          break;
      case "friends":
          $(".nav-item .marked").hide();
          $(".photos .marked").show();
          var friendsComp = new friendsComponent(_dataUser, _friendsData);
          friendsComp.addFriends();
          break;
    }
  }
}
