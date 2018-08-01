var photosComponent = function() {
  var photosObject = {};

  var photos;

  photosObject.addPhotos = function() {
    localforage.getItem('photosData', function(err, value) {
      if(value == null) {
        $.getJSON("/ajax/photos.json", function(data) {
          localforage.setItem('photosData', data, function() {
            photos = data;
            showPhotos();
          });
        });
      } else {
        photos = value;
        showPhotos();
      }
    });
  };

  var showPhotos = function() {
    $.get('/mustache/photos.mustache', function(template) {
      var info = Mustache.to_html(template, photos);
      $('.dashboard-info').html(info);
      onPhotoClick(data);
    });
  };

  var onPhotoClick = function(data) {
    $(".photos-img").on("click", function() {
      var image = $(this).data("info");
      var image = {image: image};
      $.get('/mustache/photos-modal.mustache', function(template) {
        var info = Mustache.to_html(template, image);
        $(".modal").html(info);
      });
    });
  };

  return photosObject;
}
