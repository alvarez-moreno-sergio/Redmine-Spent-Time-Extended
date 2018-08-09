let spentTime = JSON.parse(localStorage.getItem("spentTime"));
let content = "";
jQuery.each(spentTime, function(i, val) {
	content += (i==0) ? new Date(val): `#${i}: {name:${val.name}, minutesSpent:${val.minutesSpent}, updatedOn:${val.updatedOn}}`;
	content += "\n";
	// console.log(content);
});
alert(content);
