document.addEventListener('DOMContentLoaded', () => {
    initParticles();
});
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.contact-form');
    const submitButton = form.querySelector('.submit-button');

    form.addEventListener('submit', function (e) {
        e.preventDefault(); 

        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';

        const formData = new FormData(form);

        formData.set('sms-consent', formData.get('sms-consent') ? 'Yes' : 'No');

        fetch(form.action, {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            if (result === 'Success') {
                alert('Thank you! Your message has been sent successfully.');
                form.reset(); 
            } else {
                alert('Error: ' + result);
            }
        })
        .catch(error => {
            alert('Error: Something went wrong. Please try again later.');
            console.error('Error:', error);
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
        });
    });
});