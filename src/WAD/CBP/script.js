/* ================= EVENT SERVICES DATA ================= */
const eventServices = {
    "Birthday": ["Light Makeup", "Party Makeup", "Hair Styling", "Hair Curls", "Nail Art", "Kids Styling"],
    "Marriage": ["Bridal Makeup", "HD Makeup", "Airbrush Makeup", "Hair Styling", "Hair Bun", "Saree Draping", "Jewellery Setting", "Mehendi", "Nail Art", "Bridal Package"],
    "Reception": ["Party Makeup", "HD Makeup", "Airbrush Makeup", "Hair Styling", "Hair Bun", "Saree Draping", "Jewellery Setting"],
    "Engagement": ["Engagement Makeup", "HD Makeup", "Hair Styling", "Hair Curls", "Saree Draping", "Jewellery Setting", "Nail Art"],
    "Mehendi": ["Mehendi Design", "Bridal Mehendi", "Guest Mehendi", "Light Makeup", "Hair Styling", "Floral Jewellery Styling"],
    "Sangeet": ["Party Makeup", "HD Makeup", "Hair Styling", "Hair Waves", "Saree Draping", "Lehenga Draping", "Jewellery Setting", "Nail Art"],
    "Half Saree Ceremony": ["Traditional Makeup", "HD Makeup", "Hair Styling", "Hair Braid Styling", "Half Saree Draping", "Jewellery Setting", "Floral Styling"],
    "Cradle Ceremony": ["Light Makeup", "Simple Makeup", "Hair Styling", "Saree Draping", "Jewellery Setting"]
};
 

/* ================= TAB SWITCH (LOGIN PAGE) ================= */
function switchTab(type) {
    const tabs = document.querySelectorAll(".tab");
    const title = document.getElementById("mainTitle");
    const subtitle = document.querySelector(".subtitle");
    const listItems = document.querySelectorAll(".left li");

    tabs.forEach(tab => tab.classList.remove("active"));

    if (type === "user") {
        tabs[0].classList.add("active");
        localStorage.setItem("role", "user");

        if (title) title.innerText = "Find Your Perfect Artist";
        if (subtitle) subtitle.innerText = "Connect with top beauty professionals for your special occasions.";

        if (listItems.length >= 3) {
            listItems[0].innerText = "✔ Verified professional artists";
            listItems[1].innerText = "✔ Transparent pricing";
            listItems[2].innerText = "✔ Doorstep service";
        }
    } else {
        tabs[1].classList.add("active");
        localStorage.setItem("role", "artist");

        if (title) title.innerText = "Grow Your Beauty Business";
        if (subtitle) subtitle.innerText = "Join thousands of professionals and grow your business.";

        if (listItems.length >= 3) {
            listItems[0].innerText = "✔ More clients";
            listItems[1].innerText = "✔ Easy management";
            listItems[2].innerText = "✔ Secure payments";
        }
    }
}

/* ================= LOGIN ================= */
function loginUser() {
    const usernameField = document.getElementById("loginUsername");
    const emailField = document.getElementById("loginEmail");
    const passwordField = document.getElementById("loginPassword");
    const rememberField = document.getElementById("rememberMe");

    const username = usernameField ? usernameField.value.trim() : "";
    const email = emailField ? emailField.value.trim() : "";
    const password = passwordField ? passwordField.value.trim() : "";
    const remember = rememberField ? rememberField.checked : false;

    // ✅ STEP 1: Empty check
    if (email === "" || password === "") {
        alert("Please enter email and password");
        return false;
    }

    // ✅ STEP 2: Check if email exists
    const savedEmail = localStorage.getItem("email");

    if (email !== savedEmail) {
        alert("Email not registered!");
        return false;
    }

    // ✅ STEP 3: Remember email
    if (remember) {
        localStorage.setItem("rememberEmail", email);
    } else {
        localStorage.removeItem("rememberEmail");
    }

    // ✅ STEP 4: Save username
    localStorage.setItem("username", username || email);

    // ✅ STEP 5: Success
    alert("Login successful!");

    const role = localStorage.getItem("role");
    if (role === "artist") {
        window.location.href = "artist_dashboard.html";
    } else {
        window.location.href = "events.html";
    }

    return false;
}
/* ================= LOGOUT ================= */
function logoutUser() {
    localStorage.clear();
    alert("Logged out successfully");
    window.location.href = "login.html";
}

