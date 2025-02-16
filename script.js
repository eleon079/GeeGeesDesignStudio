document.addEventListener("DOMContentLoaded", function () {
    // for debug (not important)
    console.log("Website loaded successfully!");
  
    // For booking page specifically
    if (document.querySelector(".booking-section")) {
        let firstAvailableDate = "2025-02-15"
  
        let calendar = flatpickr("#calendar", {
            enableTime: false,
            dateFormat: "F j, Y",
            minDate: "today",
            defaultDate: firstAvailableDate,
            disable: [
                function (date) {
                    // Make weekends unavailable
                    return date.getDay() === 0 || date.getDay() === 6;
          }
        ],
        onReady: function (selectedDates, dateStr, instance) {
            // open calendar on page loading
            instance.open();
        },
        onChange: function (selectedDates, dateStr, instance) {
            if (selectedDates.length > 0) {
                document.querySelector(".time-slots").style.display = "block";
                document.querySelector("#time-heading").style.display = "block";
                sessionStorage.setItem("selectedDate", dateStr);
          }
        },
        onClose: function (selectedDates, dateStr, instance) {
            // Reopen the calendar after it closes
            instance.open();
        }
      });
  
      // Handle user selecting a time
      document.querySelectorAll(".time-btn").forEach((button) => {
        button.addEventListener("click", function () {
            let selectedTime = this.getAttribute("data-time");
            sessionStorage.setItem("selectedTime", selectedTime);
            window.location.href = "form.html"; // Go to the form page
        });
      });
    }
  
    // For form page
    if (document.getElementById("consultation-form")) {
        // Show user’s chosen date & time
        document.getElementById("selected-date").innerText = sessionStorage.getItem("selectedDate") || "Not selected";
        document.getElementById("selected-time").innerText = sessionStorage.getItem("selectedTime") || "Not selected";
  
        // Handle form submission
        document
            .getElementById("consultation-form")
            .addEventListener("submit", function (event) {
                event.preventDefault();
                let selectedService = document.getElementById("service").value;
                sessionStorage.setItem("selectedService", selectedService);
                // Open confirmation page
                window.location.href = "confirmation.html";
            });
    }
  
    // show info of booking on confirmation page
    if (document.getElementById("selected-service")) {
        document.getElementById("selected-date").innerText = sessionStorage.getItem("selectedDate") || "Not selected";
        document.getElementById("selected-time").innerText = sessionStorage.getItem("selectedTime") || "Not selected";
        document.getElementById("selected-service").innerText = sessionStorage.getItem("selectedService") || "Not selected";
    }
  });
  