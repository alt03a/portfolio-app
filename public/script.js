// Theme Toggle Logic
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeBtn.querySelector('i');

themeBtn.addEventListener('click', () => {
    if (body.dataset.theme === 'light') {
        body.dataset.theme = 'dark';
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        body.dataset.theme = 'light';
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// Backend Contact Form Submission
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    formStatus.style.color = "var(--text-color)";
    formStatus.textContent = "Sending message...";

    try {
        // Now using a relative path! Works locally and on Railway.
        const response = await fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        });

        if (response.ok) {
            formStatus.style.color = "green";
            formStatus.textContent = "Message sent successfully!";
            contactForm.reset();
        } else {
            throw new Error('Server error');
        }
    } catch (error) {
        formStatus.style.color = "red";
        formStatus.textContent = "Failed to send message. Please try again later.";
        console.error(error);
    }
});