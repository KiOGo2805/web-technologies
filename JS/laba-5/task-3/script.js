function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    
    document.getElementById('digitalClock').innerHTML = 
        `${h}<span class="blink">:</span>${m}<span class="blink">:</span>${s}`;
}
updateClock();
setInterval(updateClock, 1000);


const countdownInput = document.getElementById('countdownInput');
const countdownResult = document.getElementById('countdownResult');

function updateCountdown() {
    if (!countdownInput.value) return;

    const targetDate = new Date(countdownInput.value);
    const now = new Date();
    const diffMs = targetDate - now;

    if (diffMs <= 0) {
        countdownResult.textContent = "Час вийшов!";
        countdownResult.style.color = "red";
        return;
    }

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diffMs % (1000 * 60)) / 1000);

    countdownResult.textContent = `Залишилось: ${days}д ${hours}г ${mins}хв ${secs}с`;
    countdownResult.style.color = "#27ae60";
}
setInterval(updateCountdown, 1000);


const birthdayInput = document.getElementById('birthdayInput');
const birthdayResult = document.getElementById('birthdayResult');

function updateBirthdayCountdown() {
    if (!birthdayInput.value) return;

    const now = new Date();
    const bday = new Date(birthdayInput.value);
    
    let nextBday = new Date(now.getFullYear(), bday.getMonth(), bday.getDate());
    
    if (nextBday < now) {
        nextBday.setFullYear(now.getFullYear() + 1);
    }

    let months = nextBday.getMonth() - now.getMonth();
    let days = nextBday.getDate() - now.getDate();
    let hours = nextBday.getHours() - now.getHours();
    let minutes = nextBday.getMinutes() - now.getMinutes();
    let seconds = nextBday.getSeconds() - now.getSeconds();

    if (seconds < 0) { seconds += 60; minutes--; }
    if (minutes < 0) { minutes += 60; hours--; }
    if (hours < 0) { hours += 24; days--; }
    if (days < 0) {
        const prevMonth = new Date(nextBday.getFullYear(), nextBday.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
    }
    if (months < 0) { months += 12; }

    birthdayResult.textContent = `${months} міс, ${days} дн, ${hours} год, ${minutes} хв, ${seconds} сек`;
}
setInterval(updateBirthdayCountdown, 1000);