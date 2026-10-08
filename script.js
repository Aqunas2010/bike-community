// ========================================
// RIDER DATA
// ========================================

let riders = [
    {
        name: "Arun Kumar",
        bike: "KTM Duke 250",
        from: "Chennai",
        destination: "Ooty",
        budget: 4500,
        date: "15 Oct 2026"
    },

    {
        name: "Karthik Raj",
        bike: "Royal Enfield GT 650",
        from: "Chennai",
        destination: "Ooty",
        budget: 6000,
        date: "15 Oct 2026"
    },

    {
        name: "Rahul S",
        bike: "Yamaha MT 15",
        from: "Bangalore",
        destination: "Ooty",
        budget: 5500,
        date: "16 Oct 2026"
    },

    {
        name: "Vijay",
        bike: "Apache RTR 200",
        from: "Chennai",
        destination: "Kodaikanal",
        budget: 4000,
        date: "20 Oct 2026"
    },

    {
        name: "Praveen",
        bike: "Royal Enfield Classic 350",
        from: "Coimbatore",
        destination: "Coorg",
        budget: 6500,
        date: "22 Oct 2026"
    }
];


// ========================================
// ELEMENTS
// ========================================

const riderContainer =
    document.getElementById("riderContainer");

const allRidersContainer =
    document.getElementById("allRidersContainer");


// ========================================
// RENDER RIDERS
// ========================================

function renderRiders(list = riders, container = riderContainer) {

    container.innerHTML = "";

    if (list.length === 0) {

        container.innerHTML = `
            <div class="empty-card">
                <h2>No riders found</h2>
                <p>Try another destination or rider name.</p>
            </div>
        `;

        return;
    }


    list.forEach((rider, index) => {

        const card = document.createElement("article");

        card.className = "rider-card";


        card.innerHTML = `

            <div class="rider-photo">

                🏍️

                <span class="rider-match">
                    ${96 - index * 3}% Match
                </span>

            </div>


            <div class="rider-body">

                <div class="rider-name">

                    <div>

                        <h3>
                            ${rider.name}
                        </h3>

                        <span>
                            ● Available
                        </span>

                    </div>

                </div>


                <p class="bike-name">
                    🏍️ ${rider.bike}
                </p>


                <div class="ride-route">

                    <span>
                        📍 ${rider.from}
                    </span>

                    <b>→</b>

                    <span>
                        📌 ${rider.destination}
                    </span>

                </div>


                <div class="ride-meta">

                    <span>
                        📅 ${rider.date}
                    </span>

                    <span>
                        💰 ₹${Number(rider.budget).toLocaleString()}
                    </span>

                </div>


                <button
                    class="join-btn"
                    data-name="${rider.name}">

                    Join Ride

                </button>

            </div>
        `;


        container.appendChild(card);

    });


    // JOIN BUTTONS

    container
        .querySelectorAll(".join-btn")
        .forEach(button => {

            button.addEventListener("click", function() {

                joinRide(
                    button.dataset.name,
                    button
                );

            });

        });

}


// INITIAL LOAD

renderRiders();


// ========================================
// JOIN RIDE
// ========================================

function joinRide(name, button) {

    button.innerText = "Request Sent ✓";

    button.style.background = "#22a060";

    button.disabled = true;

    showToast(
        `Ride request sent to ${name}`
    );

}


// ========================================
// SEARCH RIDERS
// ========================================

document
.getElementById("searchInput")
.addEventListener("input", function() {

    const value =
        this.value.toLowerCase().trim();


    const filtered =
        riders.filter(rider =>

            rider.name.toLowerCase().includes(value) ||

            rider.bike.toLowerCase().includes(value) ||

            rider.destination.toLowerCase().includes(value) ||

            rider.from.toLowerCase().includes(value)

        );


    renderRiders(filtered);

});


// ========================================
// FILTER
// ========================================

document
.querySelectorAll(".filter")
.forEach(button => {

    button.addEventListener("click", function() {

        document
        .querySelectorAll(".filter")
        .forEach(btn =>
            btn.classList.remove("active")
        );

        this.classList.add("active");


        const filter =
            this.dataset.filter;


        if (filter === "all") {

            renderRiders();

        } else {

            const filtered =
                riders.filter(
                    rider =>
                    rider.destination === filter
                );

            renderRiders(filtered);

        }

    });

});


// ========================================
// LOCATION → GOOGLE MAPS
// ========================================

document
.getElementById("locationSearchBtn")
.addEventListener("click", function() {

    const location =
        document
        .getElementById("locationInput")
        .value
        .trim();


    if (!location) {

        showToast(
            "Please enter a location"
        );

        return;
    }


    const url =
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(location);


    window.open(url, "_blank");

});


// ENTER KEY FOR LOCATION

document
.getElementById("locationInput")
.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        document
        .getElementById("locationSearchBtn")
        .click();

    }

});


// ========================================
// CURRENT TRIP → GOOGLE MAPS
// ========================================

