document.addEventListener('DOMContentLoaded', () => {
    // Time updating logic
    const timeDisplay = document.getElementById('currentTime');

    function updateTime() {
        if (!timeDisplay) return;
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
        timeDisplay.innerText = timeString;
    }

    updateTime();
    setInterval(updateTime, 1000);

    const btn = document.getElementById('sayHelloBtn');

    // Smooth interaction for the button
    btn.addEventListener('click', () => {
        const originalText = btn.innerText;

        // Success state
        btn.innerText = "Nice to meet you!";
        btn.style.background = "linear-gradient(135deg, #10b981, #3b82f6)";
        btn.style.boxShadow = "0 20px 35px -10px rgba(16, 185, 129, 0.5)";

        // Pop animation
        btn.style.transform = "scale(1.05)";
        setTimeout(() => {
            btn.style.transform = "scale(1)";
        }, 150);

        // Revert back after a bit
        setTimeout(() => {
            // Fade out transition hack
            btn.style.opacity = '0';
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = "";
                btn.style.boxShadow = "";
                btn.style.opacity = '1';
            }, 200);
        }, 3000);
    });

    // Elegant 3D Parallax effect on mouse move
    const container = document.querySelector('.glass-container');

    // Only apply hover effects on screens that use a mouse
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            // Calculate mouse position relative to center of screen
            // Reduced the divisor for a more subtle, premium feel
            const xAxis = (window.innerWidth / 2 - e.pageX) / 80;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 80;

            // Apply a clamp to prevent extreme angles
            const clampedX = Math.max(-10, Math.min(10, xAxis));
            const clampedY = Math.max(-10, Math.min(10, -yAxis)); // Invert Y for natural feel

            if (container) {
                container.style.transform = `rotateY(${clampedX}deg) rotateX(${clampedY}deg)`;
            }
        });

        // Reset transform when mouse leaves the window
        document.addEventListener('mouseleave', () => {
            if (container) {
                container.style.transform = 'rotateY(0deg) rotateX(0deg)';
                container.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }
        });

        // Remove the transition when moving so it feels responsive
        document.addEventListener('mouseenter', () => {
            if (container) {
                container.style.transition = 'transform 0.1s ease-out';
            }
        });
    }
});
