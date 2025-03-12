const canvas = document.getElementById("holiCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let splashes = [];

function throwColor(event, color) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    for (let i = 0; i < 20; i++) {
        splashes.push({
            x: x,
            y: y,
            radius: Math.random() * 20 + 10,
            color: color,
            speedX: (Math.random() - 0.5) * 6,
            speedY: (Math.random() - 0.5) * 6,
            opacity: 1
        });
    }
}

function updateSplashes() {
    for (let i = 0; i < splashes.length; i++) {
        let splash = splashes[i];
        splash.x += splash.speedX;
        splash.y += splash.speedY;
        splash.opacity -= 0.02;

        if (splash.opacity <= 0) {
            splashes.splice(i, 1);
            i--;
        }
    }
}

function drawSplashes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let splash of splashes) {
        ctx.beginPath();
        ctx.arc(splash.x, splash.y, splash.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${splash.color}, ${splash.opacity})`;
        ctx.fill();
    }
}

function animate() {
    updateSplashes();
    drawSplashes();
    requestAnimationFrame(animate);
}

function playMusic() {
    document.getElementById("bg-music").play();
}

animate();
