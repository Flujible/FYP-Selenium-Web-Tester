$(document).ready(function(){
	if ($('#results').length) {
		$.ajax({
			type: "GET",
			url: "api/results",
			dataType: "json",
			success: function (data) {
				data.forEach(test => {
					$("table#results").append([
	          '<tr>',
	            '<td>',
	              test.key,
	            '</td>',
							'<td>',
	              test.status,
	            '</td>',
	          '</tr>',
	      ].join(''));
				})
			}
		});
	}
});