/* ================= REGISTER SWITCH ================= */
function switchRegister(type) {
    const userForm = document.getElementById("userForm");
    const artistForm = document.getElementById("artistForm");
    const tabs = document.querySelectorAll(".tab");

    tabs.forEach(tab => tab.classList.remove("active"));

    if (type === "user") {
        if (userForm) userForm.style.display = "block";
        if (artistForm) artistForm.style.display = "none";
        if (tabs[0]) tabs[0].classList.add("active");
        localStorage.setItem("role", "user");
    } else {
        if (userForm) userForm.style.display = "none";
        if (artistForm) artistForm.style.display = "block";
        if (tabs[1]) tabs[1].classList.add("active");
        localStorage.setItem("role", "artist");
    }
}

/* ================= USER REGISTER ================= */
function validateUser() {
    const name = document.getElementById("u_name").value.trim();
    const email = document.getElementById("u_email").value.trim(); // ✅ ADD THIS
    const phone = document.getElementById("u_phone").value.trim();

    if (name === "") {
        alert("Enter name");
        return false;
    }

    if (email === "") {
        alert("Enter email");
        return false;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Enter valid phone number");
        return false;
    }

    // ✅ SAVE EMAIL
    localStorage.setItem("username", name);
    localStorage.setItem("email", email); // ⭐ VERY IMPORTANT
    localStorage.setItem("role", "user");

    alert("User Registered!");
    window.location.href = "login.html";
    return false;
}

/* ================= ARTIST REGISTER ================= */
function validateArtist() {
    const name = document.getElementById("a_name").value.trim();
    const email = document.getElementById("a_email").value.trim(); // ✅ ADD THIS
    const phone = document.getElementById("a_phone").value.trim();
    const exp = document.getElementById("exp").value;

    if (name === "") {
        alert("Enter name");
        return false;
    }

    if (email === "") {
        alert("Enter email");
        return false;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Enter valid phone");
        return false;
    }

    if (exp <= 0) {
        alert("Enter valid experience");
        return false;
    }

    // ✅ SAVE EMAIL
    localStorage.setItem("username", name);
    localStorage.setItem("email", email); // ⭐ VERY IMPORTANT
    localStorage.setItem("role", "artist");

    alert("Artist Registered!");
    window.location.href = "login.html";
    return false;
}

/* ================= SERVICES PAGE ================= */
let personCount = 0;

function addPerson() {
    personCount++;

    const container = document.getElementById("peopleContainer");
    const selectedEvent = localStorage.getItem("selectedEvent");
    const services = eventServices[selectedEvent] || ["Makeup"];

    let servicesHTML = "";
    services.forEach(service => {
        servicesHTML += `
            <label class="service-item">
                <input type="checkbox"> ${service}
            </label>
        `;
    });

    const div = document.createElement("div");
    div.className = "service-box";
    div.innerHTML = `
        <div class="service-header">
            <span>👤 Person ${personCount}</span>
            <span style="cursor:pointer;color:red"
                  onclick="this.closest('.service-box').remove()">🗑</span>
        </div>
        <div class="services-grid">
            ${servicesHTML}
        </div>
    `;

    container.appendChild(div);
}

/* ================= SCHEDULE PAGE ================= */
function goToArtists() {
    const date = document.getElementById("eventDate").value;
    const time = document.getElementById("startTime").value;
    const city = document.getElementById("city").value;

    if (!date || !city || !time) {
        alert("Fill all details");
        return;
    }

    localStorage.setItem("city", city);
    localStorage.setItem("eventDate", date);
    localStorage.setItem("startTime", time);

    window.location.href = "artists.html";
}
/* ================= CART ================= */
function goToCart() {
    window.location.href = "cart.html";
}

function addToCart(artist, service, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ artist, service, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
}

function removeFromCart(i) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
     displayCart();
}
function removeCheckoutItem(artist, serviceName, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.filter(item =>
        !(item.artist === artist &&
          item.service === serviceName &&
          item.price === price)
    );

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload(); // simple refresh
}

/* ================= INDEX / HOME PAGE ================= */
function goToLogin() {
    window.location.href = "login.html";
}

function bookArtist() {
    localStorage.setItem("role", "user");
    window.location.href = "login.html";
}

function joinAsArtist() {
    localStorage.setItem("role", "artist");
    window.location.href = "login.html";
}

