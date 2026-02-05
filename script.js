// ===== GET NAME FROM URL =====
const params = new URLSearchParams(window.location.search);
const name = params.get("name") || "Lakshya";

document.getElementById("nameText").innerText = `${name} wants you to be his valentine? 💕`;

// ===== VALENTINE'S DAY COUNTDOWN =====
function updateCountdown() {
    const valentinesDay = new Date('February 14, 2026 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = valentinesDay - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    } else {
        document.getElementById('days').textContent = '💕';
        document.getElementById('hours').textContent = 'Happy';
        document.getElementById('minutes').textContent = "V-Day";
        document.getElementById('seconds').textContent = '💕';
    }
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===== BACKGROUND MUSIC =====
let isPlaying = false;
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicToggle');

function toggleMusic() {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.textContent = '🎵';
        musicBtn.classList.remove('playing');
    } else {
        bgMusic.play();
        musicBtn.textContent = '🔊';
        musicBtn.classList.add('playing');
    }
    isPlaying = !isPlaying;
}

// ===== CONFETTI CELEBRATION =====
function launchConfetti() {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // Confetti from both sides
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#ff4d94', '#ff69b4', '#ff1493', '#ff6b6b', '#ffd700']
        }));
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#ff4d94', '#ff69b4', '#ff1493', '#ff6b6b', '#ffd700']
        }));
    }, 250);

    // Also burst hearts
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        shapes: ['circle'],
        colors: ['#ff4d94', '#ff69b4', '#e91e63']
    });
}

// ===== FLOATING PARTICLES =====
const particlesContainer = document.getElementById('particles');
const colors = ['#ff4d94', '#4dffa6', '#4d9fff', '#ffeb4d', '#b84dff', '#ff4d4d'];

for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.animationDelay = Math.random() * 18 + 's';
    particle.style.animationDuration = (15 + Math.random() * 8) + 's';
    particlesContainer.appendChild(particle);
}

// ===== HEART TRAIL ON MOUSE MOVE =====
const heartsContainer = document.getElementById('hearts-container');
let lastHeartTime = 0;

document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastHeartTime > 80) {
        const heart = document.createElement('div');
        heart.className = 'cursor-heart';
        heart.textContent = '💖';
        heart.style.left = e.pageX + 'px';
        heart.style.top = e.pageY + 'px';
        heartsContainer.appendChild(heart);

        setTimeout(() => heart.remove(), 1000);
        lastHeartTime = now;
    }
});

// ===== MOVE "NO" BUTTON ON HOVER =====
const noBtn = document.getElementById('noBtn');

noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

function moveNoButton() {
    const maxX = window.innerWidth - noBtn.offsetWidth - 50;
    const maxY = window.innerHeight - noBtn.offsetHeight - 100;

    const x = Math.max(20, Math.random() * maxX);
    const y = Math.max(20, Math.random() * maxY);

    noBtn.style.position = 'fixed';
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
    noBtn.style.zIndex = '1000';
}

// ===== YES BUTTON CLICK =====
document.getElementById('yesBtn').addEventListener('click', () => {
    // Launch confetti celebration!
    launchConfetti();

    // Hide countdown
    document.getElementById('countdownContainer').style.display = 'none';

    // Hide main container
    document.getElementById('mainContainer').style.display = 'none';

    // Show success container
    const successContainer = document.getElementById('successContainer');
    successContainer.style.display = 'block';

    // Update success message with name
    successContainer.querySelector('h1').innerText = `Yay! ${name} is so happy! ❤️🎉`;

    // Start playing music automatically
    if (!isPlaying) {
        toggleMusic();
    }

    // Send email notification
    sendEmailNotification(name);
});

// ===== SEND EMAIL NOTIFICATION =====
function sendEmailNotification(personName) {
    if (typeof emailjs !== 'undefined') {
        emailjs.init("YOUR_PUBLIC_KEY");
        emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
            to_email: "hiranandanilakshya9@gmail.com",
            person_name: personName,
            message: `${personName} said YES to be your Valentine! 💕🎉`,
            date: new Date().toLocaleString()
        }).then(
            function (response) { console.log("Email sent!", response); },
            function (error) { console.log("Email failed:", error); }
        );
    }
}

// ===== DISTANCE CALCULATOR (Using Browser Location) =====
const lakshyaLocation = { lat: 22.7196, lng: 75.8577 };

function calculateDistance() {
    const resultDiv = document.getElementById('distanceResult');
    const valueDiv = document.getElementById('distanceValue');
    const messageDiv = document.getElementById('distanceMessage');

    resultDiv.style.display = 'block';
    valueDiv.textContent = '⏳';
    messageDiv.textContent = 'Finding your location...';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                const distance = haversineDistance(lakshyaLocation.lat, lakshyaLocation.lng, userLat, userLng);
                displayDistanceResult(distance);
            },
            function (error) {
                valueDiv.textContent = '📍';
                messageDiv.textContent = 'Please allow location access and try again!';
            }
        );
    } else {
        valueDiv.textContent = '❌';
        messageDiv.textContent = 'Location not supported on this device';
    }
}

function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function displayDistanceResult(distance) {
    const resultDiv = document.getElementById('distanceResult');
    const valueDiv = document.getElementById('distanceValue');
    const messageDiv = document.getElementById('distanceMessage');

    resultDiv.style.display = 'block';

    if (distance < 5) {
        valueDiv.textContent = `${distance.toFixed(1)} km`;
        messageDiv.textContent = "OMG! You're so close! 😍 Let's definitely meet at the café! ☕💕";
    } else if (distance < 20) {
        valueDiv.textContent = `${distance.toFixed(1)} km`;
        messageDiv.textContent = "Not too far! 🚗 A short drive and we can meet! Can't wait! 💖";
    } else if (distance < 100) {
        valueDiv.textContent = `${distance.toFixed(0)} km`;
        messageDiv.textContent = "A bit of a journey, but love knows no distance! 🌹 Plan a trip? ✈️";
    } else {
        valueDiv.textContent = `${distance.toFixed(0)} km`;
        messageDiv.textContent = "Distance is just a number! 💕 Let's video call first? 📱❤️";
    }
}
