function isIssueAssignedToCurrentUser(){
	let loggedAsElem = $("div#loggedas a")[0];
	let assignedToElem = $(".issue div.attributes .assigned-to .value a")[0];

	let currentUserId = loggedAsElem.href.substring(loggedAsElem.href.lastIndexOf('/')+1);
	let issueAssignedToUserId = assignedToElem.href.substring(assignedToElem.href.lastIndexOf('/')+1);
	return currentUserId === issueAssignedToUserId;
}
function initializeLocalStorage(){
	let currentDay = new Date().toJSON().slice(0,10);
	if (spentTime === null || new Date(spentTime[0]) < new Date(currentDay)){
		spentTime = {};
		spentTime[0] = new Date(currentDay);
		localStorage.setItem("lastWorkingIssue", -1);
	}
}
function updateLastWorkingIssue(lastWorkingIssue, issueId){
	if (lastWorkingIssue !== null && ~lastWorkingIssue && lastWorkingIssue !== issueId) 
		updateTimeSpentOnIssue(lastWorkingIssue);
}
function updateTimeSpentOnIssue(issueId){
	spentTime[issueId].minutesSpent = calculateSpentTimeSinceLastUpdate(issueId);
	spentTime[issueId].updatedOn = new Date();
}
function calculateSpentTimeSinceLastUpdate(issueId){
	let minutesElapsed = (new Date().getTime() - new Date(spentTime[issueId].updatedOn).getTime()) / 60000
	return minutesElapsed + spentTime[issueId].minutesSpent;

}
function createNewSpentTimeOnIssue(issueId){
	spentTime[issueId] = {
		'name'			:	$(".subject h3").text(),
		'minutesSpent'	:	0,
		'updatedOn'		:	new Date()
	};
}
function work(){
	let result = false;
	if (isIssueAssignedToCurrentUser()){
		initializeLocalStorage();
		let issueId = $("div#content h2").text().substring($("div#content h2").text().indexOf("#")+1);

		let lastWorkingIssue = localStorage.getItem("lastWorkingIssue");
		updateLastWorkingIssue(lastWorkingIssue, issueId);

		if (spentTime[issueId] !== undefined)
			updateTimeSpentOnIssue(issueId);
		else {
			createNewSpentTimeOnIssue(issueId);
		}

		
		localStorage.setItem("lastWorkingIssue", issueId);
		localStorage.setItem("spentTime", JSON.stringify(spentTime));
		result = true;
	}
	else {
		alert('Issue not assigned to current user.');
	}

	return result;
}

let spentTime = JSON.parse(localStorage.getItem("spentTime"));
$("#content > .contextual").prepend($('<img id="playResumeSpentTime" class="play" src="http://grantcampbell.co.uk/wp-content/themes/muso/js/soundmanager2/img-big/musoplay-dark.png" height="10px" width="10px" />'));
$("#playResumeSpentTime").on('click', (e) => {
	let lastWorkingIssue = localStorage.getItem("lastWorkingIssue");
	let issueId = $("div#content h2").text().substring($("div#content h2").text().indexOf("#")+1);
	if (lastWorkingIssue !== issueId && work()){
		let playResumeClass = $("#playResumeSpentTime").attr('class');
		if (playResumeClass === "play"){
			$("#playResumeSpentTime").attr('src', 'http://pluspng.com/img-png/pause-button-png-pause-button-png-image-512.png');
		}
		else {
			$("#playResumeSpentTime").attr('src', 'http://grantcampbell.co.uk/wp-content/themes/muso/js/soundmanager2/img-big/musoplay-dark.png');
		}
		$("#playResumeSpentTime").toggleClass("play");
		$("#playResumeSpentTime").toggleClass("resume");
	}
	else {
		alert("Check console for errors.");
	}
	e.preventDefault();
});
