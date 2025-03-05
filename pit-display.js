// pit-display.js
document.addEventListener('DOMContentLoaded', () => {
    // Car Statistics Simulation
    function updateCarStats() {
        const speed = Math.floor(Math.random() * (320 - 280) + 280);
        const rpm = Math.floor(Math.random() * (12000 - 10000) + 10000);
        const tireTemp = Math.floor(Math.random() * (100 - 80) + 80);

        document.getElementById('speedStat').textContent = speed;
        document.getElementById('rpmStat').textContent = rpm;
        document.getElementById('tireTempStat').textContent = tireTemp;
    }

    setInterval(updateCarStats, 1000);

    // Pit Stop Simulation
    const startPitButton = document.getElementById('startPitStop');
    const pitTimer = document.getElementById('pitTimer');
    const wheels = document.querySelectorAll('.wheel');
    let pitStopInProgress = false;
    let timerInterval;

    startPitButton.addEventListener('click', () => {
        if (pitStopInProgress) return;
        
        pitStopInProgress = true;
        startPitButton.disabled = true;
        let time = 0;
        
        // Reset wheels
        wheels.forEach(wheel => {
            wheel.classList.remove('changed');
        });

        // Start timer
        timerInterval = setInterval(() => {
            time += 0.01;
            pitTimer.textContent = time.toFixed(2) + 's';

            // Simulate wheel changes
            if (time >= 0.5 && time < 1.0) wheels[0].classList.add('changed');
            if (time >= 1.0 && time < 1.5) wheels[1].classList.add('changed');
            if (time >= 1.5 && time < 2.0) wheels[2].classList.add('changed');
            if (time >= 2.0 && time < 2.5) wheels[3].classList.add('changed');

            if (time >= 2.5) {
                clearInterval(timerInterval);
                pitStopInProgress = false;
                startPitButton.disabled = false;
            }
        }, 10);
    });

    // Live Timing Simulation
    const drivers = [
        { name: 'M. Thompson', team: 'Kinetica F1' },
        { name: 'S. Chen', team: 'Kinetica F1' },
        { name: 'L. Hamilton', team: 'Mercedes' },
        { name: 'M. Verstappen', team: 'Red Bull' },
        { name: 'C. Leclerc', team: 'Ferrari' }
    ];

    function updateTiming() {
        const timingRows = document.getElementById('timingRows');
        let baseTime = Math.random() * 2 + 80; // Base lap time between 80-82 seconds
        
        const times = drivers.map((driver, index) => {
            const gap = index === 0 ? 0 : Math.random() * 0.5;
            return {
                ...driver,
                time: baseTime + gap,
                gap: gap
            };
        }).sort((a, b) => a.time - b.time);

        timingRows.innerHTML = times.map((driver, index) => `
            <div class="timing-row ${driver.team === 'Kinetica F1' ? 'team-driver' : ''}">
                <span>${index + 1}</span>
                <span>${driver.name}</span>
                <span>${driver.time.toFixed(3)}</span>
                <span>${index === 0 ? 'Leader' : '+' + driver.gap.toFixed(3)}</span>
            </div>
        `).join('');
    }

    setInterval(updateTiming, 2000);
});