document
.getElementById("mapBtn")
.addEventListener("click", function() {

    const from =
        document
        .getElementById("fromLocation")
        .innerText;

    const destination =
        document
        .getElementById("tripDestination")
        .innerText;


    const url =
        "https://www.google.com/maps/dir/?api=1" +
        "&origin=" +
        encodeURIComponent(from) +
        "&destination=" +
        encodeURIComponent(destination);


    window.open(url, "_blank");

});


// ========================================
// MODAL
// ========================================

const modal =
    document.getElementById("tripModal");


document
.getElementById("planRideBtn")
.addEventListener("click", openModal);


document
.getElementById("newTripFromTrips")
.addEventListener("click", openModal);


function openModal() {

    modal.style.display = "flex";

}


document
.getElementById("closeModal")
.addEventListener("click", closeModal);


function closeModal() {

    modal.style.display = "none";

}


window.addEventListener("click", function(event) {

    if (event.target === modal) {

        closeModal();

    }

});


// ========================================
// CREATE NEW RIDE
// ========================================

document
.getElementById("tripForm")
.addEventListener("submit", function(event) {

    event.preventDefault();


    const newRider = {

        name:
            document
            .getElementById("riderName")
            .value
            .trim(),

        phone:
            document
            .getElementById("phone")
            .value
            .trim(),

        from:
            document
            .getElementById("nativePlace")
            .value
            .trim(),

        bike:
            document
            .getElementById("bikeModel")
            .value
            .trim(),

        destination:
            document
            .getElementById("destination")
            .value
            .trim(),

        date:
            document
            .getElementById("travelDate")
            .value,

        budget:
            document
            .getElementById("budget")
            .value,

        riders:
            document
            .getElementById("numberRiders")
            .value

    };


    // ADD NEW RIDER

    riders.unshift(newRider);


    // UPDATE DASHBOARD

    renderRiders();


    // UPDATE ALL RIDERS

    renderRiders(
        riders,
        allRidersContainer
    );


    // UPDATE CURRENT TRIP

    document
    .getElementById("welcomeName")
    .innerText = newRider.name;


    document
    .getElementById("tripDestination")
    .innerText = newRider.destination;


    document
    .getElementById("fromLocation")
    .innerText = newRider.from;


    document
    .getElementById("tripBike")
    .innerText = newRider.bike;


    document
    .getElementById("tripBudget")
    .innerText =
        "₹" +
        Number(newRider.budget)
        .toLocaleString();


    document
    .getElementById("tripRiders")
    .innerText =
        newRider.riders +
        " Riders";


    document
    .getElementById("totalRiders")
    .innerText =
        riders.length;


    document
    .getElementById("totalTrips")
    .innerText =
        18 + 1;


    // CLOSE

    closeModal();


    this.reset();


    showToast(
        "New ride created successfully 🚀"
    );

});


// ========================================
// SIDEBAR NAVIGATION
// ========================================

const pages = {

    dashboard:
        document.getElementById("dashboardPage"),

    trips:
        document.getElementById("tripsPage"),

    riders:
        document.getElementById("ridersPage"),

    garage:
        document.getElementById("garagePage"),

    messages:
        document.getElementById("messagesPage"),

    settings:
        document.getElementById("settingsPage")

};


document
.querySelectorAll(".nav-item")
.forEach(button => {

    button.addEventListener("click", function() {

        document
        .querySelectorAll(".nav-item")
        .forEach(btn =>
            btn.classList.remove("active")
        );

        this.classList.add("active");


        Object.values(pages)
        .forEach(page =>
            page.classList.remove("active-page")
        );


        const selectedPage =
            pages[this.dataset.page];


        if (selectedPage) {

            selectedPage
            .classList.add("active-page");

        }


        if (this.dataset.page === "riders") {

            renderRiders(
                riders,
                allRidersContainer
            );

        }

    });

});


// ========================================
// VIEW ALL RIDERS
// ========================================

document
.getElementById("viewAllBtn")
.addEventListener("click", function() {

    document
    .querySelector('[data-page="riders"]')
    .click();

});


// ========================================
// SETTINGS
// ========================================

document
.getElementById("saveSettings")
.addEventListener("click", function() {

    const name =
        document
        .getElementById("settingsName")
        .value
        .trim();


    if (!name) {

        showToast(
            "Please enter your name"
        );

        return;

    }


    document
    .getElementById("welcomeName")
    .innerText = name;


    document
    .getElementById("sideUser")
    .innerText = name;


    showToast(
        "Profile updated successfully ✓"
    );

});


// ========================================
// NOTIFICATION
// ========================================

document
.getElementById("notificationBtn")
.addEventListener("click", function() {

    showToast(
        "You have 3 new notifications 🔔"
    );

});


// ========================================
// TOAST
// ========================================

function showToast(message) {

    const toast =
        document.getElementById("toast");


    toast.innerText = message;

    toast.style.display = "block";


    setTimeout(function() {

        toast.style.display = "none";

    }, 3000);

}