/* ================= FORGOT PASSWORD / OTP ================= */
function sendOTP() {
    const email = document.getElementById("forgotEmail").value.trim();

    if (!email) {
        alert("Please enter your email");
        return false;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem("resetEmail", email);
    localStorage.setItem("otp", otp);

    alert("Your OTP is: " + otp);
    window.location.href = "verify.html";
    return false;
}

function verifyOTP() {
    const enteredOTP = document.getElementById("otpInput").value.trim();
    const savedOTP = localStorage.getItem("otp");

    if (!enteredOTP) {
        alert("Please enter OTP");
        return false;
    }

    if (enteredOTP === savedOTP) {
        alert("OTP verified successfully");
        window.location.href = "reset.html";
    } else {
        alert("Invalid OTP");
    }

    return false;
}

function resetPassword() {
    const newPass = document.getElementById("newPassword").value.trim();
    const confirmPass = document.getElementById("confirmPassword").value.trim();

    if (!newPass || !confirmPass) {
        alert("Please fill all fields");
        return false;
    }

    if (newPass !== confirmPass) {
        alert("Passwords do not match");
        return false;
    }

    localStorage.setItem("userPassword", newPass);
    localStorage.removeItem("otp");
    alert("Password reset successful");
    window.location.href = "login.html";
    return false;
}

/* ================= USER DASHBOARD NAVIGATION ================= */
function goToUserDashboard() {
    window.location.href = "user_dashboard.html";
}

function goToBookings() {
    window.location.href = "mybookings.html";
}

function goToPastBookings() {
    window.location.href = "past_bookings.html";
}

function goToFavorites() {
    window.location.href = "favorites.html";
}

function goToReviews() {
    window.location.href = "reviews.html";
}

function goToNotifications() {
    window.location.href = "notifications.html";
}

function goToProfile() {
    window.location.href = "profile.html";
}

/* ================= ARTIST DASHBOARD NAVIGATION ================= */
function goToArtistDashboard() {
    window.location.href = "artist_dashboard.html";
}

function goToArtistRequests() {
    window.location.href = "artist_requests.html";
}

function goToArtistConfirmed() {
    window.location.href = "artist_confirmed.html";
}

function goToArtistAvailability() {
    window.location.href = "artist_availability.html";
}

function goToArtistServices() {
    window.location.href = "artist_services.html";
}

function goToArtistReviews() {
    window.location.href = "artist_reviews.html";
}

function goToArtistEarnings() {
    window.location.href = "artist_earnings.html";
}

function goToArtistProfile() {
    window.location.href = "artist_profile.html";
}

/* ================= SCROLL - FLOAT BOX + STICKY NAVBAR ================= */
window.addEventListener("scroll", function () {
    const box = document.getElementById("floatBox");
    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 200) {
        if (box) box.style.display = "block";
        if (navbar) navbar.classList.add("sticky");
    } else {
        if (box) box.style.display = "none";
        if (navbar) navbar.classList.remove("sticky");
    }
});
    function displayCart() {
    const cartContainer = document.getElementById("cartContainer");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = "<h2>Your cart is empty</h2>";
        return;
    }

    let total = 0;
    let html = "";

    cart.forEach((item, i) => {
        total += item.price;

        html += `
            <div class="service-box">
                <h3>${item.artist}</h3>
                <p>${item.service}</p>
                <strong>₹${item.price}</strong>
                <button class="remove-btn" onclick="removeFromCart(${i})">❌</button>
            </div>
        `;
    });

    html += `<h3>Total: ₹${total}</h3>`;

    cartContainer.innerHTML = html;
}
/* ================= DOMContentLoaded - ALL PAGE INITS ================= */
document.addEventListener("DOMContentLoaded", async() => {

    // Set default role if not set
    if (!localStorage.getItem("role")) {
        localStorage.setItem("role", "user");
    }

    // ── LOGIN PAGE: auto-fill remembered email ──
    const savedEmail = localStorage.getItem("rememberEmail");
    const emailInput = document.getElementById("loginEmail");
    const rememberInput = document.getElementById("rememberMe");

    if (savedEmail && emailInput) {
        emailInput.value = savedEmail;
        if (rememberInput) rememberInput.checked = true;
    }

    // ── LOGIN PAGE: activate correct tab ──
    const role = localStorage.getItem("role");
    const tabs = document.querySelectorAll(".tab");
    if (tabs.length >= 2) {
        if (role === "artist") {
            switchTab("artist");
        } else {
            switchTab("user");
        }
    }

    // ── EVENTS PAGE: card click → save event → go to services ──
    const cards = document.querySelectorAll(".event-card");
    if (cards.length > 0) {
        cards.forEach(card => {
            card.addEventListener("click", () => {
                const eventName = card.getAttribute("data-event");
                localStorage.setItem("selectedEvent", eventName);
                window.location.href = "services.html";
            });
        });
    }

    // ── SERVICES PAGE: show selected event name ──
    const selectedEvent = localStorage.getItem("selectedEvent");
    const eventTitle = document.getElementById("eventTitle");
    if (selectedEvent && eventTitle) {
        eventTitle.innerText = selectedEvent;
    }

    // ── SERVICES PAGE: continue button validation ──
    const continueBtn = document.getElementById("continueBtn");
    if (continueBtn) {
    continueBtn.addEventListener("click", () => {
    const persons = document.querySelectorAll(".service-box");

    if (persons.length === 0) {
        alert("Add at least one person");
        return;
    }

    let selectedServices = [];

    persons.forEach(person => {
        const checked = person.querySelectorAll("input:checked");
        checked.forEach(c => {
            const service = c.parentElement.innerText.trim();
            selectedServices.push(service);
        });
    });

    if (selectedServices.length === 0) {
        alert("Select at least one service");
        return;
    }

    // ✅ SAVE SERVICES
    localStorage.setItem("services", JSON.stringify(selectedServices));

    window.location.href = "schedule.html";
});
    }

    // ── SCHEDULE PAGE: populate time dropdowns ──
    const start = document.getElementById("startTime");
    const end = document.getElementById("endTime");

    if (start && end) {
        for (let h = 0; h < 24; h++) {
            for (let m = 0; m < 60; m += 30) {
                const time = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
                start.innerHTML += `<option>${time}</option>`;
                end.innerHTML += `<option>${time}</option>`;
            }
        }
    }

    // ── CART PAGE: render cart items ──
    const cartContainer = document.getElementById("cartContainer");

if (cartContainer) {
    displayCart(); // ✅ call function
}
    /* ================= FETCH ARTISTS FROM BACKEND ================= */
    /* ================= FETCH & FILTER ARTISTS ================= */

const artistContainer = document.querySelector(".artists-container");

if (artistContainer) {

    const city = localStorage.getItem("city") || "Hyderabad";
    const selectedServices = JSON.parse(localStorage.getItem("services")) || [];

    console.log("Selected Services:", selectedServices);

    try {
        const res = await fetch("artists.json");
        const data = await res.json();

        artistContainer.innerHTML = "";

        if (!data || data.length === 0) {
            artistContainer.innerHTML = "<h3>No artists found</h3>";
            return;
        }

        // ✅ FILTER LOGIC
        const filteredArtists = data.filter(artist =>
            artist.servicesOffered.some(service =>
                selectedServices.some(s => 
                    s.toLowerCase() === service.toLowerCase()
                )
            )
        );

        if (filteredArtists.length === 0) {
            artistContainer.innerHTML = "<h3>No matching artists found</h3>";
            return;
        }

        // ✅ DISPLAY
        const limitedArtists = filteredArtists.slice(0, 6);
        limitedArtists.forEach(artist => {

            let servicesHTML = "";

            artist.servicesOffered.forEach(service => {
                const price = artist.servicePrices[service];
                const isSelected = selectedServices.some(s => 
                    s.toLowerCase() === service.toLowerCase()
                );

                servicesHTML += `
                    <div class="service-item">
                        <span>${service}</span>
                        <span>₹${price}</span>
                       <button 
                                 class="${isSelected ? 'btn-add' : 'btn-disabled'}"
                                 ${!isSelected ? "disabled" : ""}
                                 onclick="addToCart('${artist.name}', '${service}', ${price})">
                                  Add
                        </button>
                    </div>
                `;
            });

            artistContainer.innerHTML += `
                <div class="artist-card">
                    <h3>${artist.name}</h3>
                    <p>📍 ${artist.area}, ${artist.city}</p>
                    <p>⭐ ${artist.rating}</p>
                    <p>💼 ${artist.experience} years</p>

                    <div class="services-list">
                        ${servicesHTML}
                    </div>
                    <button class="go-cart-btn" onclick="goToCart()">
                     Go to Cart →
                    </button>
                </div>
            `;
        });

    } catch (err) {
        console.log("Error:", err);
    }
}
});
document.querySelectorAll(".event-card").forEach(card => {
    card.addEventListener("click", () => {
        card.style.boxShadow = "0 0 30px #ff4d6d";
    });
});
const confettiContainer = document.querySelector(".confetti");

const emojis = ["🎉", "🎊", "✨", "💖", "🎈","😎","🤩"];

for (let i = 0; i < 100; i++) {
    let span = document.createElement("span");
    span.innerText = emojis[Math.floor(Math.random() * emojis.length)];

    span.style.left = Math.random() * 100 + "vw";
    span.style.animationDuration = (3 + Math.random() * 5) + "s";
    span.style.fontSize = (15 + Math.random() * 20) + "px";

    confettiContainer.appendChild(span);
    
}