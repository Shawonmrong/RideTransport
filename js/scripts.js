
document.addEventListener('DOMContentLoaded', function () {
    const selectedSeats = [];
    const seatButtons = document.querySelectorAll('.btn');
    let seatsLeft = 40;
    const seatPrice = 550;
    let discountPercentage = 0;

    const seatsLeftElement = document.getElementById('seatsLeft');
    const seatsAddElement = document.getElementById('seatsAdd');
    const grandTotalElement = document.getElementById('grandTotal');
    const applyCouponForm = document.getElementById('applyCouponForm');
    const couponCodeInput = document.getElementById('couponCode');
    const nextBtn = document.getElementById('nextBtn');
    const modalCheckbox = document.getElementById('modalCheckbox');

    seatButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const row = button.getAttribute('data-row');
            const seat = button.getAttribute('data-seat');

            const seatIndex = selectedSeats.indexOf(`${row}${seat}`);
            if (seatIndex !== -1) {
                selectedSeats.splice(seatIndex, 1);
            } else {
                if (selectedSeats.length < 4) {
                    selectedSeats.push(`${row}${seat}`);
                } else {
                    alert('You can select up to 4 seats.');
                    return;
                }
            }

            updateSelectedSeatsDisplay();
            toggleButtonStyle(button);
            updateSeatsLeft();
            updateSeatsAdd();
            updateGrandTotal(selectedSeats, seatPrice, discountPercentage);
            checkFormCompletion();
        });
    });

    applyCouponForm.addEventListener('submit', function (event) {
        event.preventDefault();
        applyCoupon();
    });

    nextBtn.addEventListener('click', function () {
        if (!nextBtn.disabled) {
            showModal();
        }
    });

    function checkFormCompletion() {
        const passengerName = document.getElementById('passengerName').value;
        const phoneNumber = document.getElementById('floating_phone').value;

        if (passengerName && phoneNumber) {
            nextBtn.disabled = false;
            nextBtn.style.backgroundColor = '#1DD100';
        } else {
            nextBtn.disabled = true;
            nextBtn.style.backgroundColor = '#B3B3B3';
        }
    }

    document.getElementById('passengerName').addEventListener('input', checkFormCompletion);
    document.getElementById('floating_phone').addEventListener('input', checkFormCompletion);

    function showModal() {
        const passengerName = document.getElementById('passengerName').value;
        const phoneNumber = document.getElementById('floating_phone').value;

        if (passengerName && phoneNumber) {
            // Display the modal
            const modal = document.getElementById('modalDiv');
            
        } else {
            console.log('Please fill in the passenger name and phone number.');
        }
    }

    function applyCoupon() {
        const couponCode = couponCodeInput.value.toUpperCase();

        switch (couponCode) {
            case 'NEW15':
                discountPercentage = 15;
                break;
            case 'COUPLE20':
                discountPercentage = 20;
                break;
            default:
                alert('Invalid coupon code');
                return;
        }

        updateGrandTotal(selectedSeats, seatPrice, discountPercentage);
        applyCouponForm.remove();
    }

    function updateSelectedSeatsDisplay() {
        const selectedSeatsElement = document.getElementById('selectedSeats');
        const tbody = selectedSeatsElement.querySelector('tbody');

        tbody.innerHTML = '';

        let totalPrice = 0;

        selectedSeats.forEach(function (selectedSeat) {
            const row = selectedSeat.charAt(0);
            const seat = selectedSeat.substring(1);

            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${row}${seat}</td>
                <td>Economy</td>
                <td class="text-right">${seatPrice}</td>
            `;
            tbody.appendChild(newRow);

            totalPrice += seatPrice;
        });

        const totalPriceRow = document.createElement('tr');
        totalPriceRow.innerHTML = `
            <td>Total Price</td>
            <td></td>
            <td class="text-right">BDT ${totalPrice}</td>
        `;
        tbody.appendChild(totalPriceRow);
    }

    function toggleButtonStyle(button) {
        const isSelected = button.classList.toggle('selected');

        if (isSelected) {
            button.style.backgroundColor = 'green';
        } else {
            button.style.backgroundColor = '';
        }
    }

    function updateSeatsLeft() {
        seatsLeft = 40 - selectedSeats.length;
        seatsLeftElement.innerText = `${seatsLeft} seats left`;
    }

    function updateSeatsAdd() {
        seatsAdd = selectedSeats.length;
        seatsAddElement.innerText = `${seatsAdd}`;
    }

    function updateGrandTotal(selectedSeats, seatPrice, discountPercentage) {
        const totalPrice = selectedSeats.length * seatPrice;
        const discountedTotal = totalPrice - (totalPrice * (discountPercentage / 100));
        grandTotalElement.innerText = `BDT ${discountedTotal.toFixed(2)}`;
    }
});