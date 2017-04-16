let counter = 3;

$(document).ready(function(){
    $("#addRowBtn").click(function(e){
      e.preventDefault();
      counter++;
        $("table#testMaker").append([
          '<tr>',
            '<td>',
              '<select class="form-control" id="idOrClass'+counter+'" name="idOrClass">',
                '<option>ID</option>',
                '<option>Class</option>',
              '</select>',
            '</td>',
            '<td><input type="text" class="form-control" name="elementID" id="elementID'+counter+'" placeholder="Element identifier"/></td>',
            '<td>',
              '<select class="form-control" id="act'+counter+'" name="act">',
                '<option>Click</option>',
                '<option>Text Entry</option>',
                '<option>Assert</option>',
              '</select></td>',
            '<td><input type="text" class="form-control" id="value'+counter+'" name="textEnt" placeholder="Enter text here"/></td>',
          '</tr>',
      ].join(''));
    });
});

$(document).ready(function(){
  $("#dltRowBtn").click(function(e){
    e.preventDefault();
    if ($("table#testMaker tr").length > 2) {
      counter--;
      $("table#testMaker tr:last").remove();
    }
  });
});
