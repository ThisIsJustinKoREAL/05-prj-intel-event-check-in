const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const progressBar = document.getElementById("progressBar");
const greeting = document.getElementById("greeting");
const totalCounter = document.getElementById("attendeeCount");

if (!localStorage.getItem("waterCount")) {
  localStorage.setItem("waterCount", "0");
}
if (!localStorage.getItem("zeroCount")) {
  localStorage.setItem("zeroCount", "0");
}
if (!localStorage.getItem("powerCount")) {
  localStorage.setItem("powerCount", "0");
}
if (!localStorage.getItem("attendeeCount")) {
  localStorage.setItem("attendeeCount", "0");
}

// track attendance
let count = parseInt(localStorage.getItem("attendeeCount"), 10);
if (isNaN(count)) {
  count = 0;
}
const maxCount = 50;

if (document.getElementById("waterCount")) {
  document.getElementById("waterCount").textContent = parseInt(
    localStorage.getItem("waterCount"),
    10,
  );
}
if (document.getElementById("zeroCount")) {
  document.getElementById("zeroCount").textContent = parseInt(
    localStorage.getItem("zeroCount"),
    10,
  );
}
if (document.getElementById("powerCount")) {
  document.getElementById("powerCount").textContent = parseInt(
    localStorage.getItem("powerCount"),
    10,
  );
}
if (totalCounter) {
  totalCounter.textContent = count;
}
if (progressBar) {
  const percentage = Math.round((count / maxCount) * 100);
  progressBar.style.width = percentage + "%";
  progressBar.setAttribute("aria-valuenow", percentage);
}

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault(); // stops default form submission

  // get form values
  const name = nameInput.value.trim();
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  if (!name || !team) {
    greeting.textContent = "Please enter a name and select a team.";
    return;
  }

  console.log(name, team, teamName);

  // increment count and update total counter
  count++;
  localStorage.setItem("attendeeCount", count);
  totalCounter.textContent = count;
  console.log("Total checkins: ", count);

  // update progress bar
  const percentage = Math.round((count / maxCount) * 100);
  if (progressBar) {
    progressBar.style.width = percentage + "%";
    progressBar.setAttribute("aria-valuenow", percentage);
  }
  console.log(`Progress: ${percentage}%`);

  // update team counter
  const teamCounter = document.getElementById(team + "Count");
  const newTeamCount = parseInt(teamCounter.textContent, 10) + 1;
  teamCounter.textContent = newTeamCount;
  if (team === "water") {
    localStorage.setItem("waterCount", newTeamCount);
  } else if (team === "zero") {
    localStorage.setItem("zeroCount", newTeamCount);
  } else if (team === "power") {
    localStorage.setItem("powerCount", newTeamCount);
  }
  const tempCount = localStorage.getItem(team + "Count");
  console.log(`Team ${teamName} count: ${tempCount}`);

  // show welcome message
  const message = `Welcome ${name} from ${teamName}!`;
  greeting.textContent = message;
  form.reset();
  //pop up message
  alert(message);

  if (count == maxCount) {
    const water = parseInt(localStorage.waterCount, 10);
    const zero = parseInt(localStorage.zeroCount, 10);
    const power = parseInt(localStorage.powerCount, 10);
    let winTeam = "";

    if (water >= zero && water >= power) {
      winTeam = "Team Water Wise";
    } else if (zero >= power) {
      winTeam = "Team Net Zero";
    } else {
      winTeam = "Team Renewables";
    }

    const celebrationMessage = `Max attendance reached! Congratulations to ${winTeam} for winning the attendance challenge!`;
    alert(celebrationMessage);
    localStorage.clear();
  }
});
