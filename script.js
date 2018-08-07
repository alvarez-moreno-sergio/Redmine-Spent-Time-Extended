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

function updateLastWorkingIssue(){
	let lastWorkingIssue = localStorage.getItem("lastWorkingIssue");
	if (lastWorkingIssue !== null && ~lastWorkingIssue) 
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

let spentTime = JSON.parse(localStorage.getItem("spentTime"));
if (isIssueAssignedToCurrentUser()){
	initializeLocalStorage();
	let issueId = $("div#content h2").text().substring($("div#content h2").text().indexOf("#")+1);
	updateLastWorkingIssue();

	if (spentTime[issueId] !== undefined)
		updateTimeSpentOnIssue(issueId);
	else {
		createNewSpentTimeOnIssue(issueId);
	}

	
	localStorage.setItem("lastWorkingIssue", issueId);
	localStorage.setItem("spentTime", JSON.stringify(spentTime));
}
else {
	alert('Issue not assigned to current user.');
}