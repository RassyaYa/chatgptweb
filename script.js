document.getElementById('topup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const game = document.getElementById('game-select').value;
    const userId = document.getElementById('user-id').value;
    const amount = document.getElementById('amount').value;

    if (game && userId && amount) {
        // Here, you would typically send the data to the server using AJAX or fetch.
        // For now, we'll just simulate a successful response.
        document.getElementById('response-message').innerText = `Success! ${amount} coins added to user ${userId} in ${game}.`;
    } else {
        document.getElementById('response-message').innerText = `Please fill out all fields.`;
    }
});
