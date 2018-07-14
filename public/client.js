const data = {
  labels: ['Workflow', 'Audience', 'Scenario', 'Code', 'Interface', 'Data'],
  datasets: [{ data: [0, 0, 0, 0, 0, 0] }],
};


const ctx = document.getElementById('myChart');

Chart.defaults.global.defaultFontFamily = 'Oxygen';
Chart.defaults.global.defaultFontSize = 8;
Chart.defaults.global.defaultFontColor = 'rgba(18,0,75,0.5)';

// const myRadarChart = new Chart(ctx, {
//   type: 'radar',
//   data,
//   options: {
//     backgroundColor: '#fffff',
//     legend: {
//       display: false,
//     },
//     scale: {
//       ticks: {
//         display: true,
//         beginAtZero: true,
//         min: -2,
//         max: 13,
//         stepSize: 3,
//       },
//     },
//   },
// });

const selectWorkflow = document.getElementById('workflow');
const selectAudience = document.getElementById('audience');
const selectScenario = document.getElementById('scenario');
const selectCode = document.getElementById('code');
const selectInterface = document.getElementById('interface');
const selectData = document.getElementById('data');
const reset = document.getElementById('reset');

const selectElements = [
  selectWorkflow,
  selectAudience,
  // selectScenario,
  // selectCode,
  // selectInterface,
  // selectData,
];

// function setBlank() {
//   selectElements.forEach((menu) => {
//     menu.selectedIndex = s;
//   });
// }

// setBlank();

// Use an object to keep track of the current selections
const currentSelections = {
  workflow: null,
  audience: null,
  scenario: null,
  code: null,
  interface: null,
  data: null,
};


// Function to update current selections and graph
function updateGraph() {
  // identify ID of triggering element
  const elementID = this.id;
  // write value selected to currentSelections
  const selectedValue = this.value;
  currentSelections[elementID] = selectedValue;

  // update graph data
  graphSelect(this, this.selectedOptions[0].value);

  // replot graph
  myRadarChart.update();

  // update option menus
  updateOptions(selectedValue, elementID);

  // set all unselected options to blank
  setBlank();

  // set label of selected elements
  setSelected();
}


// Function to update available options
function updateOptions(value, id) {
  const options = {
    1: 1,
    2: 2,
    3: 3,
    5: 5,
    8: 8,
    13: 13,
  };

  for (var id in currentSelections) {
    for (const key in options) {
      if (currentSelections[id] == options[key]) {
        options[key] = null;
      }
    }
  }

  newMenus(options);
}

// Function to build and apply new menus

function newMenus(obj) {
  selectElements.forEach((element) => {
    element.options.length = 0;
  });


  selectElements.forEach((element) => {
    let index = -1;
    for (const key in obj) {
      index++;
      if (obj[key] != null) {
        element.options[index] = new Option(key, key, false, false);
      } else {
        element.options[index] = new Option(key, key, false, false);
        element.options[index].hidden = true;
      }
    }
  });
  selectElements.forEach((element) => {
    for (let j = 1; j < element.options.length; j++) {
      if (element[j].value == '') {
        element[j].hidden = true;
      }
    }
  });
}


// Function to determine if value is already selected in any options

function valuePresent(value) {
  for (const id in currentSelections) {
    if (currentSelections[id] == value) {
      return true;
    } return false;
  }
}


// Function to update graph data
function graphSelect(obj, value) {
  switch (obj.id) {
    case 'workflow':
      myRadarChart.data.datasets[0].data[0] = value;
      break;

    case 'audience':
      myRadarChart.data.datasets[0].data[1] = value;
      break;

    case 'scenario':
      myRadarChart.data.datasets[0].data[2] = value;
      break;

    case 'code':
      myRadarChart.data.datasets[0].data[3] = value;
      break;

    case 'interface':
      myRadarChart.data.datasets[0].data[4] = value;
      break;

    case 'data':
      myRadarChart.data.datasets[0].data[5] = value;
      break;
  }
}

// Function to set selected options per currentSelections

function setSelected() {
  for (const key in currentSelections) {
    if (currentSelections[key] != null) {
      const menuIndex = getIndexByID(key);
      const optionIndex = getIndexByValue(currentSelections[key]);
      selectElements[menuIndex].options[optionIndex].hidden = false;
      selectElements[menuIndex].options[optionIndex].label = currentSelections[key];
      selectElements[menuIndex].options[optionIndex].selected = true;
    }
  }
}

// get value by index

function getValueByIndex(index) {
  switch (index) {
    default:
      return null;
      break;

    case '0':
      return 1;
      break;

    case '1':
      return 2;
      break;

    case '2':
      return 3;
      break;

    case '3':
      return 5;
      break;

    case '4':
      return 8;
      break;

    case '5':
      return 13;
      break;
  }
}

// Get index by Value
function getIndexByValue(value) {
  switch (value) {
    default:
      return null;
      break;

    case '1':
      return 0;
      break;

    case '2':
      return 1;
      break;

    case '3':
      return 2;
      break;

    case '5':
      return 3;
      break;

    case '8':
      return 4;
      break;

    case '13':
      return 5;
      break;
  }
}

// Get index by ID
function getIndexByID(id) {
  switch (id) {
    default:
      return null;
      break;

    case 'workflow':
      return 0;
      break;

    case 'audience':
      return 1;
      break;

    case 'scenario':
      return 2;
      break;

    case 'code':
      return 3;
      break;

    case 'interface':
      return 4;
      break;

    case 'data':
      return 5;
      break;
  }
}

// Function to reset selections
function resetSelections() {
  // unhide all options
  selectElements.forEach((menu) => {
    for (let i = 0; i < menu.options.length; i++) {
      menu.options[i].hidden = false;
    }
    menu.selectedIndex = 0;
  });

  // reset graph
  for (let i = 0; i < myRadarChart.data.datasets[0].data.length; i++) {
    myRadarChart.data.datasets[0].data[i] = 0;
  }

  myRadarChart.update();

  // clear currentSelections
  for (const key in currentSelections) {
    currentSelections[key] = null;
  }
}


selectWorkflow.addEventListener('change', updateGraph, false);
selectAudience.addEventListener('change', updateGraph, false);
// selectScenario.addEventListener('change', updateGraph, false);
// selectCode.addEventListener('change', updateGraph, false);
// selectInterface.addEventListener('change', updateGraph, false);
// selectData.addEventListener('change', updateGraph, false);
// reset.addEventListener('click', resetSelections, false);
