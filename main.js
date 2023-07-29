// State
let t = 0;
let seconds = 0;
let enemeies = [...document.querySelectorAll(".cell")];
let range = enemeies.slice(-10);
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

    // Every second (30 frames)
    if (t % 30 === 0) {
        seconds += 1;
        document.querySelector(".seconds").innerText = seconds;

        if (enemeies.length == 0) {
            return;
        }

        const row_len = 10;

        const el = rnd_element(range);
        const range_index = range.indexOf(el);
        const enemies_index = enemeies.indexOf(el);

        const new_el = enemeies[enemies_index - row_len];

        // enemeies.splice(enemies_index, 1);

        range.splice(range_index, 1);

        // if (new_el) {
        //     range.splice(range_index, 1, new_el);
        // } else {
        //     range.splice(range_index, 1);
        // }

        console.log(
            "Range:",
            range.map((c) => c.innerText)
        );
        console.log("Selected:", el);
        console.log("Range index:", range_index);
        console.log(
            "Enemies:",
            enemeies.map((c) => c.innerText)
        );
        console.log("Enemies index:", enemies_index);
        console.log("New enemy?", new_el);
        console.log("----------------------------------------\n");

        selected.push(el);

        document.querySelector(".selected:not(.cell)").innerHTML = selected
            .map(
                (cell, index) => /*html*/ `
                        <div class="order-line">
                            <span>#${index + 1} </span>
                            <span>${cell.innerText}</span>
                        </div>
                    `
            )
            .join("\n");

        if (range.length === 0) {
            range = enemeies.slice(-10);
        }
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

function rnd_element(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// start
document.querySelector("button.start").addEventListener("click", () => {
    game_loop = start_game();
});

// stop
document.querySelector("button.stop").addEventListener("click", () => {
    clearInterval(game_loop);
});

// reset
document.querySelector("button.reset").addEventListener("click", () => {
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
        <div class="order-line placeholder">None</div>
    `;
});
