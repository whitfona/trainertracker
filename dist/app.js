// Enter Goals
const goalInput = document.getElementById('goal-input');
// Add event listener to add button
document.querySelector('#btn-goals').addEventListener('click', addGoal);
// Load goals from local storage
document.addEventListener('DOMContentLoaded', getGoals);
// Load goals from local storage
document.addEventListener('DOMContentLoaded', getDailyLogs);
// Load trainings from local storage
document.addEventListener('DOMContentLoaded', getTrainings);

function addGoal() {
  const newGoal = document.createElement('li');
  const list = document.getElementById('goal-list');

  newGoal.classList.add('li-grid', 'px-1');
  newGoal.innerHTML = `<p>${goalInput.value}</p><div><i class="fas fa-check"><i><i class="fas fa-times"></i></div>`;
  newGoal.appendChild = goalInput.value;

  list.appendChild(newGoal);

  // Store in Local Storage
  goalInLocalStorage(goalInput.value);

  goalInput.value = '';

  deleteGoal();
  addCheck();
  
}

// Get Goals from Local Storage
function getGoals() {
  let goals;
  if(localStorage.getItem('goals') === null) {
    goals = [];
  } else {
    goals = JSON.parse(localStorage.getItem('goals'));
  }

  goals.forEach(function(goal) {
    const newGoal = document.createElement('li');
    const list = document.getElementById('goal-list');
  
    newGoal.classList.add('li-grid', 'px-1');
    newGoal.innerHTML = `<p>${goal}</p><div><i class="fas fa-check"><i><i class="fas fa-times"></i></div>`;
    newGoal.appendChild = goal;
  
    list.appendChild(newGoal);
  });
}

// Store Goals in Local Storage
function goalInLocalStorage(goal) {
  let goals;
  if(localStorage.getItem('goals') === null) {
    goals = [];
  } else {
    goals = JSON.parse(localStorage.getItem('goals'));
  }

  goals.push(goal);

  localStorage.setItem('goals', JSON.stringify(goals));
}



// Turn checkmark red after completed goal
function addCheck() {
const goalChecks = document.querySelectorAll('i');

goalChecks.forEach(goalCheck => {
  goalCheck.addEventListener('click', (e) => {
    if (goalCheck.className.includes('fa-check')) {
      goalCheck.style.color = '#ee5253';
    }
  })
})
}

// Delete goal
function deleteGoal() {
  const deleteGoals = document.querySelectorAll('i');

  deleteGoals.forEach(deleteGoal => {
    deleteGoal.addEventListener('click', () => {
      if(deleteGoal.className.includes('fa-times')) {
       deleteGoal.parentElement.parentElement.parentElement.parentElement.remove();
      //  Remove from Local Storage
      removeGoalFromLocalStorage(deleteGoal.parentElement.parentElement.parentElement.parentElement);
      }
    })
  })
}

// Remove Goal from Local Storage
function removeGoalFromLocalStorage(goalItem) {
  let goals;
  if(localStorage.getItem('goals') === null) {
    goals = [];
  } else {
    goals = JSON.parse(localStorage.getItem('goals'));
  }

  goals.forEach(function(goal, index) {
    if(goalItem.textContent === goal){
      goals.splice(index, 1);
    }
  });

  localStorage.setItem('goals', JSON.stringify(goals))
}

// NUTRITION CALCULATIONS

document.getElementById('btn-nutrition').addEventListener('click', () => {
  const calories = document.getElementById('target-calories');
  const protein = document.getElementById('target-protein');
  const fats = document.getElementById('target-fats');
  const carbs = document.getElementById('target-carbs');
  if ((Number(protein.value) + Number(fats.value) + Number(carbs.value)) != 100) {
    showError('Protein, Fats and Carbs must equal 100%');
  } else {
  macrosCalc();
  // calories.value = '';
  // protein.value = '';
  // fats.value = '';
  // carbs.value = '';

      let macro = {
        calories: document.getElementById('target-calories').value,
        protein: document.getElementById('target-protein').value,
        fats: document.getElementById('target-fats').value,
        carbs: document.getElementById('target-carbs').value
      }
      // Save to Local Storage
      localStorage.setItem('Macros', JSON.stringify(macro));
  }
})

function macrosCalc() {
  // Define Variables
  const calories = document.getElementById('target-calories').value;
  const protein = document.getElementById('target-protein').value;
  const fats = document.getElementById('target-fats').value;
  const carbs = document.getElementById('target-carbs').value;
  // Calories Calculation
  document.getElementById('target-calories-output').innerHTML = calories;
  // Protein Calculation
  document.getElementById('target-protein-output').innerHTML = protein;
  document.getElementById('target-protein-output-grams').innerHTML = Math.ceil((Number(calories) * (Number(protein) / 100)) / 4);
  // Fats Calculation
  document.getElementById('target-fats-output').innerHTML = fats;
  document.getElementById('target-fats-output-grams').innerHTML = Math.ceil((Number(calories) * (Number(fats) / 100)) / 9);
  // Carbs Calculation
  document.getElementById('target-carbs-output').innerHTML = carbs;

  document.getElementById('target-carbs-output-grams').innerHTML = Math.ceil((Number(calories) * (Number(carbs) / 100)) / 4);
}

