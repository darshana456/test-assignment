var friendsCardCreation = function() {

  var friendsCardCreationObject = {};

  friendsCardCreationObject.addFriendsCard = function() {
    $.get('/mustache/friends-card.mustache', function(template) {
      var info = Mustache.to_html(template, friendsList);
      $(".friends-card").html(info);
      $('[data-toggle="tooltip"]').tooltip(); 
    });
  }

  return friendsCardCreationObject;
}
