jQuery(function($) {
  var uniqueId = 0;
  function new_fields (element){
    var new_id = uniqueId++;
    element.find("input, select, textarea").each(function () {
      var el = $(this);
      if(el.data("type") === "id"){
        el.remove();
      }else{
        el.val("");
        var prestr = el.prop("name").indexOf('new_') !== 0 ? 'new_' : ''
        el.prop("id", prestr + el.prop("id").replace(/\d+/, new_id));
        el.prop("name", prestr + el.prop("name").replace(/\d+/, new_id));
      }
    })
  };
  $('.form-fields').each(function () {
    var fields = $(this);
    var el = fields.find("input[data-type='id']").first();
    if(el && el.val() == "0"){
      new_fields(fields);
    }
  });

  $('.add_fields').click(function() {
    var target = $(this).data("target");
    var new_table_row = $(target + ' .form-fields:visible:first').clone();
    new_fields(new_table_row);
    // When cloning a new row, set the href of all icons to be an empty "#"
    // This is so that clicking on them does not perform the actions for the
    // duplicated row
    new_table_row.find("a").each(function () {
      var el = $(this);
      el.prop('href', '#');
    })
    $(target).append(new_table_row);
  })

  $('body').on('click', 'a.remove_fields', function() {
    el = $(this);
    el.prev("input[type=hidden]").val("1");
    el.closest(".fields").hide();
    if (el.prop("href").substr(-1) == '#') {
      el.parents("tr").fadeOut('hide');
    }else if (el.prop("href")) {
      $.ajax({
        type: 'POST',
        url: el.prop("href"),
        data: {
          _method: 'delete',
          authenticity_token: AUTH_TOKEN
        },
        success: function(response) {
          el.parents("tr").fadeOut('hide');
        },
        error: function(response, textStatus, errorThrown) {
          show_flash('error', response.responseText);
        }

      })
    }
    return false;
  });
});
