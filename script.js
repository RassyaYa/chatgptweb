document.getElementById('game-select').addEventListener('change', function() {
    const selectedGame = this.value;
    const zoneGroup = document.getElementById('zone-group');

    // Show zone ID input for Mobile Legends
    if (selectedGame === 'mlbb') {
        zoneGroup.style.display = 'block';
    } else {
        zoneGroup.style.display = 'none';
    }
});

document.getElementById('topup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const game = document.getElementById('game-select').value;
    const userId = document.getElementById('user-id').value;
    const zoneId = document.getElementById('zone-id').value;
    const amount = document.getElementById('amount').value;

    if (game && userId && amount) {
        let message = `Success! ${amount} credits added to user ${userId}`;
        if (game === 'mlbb' && zoneId) {
            message += ` in zone ${zoneId}`;
        }
        message += ` for ${game}.`;

        document.getElementById('response-message').innerText = message;
    } else {
        document.getElementById('response-message').innerText = `Please fill out all fields.`;
    }
});
