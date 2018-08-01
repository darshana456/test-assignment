var timelineComponent = function(postData) {
  var timelineObject = {};
  var date = new Date();

  timelineObject.addTimeline = function() {
    alterRelativeTime();
    $.get('/mustache/timeline.mustache', function(template) {
      var info = Mustache.to_html(template, postData);
      $('.timeline-info').html(info);
      onPostClick(postData);
    });
  }

  var onPostClick = function(postData) {
    $(".post-button").on("click", function() {
      $.get('/mustache/post-modal.mustache', function(template) {
        var info = Mustache.to_html(template, data);
        $(".modal").html(info);
        validatePost();
      });
    });
  }

  var validatePost = function() {
    $("form[name = 'post']").validate({
      rules: {
        title: {
          required: true,
        },
        postImage: {
          validateImage: true,
        },
        description: {
          maxlength: 250,
        },
      },
      messages: {
        title: "Please enter the title",
        postImage: {
          validateImage: "Enter the valid Url",
        },
      },
      submitHandler: function(form) {
        addPost(postData);
      },
    });

    jQuery.validator.addMethod("validateImage", function(value, element) {
      return(value.match(/\.(jpeg|jpg|gif|png)$/) != null || value == '');
    });
  }

  var addPost = function(postData) {
      var title = $("#inputTitle").val();
      var description = $("#inputDesc").val();
      var imageUrl = $("#inputImage").val();
      var previous = date.getTime();
      var dataToPost = {
          title: title,
          time: previous,
          Description: description,
          imageUrl: imageUrl,
          relativeTime: ''
      };
      dataToPost['relativeTime'] = calculateTime(previous);
      postData.post.unshift(dataToPost);
      $.get('/mustache/timeline.mustache', function(template) {
        var info = Mustache.to_html(template, postData);
        $('.timeline-info').html(info);
        onAlterPostData();
        $("#myModal").modal('hide');
      });
  }

  var calculateTime = function(previous) {
    var current = date.getTime();
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
         return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
         return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';
    }

    else {
         return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';
    }
  }

  var onAlterPostData = function() {
    localforage.setItem('postData', postData, function() {
    });
  }

  var alterRelativeTime = function() {
    for( var i = 0; i < postData.post.length; i++) {
      postData.post[i].relativeTime = calculateTime(postData.post[i].time);
    }
  }

  return timelineObject;
}
