var aboutComponent = function(_dataUser) {

  var aboutObject = {};

  aboutObject.addAbout = function() {
    $(".nav-item .marked").hide();
    $(".about .marked").show();
    $.get('/mustache/about-content.mustache', function(template) {
      var info = Mustache.to_html(template, _dataUser);
      $('.dashboard-info').html(info);
      onEditDetails();
    });

    $.get('/mustache/about-occupation.mustache', function(template) {
      var info = Mustache.to_html(template, _dataUser);
      $('.dashboard-info').append(info);
      onEditOccupation();
    });
  };

  var onEditDetails = function() {
    $(".edit-details-button").on("click", function() {
      $.get('/mustache/edit-basic-details.mustache', function(template) {
        var info = Mustache.to_html(template, _dataUser);
        $('.details').html(info);
        $("#inputName").attr("value", _dataUser.users.name);
        $("#inputLocation").attr("value", _dataUser.users.location);
        $('#inputStatus option[value='+ _dataUser.users.maritalStatus +']').attr('selected','selected');
        $("#inputBirthDate").attr("value", _dataUser.users.birthDate);
        if(_dataUser.users.Gender == "Female") {
          $("input[value='Female']").prop('checked', true);
        } else {
          $("input[value='Male']").prop('checked', true);
        }
        onSave();
      });
    });
  };

  var onSave = function() {
    $(".save").on("click", function() {
      if($('#male').prop('checked')) {
        _dataUser.users.Gender = $('#male').val();
      } else if($('#female').prop('checked')) {
        _dataUser.users.Gender = $("#female").val();
      }
      _dataUser.users.maritalStatus = $("#inputStatus").val();
      _dataUser.users.location = $("#inputLocation").val();
      _dataUser.users.name = $("#inputName").val();
      _dataUser.users.birthDate = $("#inputBirthDate").val();
      storeData();
      callComponentOnSave();
    });
    $(".cancel").on("click", function() {
      callComponentOnSave();
    });
  };

  var storeData = function() {
    localforage.setItem('userDataStorage', _dataUser, function() {
    });
  };

  var callComponentOnSave = function() {
    var aboutComp = new aboutComponent(_dataUser);
    aboutComp.addAbout(_dataUser);
    var profileComp = new profileComponent(_dataUser);
    profileComp.addProfileCard();
    var dashboard = new dashboardComponent(_dataUser);
    dashboard.addDashBoardHeader();
  };

  var onEditOccupation = function() {
    $(".edit-occupation-button").on("click", function() {
      $.get('/mustache/edit-occupation.mustache', function(template) {
        var info = Mustache.to_html(template, _dataUser);
        $('.occupation-details').html(info);
        $("#inputOccupation").attr("value", _dataUser.users.occupation);
        $("#inputSkills").attr("value", _dataUser.users.skills);
        $("#inputJobs").attr("value", _dataUser.users.jobs);
        onSaveOccupation();
      });
    })
  };

  var onSaveOccupation = function() {
    $(".save").on("click", function() {
      _dataUser.users.occupation = $("#inputOccupation").val();
      _dataUser.users.skills = $("#inputSkills").val();
      _dataUser.users.jobs = $("#inputJobs").val();
      storeData();
      callComponentOnSave();
    });
    $(".cancel").on("click", function() {
      callComponentOnSave();
    });
  };

  return aboutObject;
}
