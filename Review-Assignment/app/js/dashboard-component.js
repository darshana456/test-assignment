var dashboardComponent = function(_dataUser) {
  var dashboardObject = {};
  var dataHeader;

  dashboardObject.addDashBoard = function() {     //create dashboard on authentication
    data = {image: "/images/hero-img.jpg"};
    $.get('/mustache/dashboard-mustache.mustache', function(template) {
      var info = Mustache.to_html(template, data);
      $(".main-content").html(info);

      var profileComp = new profileComponent(_dataUser);
      profileComp.addProfileCard();

      var navbarComp = new navbarComponent(_dataUser);
      navbarComp.addNavBar();

      var aboutComp = new aboutComponent(_dataUser);
      aboutComp.addAbout(_dataUser);

      var followComp = new followListComponent();
      followComp.addToFollowList();

      var friendsCardComponent = new friendsCardCreation(friendsList);
      friendsCardComponent.addFriendsCard();
    });
  }

  dashboardObject.addDashBoardHeader = function() {        //show logged-in user-name
    var str = _dataUser.users.name;
    var res = str.split(" ");
    dataHeader = {firstName: res[0], image: _dataUser.users.profileImg};
    $.get('/mustache/dashboard-header.mustache', function(template) {
      var info = Mustache.to_html(template, dataHeader);
      $(".login-user").html(info);
      onLogOut();
    });
  }

  var onLogOut = function() {        //on log-out
    $(".logout").on("click", function() {
      $(".login-user").removeClass("open");
      localforage.removeItem('loggedIn').then(function() {
      }).catch(function(err) {
      });
      history.pushState(null, null,"/sign-in");
      var toSign = new toSignIn(_dataUser);
      toSign.signInContent();
      toSign.addHeader();
    });
  }

  return dashboardObject;
}
