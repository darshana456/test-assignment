var navbarComponent = function(_dataUser) {
  var navbarObject = {};
  var friendsDataStorage;
  var friendsData;

  var postData = {
    image: "/images/avatar-1.png",
    post: [
      {
        title: "Title",
        Description: "Look deep into nature, and then you will understand everything better.",
        imageUrl: "/images/hero-img.jpg",
        relativeTime: '50 minutes ago'
      },
      {
        title: "Title",
        Description: "Look deep into nature, and then you will understand everything better.",
        imageUrl: "/images/hero-img.jpg",
        relativeTime: '50 minutes ago'
      },
    ]
  };

 var toStorePostData = function() {      // to store the data to post in local forage
   localforage.getItem('postData', function(err, value) {
     if(value == null) {
       storePostData();
     } else {
       postData = value;
     }
   });
 };

  var storePostData = function() {
    localforage.setItem('postData', postData, function() {
    });
  };

  toStorePostData();

  var getFriendsData = function() {       //get data for friends tab and store it in local-forage
    $.getJSON("/ajax/friends.json", function(data) {
      friendsDataStorage = data;
      friendsData = friendsDataStorage;
      localforage.getItem('friends', function(err, value) {
        if(value == null) {
          localforage.setItem('friends', friendsDataStorage, function() {
          });
        } else {
          friendsData = value;
        }
      });
    });
  };

  getFriendsData();

  var alterDropdownOnClick = function() {
    if($(window).width() < 469) {
      $('.navbar-collapse').collapse('hide');
    }
  }

  navbarObject.addNavBar = function() {
    $.get('/mustache/navbar.mustache', function(template) {
      var info = Mustache.to_html(template, _dataUser);
      $('.for-navigation').html(info);
      $(".nav-item .marked").hide();
      $(".about .marked").show();
      $(".page-info").html("<h3>About</h3>");
      eventOnNav();
    });
  };

  var eventOnNav = function() {
    $(".about").on("click", function() {
      alterDropdownOnClick();
      $(".page-info").html("<h3>About</h3>");
      stateObject = {content: "about"};
      history.pushState(stateObject, null, "/about");
      $(".nav-item .marked").hide();
      $(".about .marked").show();
      var aboutComp = new aboutComponent(_dataUser);
      aboutComp.addAbout();
    });

    $(".timeline1").on("click", function() {
      alterDropdownOnClick();
      $(".page-info").html("<h3>Timeline</h3>");
      stateObject = {content: "timeline"};
      history.pushState(stateObject, null, "/timeline");
      $(".nav-item .marked").hide();
      $(".timeline1 .marked").show();
      var timelineComp = new timelineComponent(postData);
      timelineComp.addTimeline();
    });

    $(".friends").on("click", function() {
      alterDropdownOnClick();
      $(".page-info").html("<h3>Friends</h3>");
      stateObject = {content: "friends"};
      history.pushState(stateObject, null, "/friends");
      $(".nav-item .marked").hide();
      $(".friends .marked").show();
      var friendsComp = new friendsComponent(_dataUser, friendsData);
      friendsComp.addFriends();
    });

    $(".photos").on("click", function() {
      alterDropdownOnClick();
      $(".page-info").html("<h3>Photos</h3>");
      stateObject = {content: "photos"};
      history.pushState(stateObject, null, "/photos");
      $(".nav-item .marked").hide();
      $(".photos .marked").show();
      var photosComp = new photosComponent();
      photosComp.addPhotos();
    });
  };

  return navbarObject;
}
