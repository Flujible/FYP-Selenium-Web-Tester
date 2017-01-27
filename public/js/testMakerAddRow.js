$(document).ready(function(){
    $("#addRowBtn").click(function(e){
      e.preventDefault();
        $("table#testMaker").append([
          '<tr>',
            '<td>',
              '<select class="form-control" name="idOrClass">',
                '<option>Class</option>',
                '<option>ID</option>',
              '</select>',
            '</td>',
            '<td><input type="text" class="form-control" name="elementID" placeholder="ID"/></td>',
            '<td>',
              '<select class="form-control" name="act">',
                '<option>Click</option>',
                '<option>Text Entry</option>',
                '<option>Assert</option>',
              '</select></td>',
            '<td><input type="text" class="form-control" name="textEnt" placeholder="Enter text here"/></td>',
          '</tr>',
      ].join(''));
    });
});

$(document).ready(function(){
  $("#dltRowBtn").click(function(e){
    e.preventDefault();
    if ($("table#testMaker tr").length > 2) {
      $("table#testMaker tr:last").remove();
    }
  });
});
