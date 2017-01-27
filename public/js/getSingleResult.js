$(document).ready(function(){
	if ($('#results').length) {
		$.ajax({
			type: "GET",
      url: "api/results/3da95ac6-7f3d-335e-f7e0-5f5f5215cb50",
			dataType: "json",
			success: console.log.bind(console)
      // function (data) {
			// 	data.forEach(test => {
			// 		$("table#results").append([
	    //       '<tr>',
	    //         '<td>',
	    //           test.key,
	    //         '</td>',
			// 				'<td>',
	    //           test.result,
	    //         '</td>',
	    //       '</tr>',
	    //   ].join(''));
			// 	})
			// }
		});
	}
});
