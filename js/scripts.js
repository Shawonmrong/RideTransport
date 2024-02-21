document.addEventListener('DOMContentLoaded', function () {
    const selectedSeats = [];
    const seatButtons = document.querySelectorAll('.btn.btn-outline');
    let seatsLeft = 40; // Initial number of seats

    const seatsLeftElement = document.getElementById('seatsLeft');

    seatButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const row = button.getAttribute('data-row');
            const seat = button.getAttribute('data-seat');

            toggleSeatSelection(row, seat);
            updateSelectedSeatsDisplay();
            toggleButtonStyle(button);
            updateSeatsLeft();
        });
    });

    function toggleSeatSelection(row, seat) {
        const selectedSeat = `${row}${seat}`;
        const seatIndex = selectedSeats.indexOf(selectedSeat);

        if (seatIndex === -1) {
            selectedSeats.push(selectedSeat);
        } else {
            selectedSeats.splice(seatIndex, 1);
        }
    }

    function updateSelectedSeatsDisplay() {
        const selectedSeatsElement = document.getElementById('selectedSeats');
        const tbody = selectedSeatsElement.querySelector('tbody');

        // Clear existing rows
        tbody.innerHTML = '';

        // Add a row for each selected seat
        selectedSeats.forEach(function (selectedSeat) {
            const row = selectedSeat.charAt(0);
            const seat = selectedSeat.substring(1);

            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${row}${seat}</td>
                <td>Economy</td>
                <td class="text-right">550</td>
            `;
            tbody.appendChild(newRow);
        });

        // Add total price row
        const totalPriceRow = document.createElement('tr');
        totalPriceRow.innerHTML = `
            <td>Total Price</td>
            <td></td>
            <td class="text-right">BDT ${selectedSeats.length * 550}</td>
        `;
        tbody.appendChild(totalPriceRow);
    }

    function toggleButtonStyle(button) {
        button.classList.toggle('selected');
    }

    function updateSeatsLeft() {
        seatsLeft = 40 - selectedSeats.length;
        seatsLeftElement.innerText = `${seatsLeft} seats left`;
    }
});

