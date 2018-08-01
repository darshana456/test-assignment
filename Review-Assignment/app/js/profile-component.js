var profileComponent = function(_dataUser) {

  var profileObject = {};

  profileObject.addProfileCard = function() {      // creates user profile card
    $.get('/mustache/profile-card.mustache', function(template) {
      var info = Mustache.to_html(template, _dataUser);
      $('.profile-card').html(info);
    });
  };

  return profileObject;
}