// Show Error Message
function showError(error) {
  const errorDiv = document.createElement('div');
  const nutrition = document.getElementById('nutrition');
  const title = document.querySelector('.nutrition-inner-grid-container');

  errorDiv.className = 'alert error';
  errorDiv.appendChild(document.createTextNode(error));
  nutrition.insertBefore(errorDiv, title);

  window.setTimeout(clearError, 4000);
}
// Clear Error Message
function clearError() {
  document.querySelector('.alert').remove();
}

// Get from Local Storage
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('Macros') === null) {
    return 1
  } else {
    getMacros();
  }
});

function getMacros() {
  macros = JSON.parse(localStorage.getItem('Macros'));
  // Calories
  document.getElementById('target-calories-output').innerHTML = macros.calories;
  // Protein
  document.getElementById('target-protein-output').innerHTML = macros.protein;
  document.getElementById('target-protein-output-grams').innerHTML = Math.ceil((Number(macros.calories) * (Number(macros.protein) / 100)) / 4);
  // Fats
  document.getElementById('target-fats-output').innerHTML = macros.fats;
  document.getElementById('target-fats-output-grams').innerHTML = Math.ceil((Number(macros.calories) * (Number(macros.fats) / 100)) / 9);
  // Carbs
  document.getElementById('target-carbs-output').innerHTML = macros.carbs;
  document.getElementById('target-carbs-output-grams').innerHTML = Math.ceil((Number(macros.calories) * (Number(macros.carbs) / 100)) / 4);
}

// TRAINING SUMMARY
// Log training day on new line
document.getElementById('btn-training-summary').addEventListener('click', addTrainingDay);

function addTrainingDay(e) {
  e.preventDefault();
  const date = document.getElementById('training-date').value;
    const amSel = document.getElementById('am-pm-toggle');
  const amPm = amSel.options[amSel.selectedIndex].text;
    const typeSel = document.getElementById('training-type');
  const type = typeSel.options[typeSel.selectedIndex].text;
  const rpe = document.getElementById('rpe').value;
  const notes = document.getElementById('notes').value;

  const dailyTraining = {
    date: date,
    amPm: amPm,
    type: type,
    rpe: rpe,
    notes: notes
  }
  
  // create new Div
 const newTrainingItem = document.createElement('div');
  //  Add classList
  newTrainingItem.classList.add('training-summary-grid-container');
  newTrainingItem.innerHTML = `<p>${date}</p><p>${amPm}</p><p>${type}</p><p>${rpe}</p><p>${notes}</p><i class="fas fa-times"></i>`;
  // append to parent
  const container = document.getElementById('training-summary');
  container.appendChild(newTrainingItem);

  // Add to Local Storage
  trainingDayInLocalStorage(dailyTraining);
  deleteTrainingItem();
}

// Get training day from Local Storage
function getTrainings() {
  let dailyTrainings;
  if(localStorage.getItem('dailyTrainings') === null) {
    dailyTrainings = [];
  } else {
    dailyTrainings = JSON.parse(localStorage.getItem('dailyTrainings'));
  }

  dailyTrainings.forEach(function(dailyTraining) {
  const date = document.getElementById('training-date').value;
    const amSel = document.getElementById('am-pm-toggle');
  const amPm = amSel.options[amSel.selectedIndex].text;
    const typeSel = document.getElementById('training-type');
  const type = typeSel.options[typeSel.selectedIndex].text;
  const rpe = document.getElementById('rpe').value;
  const notes = document.getElementById('notes').value;

  // const dailyTraining = {
  //   date: date,
  //   amPm: amPm,
  //   type: type,
  //   rpe: rpe,
  //   notes: notes
  // }
  
  // create new Div
 const newTrainingItem = document.createElement('div');
  //  Add classList
  newTrainingItem.classList.add('training-summary-grid-container');
  newTrainingItem.innerHTML = `<p>${dailyTraining.date}</p><p>${dailyTraining.amPm}</p><p>${dailyTraining.type}</p><p>${dailyTraining.rpe}</p><p>${dailyTraining.notes}</p><i class="fas fa-times"></i>`;
  // append to parent
  const container = document.getElementById('training-summary');
  container.appendChild(newTrainingItem);
  });
}

// Add training day to Local Storage
function trainingDayInLocalStorage(dailyTraining) {
  let dailyTrainings;
  if(localStorage.getItem('dailyTrainings') === null) {
    dailyTrainings = [];
  } else {
    dailyTrainings = JSON.parse(localStorage.getItem('dailyTrainings'));
  }

  dailyTrainings.push(dailyTraining);

  localStorage.setItem('dailyTrainings', JSON.stringify(dailyTrainings));
}

