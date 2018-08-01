var followListComponent = function() {
  var followObject = {};

  followObject.addToFollowList = function() {     //creates who to follow list
    var data = { image: "/images/avatar-1.png" };
    data["iteration"] = ["first","second", "third", "fourth", "fifth"];
    $.get('/mustache/follow-list.mustache', function(template) {
      var info = Mustache.to_html(template, data);
      $('.follow-card').append(info);
    });
  }

  return followObject;
}
