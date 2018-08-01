var friendsComponent = function(_dataUser, friendsData) {
  var friendsObject = {};

  friendsObject.addFriends = function() {    //creates friends tab
    $.get('/mustache/friends.mustache', function(template) {
      var info = Mustache.to_html(template, friendsData);
      $('.dashboard-info').html(info);
      onFollowEvent(friendsData);
    });
  }

  var onFollowEvent = function(friendsData) {      //handles follow/unfollow people
    $(".follow-button").on("click", function() {
      var id = $(this).data("info");
      if($(this).text() == "Follow") {
        _dataUser.users.followings++;
        $(this).text("Following");
        $(".followings").text(_dataUser.users.followings);
        friendsData.friends[id].follow = false;
        friendsList.friends.push({image: friendsData.friends[id].image, name: friendsData.friends[id].name});
      } else {
        _dataUser.users.followings--;
        $(this).text("Follow");
        $(".followings").text(_dataUser.users.followings);
        friendsData.friends[id].follow = true;
        friendsList.friends.pop();
      }
      changeStorageData();
    });
  };

  var changeStorageData = function() {       //add data in local forage to persist
    localforage.setItem('userDataStorage', _dataUser, function() {
    });
    localforage.setItem('friends', friendsData, function() {
    });
    localforage.setItem('friendsList', friendsList, function() {
    });
    var friendsCardComponent = new friendsCardCreation(friendsList);
    friendsCardComponent.addFriendsCard();
  }

  return friendsObject;
}
