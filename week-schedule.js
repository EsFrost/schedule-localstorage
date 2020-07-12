// Creates the UI
class UI {
	// Displays stored tasks
	static displaySchedule(d, dow) {
		const tasks = DataHandling.tasksCheck(d);

		// Checks if the task is completed or not
		tasks.forEach((task) => {
			UI.addTaskToList(task, dow);
		});
	}

	// Add tasks to UI
	static addTaskToList(task, dow) {

		const para = document.querySelector(`.${dow}`);

		const div = document.createElement('div');

		div.className = 'col s12 tasks';

		div.innerHTML = `${task}`;

		para.appendChild(div);

	}

	// Returns the current day name
	static allDays() {
		let d, dow;

		for (let d = 0; d <= 6; d++) {

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

			const container = document.querySelector(".containerHead");

			const header = document.createElement('div');

			header.className = `dayHeader col s12 center ${dow}`;

			header.innerHTML =  `${dow}`;

			container.appendChild(header);

			UI.displaySchedule(d, dow);

		}
	}
}

// Class to handle data functions
class DataHandling {

	static tasksCheck(d) {
		let tasksList, taskObj;

		tasksList = [];

		for (taskObj in tasksObj) {
			let arr = tasksObj[taskObj];

			if (arr.days.includes(d)) {
				var taskItem = arr.task;

				tasksList.push(taskItem);
			}
		}
		return tasksList;
	}
}

// Waits for document to load and then loads UI
document.addEventListener('DOMContentLoaded', UI.allDays);