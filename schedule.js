// Checks and sets the current day
let d = new Date();
d = d.getDay();

// Creates the class of schedule
class Schedule {
	constructor(tasks, checkedVal) {
		this.tasks = tasks;
		this.checkedVal = checkedVal;
	}
}

// Creates the UI
class UI {
	// Displays stored tasks
	static displaySchedule() {
		const tasks = DataHandling.tasksCheck();

		// Checks if the task is completed or not
		tasks.forEach((task) => {
			if (task.checkedVal === false) {
				UI.addTaskToList(task);
			}
			else {
				UI.addTaskToListWithCheck(task);
			}
		});
	}

	// Deletes task from UI
	static deleteTask(el) {
		if (el.classList.contains('delete')) {
			el.parentElement.parentElement.remove();
		}
	}

	// Add tasks to UI
	static addTaskToList(task) {
		const para = document.querySelector('#schedule-table');

		const div = document.createElement('div');

		div.innerHTML = `<div class="col s2"><div class="button delete">X</div></div><div class="col s8">${task.tasks}</div><label><input type="checkbox" /><span></span></label>`;

		para.appendChild(div);
	}

	// Displays the task marked!
	static addTaskToListWithCheck(task) {
		const para = document.querySelector('#schedule-table');

		const div = document.createElement('div');

		div.innerHTML = `<div class="col s2"><div class="button delete">X</div></div><div class="col s8 checked">${task.tasks}</div><label><input type="checkbox" checked /><span></span></label>`;

		para.appendChild(div);
	}

	// Show error message
	static errorMessage(message) {
		M.toast({html: message});
	}

	// Clears the field(s) of input
	static clearFields() {
		document.querySelector('#task').value = '';
	}

	// Returns the current day name
	static currentDay() {
		let dow;

		switch (d) {
			case 0:
				dow = "Sunday";
				break;

			case 1:
				dow = "Monday";
				break;

			case 2:
				dow = "Tuesday";
				break;

			case 3:
				dow = "Wednesday";
				break;

			case 4:
				dow = "Thursday";
				break;

			case 5:
				dow = "Friday";
				break;

			case 6:
				dow = "Saturday";
				break;

			default:
			break;
		}

		const header = document.querySelector(".dayHeader");

		header.innerHTML =  `${dow}`;
	}
}

// Class to handle data functions
class DataHandling {

	// Checks if the stored day is the current day
	// if the stored values correspond to current day
	static tasksCheck() {
		let tasksList, taskObj, day_of_week;

		if (localStorage.getItem('day_of_week') === null) {
			localStorage.setItem('day_of_week', d);
		}
		else if(localStorage.getItem('day_of_week') != d) {
			localStorage.clear(); //clears local storage
			localStorage.setItem('day_of_week', d);
		}


		if (localStorage.getItem('tasksList') === null) {
			tasksList = [];

			for (taskObj in tasksObj) {
				let arr = tasksObj[taskObj];

				if (arr.days.includes(d)) {
					var taskItem = new Schedule(arr.task, false);

					tasksList.push(taskItem);

					localStorage.setItem('tasksList', JSON.stringify(tasksList));
				}
			}
		}
		else {
			tasksList = JSON.parse(localStorage.getItem('tasksList'));
		}
		return tasksList;
	}

	// Add tasks to app
	static addTasks(task) {
		const tasksList = DataHandling.tasksCheck();

		tasksList.push(task);

		localStorage.setItem('tasksList', JSON.stringify(tasksList));
	}

	// Removes a task from localStorage
	static storageRemoveTask(text) {
		const tasks = DataHandling.tasksCheck();

		tasks.forEach((taskItem, index) => {
			if (taskItem.tasks === text) {
				tasks.splice(index, 1);
			}
		});

		localStorage.setItem('tasksList', JSON.stringify(tasks));
	}

	// Toggles checked class accordingly
	static toggleCheckClass(text, el) {
		const tasks = DataHandling.tasksCheck();

		tasks.forEach((taskItem, index) => {
			if (taskItem.tasks === text) {
				// Toggles true or false
				if (taskItem.checkedVal === false) {
					taskItem.checkedVal = true;
					$(el).addClass('checked');
				}
				else {
					taskItem.checkedVal = false;
					$(el).removeClass('checked');
				}
			}
		});

		localStorage.setItem('tasksList', JSON.stringify(tasks));
	}

	// Checks the status of task
	static statusCheckClass(text, el) {}
}

// Waits for document to load and then loads UI
document.addEventListener('DOMContentLoaded', UI.displaySchedule);
document.addEventListener('DOMContentLoaded', UI.currentDay);

// Adds the input to both UI and localStorage
document.querySelector('#schedule-form').addEventListener('submit', (e) => {
	// Prevent actual submit
	e.preventDefault();

	// Get from values
	const task = document.querySelector('#task').value;

	if (task === '') {
		UI.errorMessage('Task can not be empty!');
	}
	else {
		const schedule = new Schedule(task, false);

		DataHandling.addTasks(schedule);

		UI.addTaskToList(schedule);

		UI.clearFields();

		window.location.reload()
	}
	
});

// Delete tasks
$(document).ready(function() {
	// Deletes task
	$('.delete').click(function(e) {
		UI.deleteTask(e.target);

		DataHandling.storageRemoveTask(e.target.parentElement.nextElementSibling.textContent);
	});

	// Add checked to task
	$('input:checkbox').click(function(e) {
		DataHandling.toggleCheckClass(e.target.parentElement.previousElementSibling.textContent, e.target.parentElement.previousElementSibling);
	});

});