function deleteTrainingItem() {
  const deleteTrainings = document.querySelectorAll('i');

  deleteTrainings.forEach(deleteTraining => {
    deleteTraining.addEventListener('click', () => {
      if(deleteTraining.className.includes('fa-times')) {
        deleteTraining.parentElement.remove();
      //  Remove from Local Storage
      removeTrainingFromLocalStorage(deleteTraining.parentElement);
      }
    })
  })
}

// Remove Training Item from Local Storage
function removeTrainingFromLocalStorage(dailyLogItem) {
  let dailyTrainings;
  if(localStorage.getItem('dailyTrainings') === null) {
    dailyTrainings = [];
  } else {
    dailyTrainings = JSON.parse(localStorage.getItem('dailyTrainings'));
  }

  dailyTrainings.forEach(function(dailyTraining, index) {
    if(dailyLogItem.textContent === dailyTraining){
      dailyTrainings.splice(index, 1);
    }
  });

  localStorage.setItem('dailyTrainings', JSON.stringify(dailyTrainings))
}

// NUTRITION SUMMARY
// Log day on a new line
document.getElementById('btn-nutrition-summary').addEventListener('click', addDayLog);

function addDayLog() {  
  // Define Inputs
  const date = document.getElementById('nutrition-date').value;
  const weight = document.getElementById('add-weight').value;
  const calories = document.getElementById('add-calories').value;
  const protein = document.getElementById('add-protein').value;
  const fats = document.getElementById('add-fats').value;
  const carbs = document.getElementById('add-carbs').value;
  
  const dailySummary = {
    date: date,
    weight: weight,
    calories: calories,
    protein: protein,
    fats: fats,
    carbs: carbs
  }
  // Create new Element
  const newLog = document.createElement('div');
  const logContainer = document.querySelector('.nutrition-summary-outer');

  // add ClassList
  newLog.classList.add('nutrition-summary-grid-container')
  // create new item
  newLog.innerHTML = `<p>${date}</p><p>${weight} lbs</p><p>${calories}</p><p>${protein} g</p><p>${fats} g</p><p>${carbs} g</p><i class="fas fa-times"></i>`;

  logContainer.appendChild(newLog);

  // Store in Local Storage
  dailyLogInLocalStorage(dailySummary);
  
  deleteDayLog();
}

// Get Daily Logs from Local Storage
function getDailyLogs() {
  let dailyLogs;
  if(localStorage.getItem('dailyLogs') === null) {
    dailyLogs = [];
  } else {
    dailyLogs = JSON.parse(localStorage.getItem('dailyLogs'));
  }

  dailyLogs.forEach(function(dailyLog) {
  const date = document.getElementById('nutrition-date');
  const weight = document.getElementById('add-weight');
  const calories = document.getElementById('add-calories');
  const protein = document.getElementById('add-protein');
  const fats = document.getElementById('add-fats');
  const carbs = document.getElementById('add-carbs');

  // Create new Element
  const newLog = document.createElement('div');
  const logContainer = document.querySelector('.nutrition-summary-outer');

  // add ClassList
  newLog.classList.add('nutrition-summary-grid-container')
  // create new item
  newLog.innerHTML = `<p>${dailyLog.date}</p><p>${dailyLog.weight} lbs</p><p>${dailyLog.calories}</p><p>${dailyLog.protein} g</p><p>${dailyLog.fats} g</p><p>${dailyLog.carbs} g</p><i class="fas fa-times"></i>`;

  logContainer.appendChild(newLog);
  });
}

// Store Daily Log in Local Storage
function dailyLogInLocalStorage(dailyLog) {
  let dailyLogs;
  if(localStorage.getItem('dailyLogs') === null) {
    dailyLogs = [];
  } else {
    dailyLogs = JSON.parse(localStorage.getItem('dailyLogs'));
  }

  dailyLogs.push(dailyLog);

  localStorage.setItem('dailyLogs', JSON.stringify(dailyLogs));
}

// Delete Nutrition Summary Log Item
function deleteDayLog() {
  const deleteDayLogs = document.querySelectorAll('i');

  deleteDayLogs.forEach(deleteDayLog => {
    deleteDayLog.addEventListener('click', () => {
      if(deleteDayLog.className.includes('fa-times')) {
        deleteDayLog.parentElement.remove();
      //  Remove from Local Storage
      removeDailyLogFromLocalStorage(deleteDayLog.parentElement);
      }
    })
  })
}

// Remove Goal from Local Storage
function removeDailyLogFromLocalStorage(dailyLogItem) {
  let dailyLogs;
  if(localStorage.getItem('dailyLogs') === null) {
    dailyLogs = [];
  } else {
    dailyLogs = JSON.parse(localStorage.getItem('dailyLogs'));
  }

  dailyLogs.forEach(function(dailyLog, index) {
    if(dailyLogItem.textContent == dailyLog){
      dailyLogs.splice(index, 1);
    }
  });

  localStorage.setItem('dailyLogs', JSON.stringify(dailyLogs))
}

// Set Date default to today's date
document.querySelector('#nutrition-date').valueAsDate = new Date();
document.querySelector('#training-date').valueAsDate = new Date();