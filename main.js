// State
let t = 0;
let seconds = 0;
let enemeies = [...document.querySelectorAll(".cell")].map((cell) => {
    cell.mission = "protect";

    return cell;
});
let selected = [];

// Run at 30fps
let game_loop;

function start_game() {
    return setInterval(() => {
        _update();
        _draw();
    }, 1000 / 30);
}

function _update() {
    // Set frame
    t += 1;
    document.querySelector(".fps").innerText = t;

    // TODO: Add number field for user to set
    // Every second (30 frames)
    if (t % 30 === 0) {
        seconds += 1;
        document.querySelector(".seconds").innerText = seconds;

        const max_index = Math.min(9, enemeies.length);
        const index = Math.floor(Math.random() * max_index) + 1;
        const cell = enemeies.at(-index);

        console.log(`Selected #${cell} :`, cell);
        console.log(`Mission?`, cell.mission);

        // Set el to attack
        cell.mission = "attack";

        // Add to list of selected enemies
        selected.push(cell);

        // Update order selected
        document.querySelector(".selected:not(.cell)").innerHTML = selected
            .map((cell, index) => {
                const num = index + 1;

                return /*html*/ `
                      <div class="order-line">
                          <span style="margin-right: ${
                              num > 10 ? "1ch" : "2ch"
                          }">${num}</span><span>${cell.innerText}</span>
                      </div>
                  `;
            })
            .join("\n");

        if (enemeies.length == 0) {
            clearInterval(game_loop);
            return;
        }
    }

    // TODO:
    // Randomly select an enemy to be killed
    // at a random frame
    if (t % 30 === 0) {
        const index = Math.floor(Math.random() * (enemeies.length - 1));

        console.log(`#${index} killed.`);

        enemeies.splice(index, 1);
    }
}

function _draw() {
    [...document.querySelectorAll(".cell")].forEach((cell) => {
        if (selected.includes(cell)) {
            cell.classList.add("selected");
        }
    });
}

function reset_state() {
    t = 0;
    seconds = 0;
    enemeies = [...document.querySelectorAll(".cell")];
    range = enemeies.slice(-10);
    selected = [];
}

// start
document.querySelector(".start").addEventListener("click", () => {
    game_loop = start_game();
});

// stop
document.querySelector(".stop").addEventListener("click", () => {
    clearInterval(game_loop);
});

// reset
document.querySelector(".reset").addEventListener("click", () => {
    clearInterval(game_loop);

    // set state back to initial values
    reset_state();

    // reset frame counter
    document.querySelector(".fps").innerText = 0;

    // reset seconds elapsed
    document.querySelector(".seconds").innerText = 0;

    // remove selected class from cells
    [...document.querySelectorAll(".cell")].forEach((cell) => {
        if (cell.classList.contains("selected")) {
            cell.classList.remove("selected");
        }
    });

    document.querySelector(".selected:not(.cell)").innerHTML = /*html*/ `
          <div
              class="order-line placeholder"
          >
              None
          </div>
      `;
});
