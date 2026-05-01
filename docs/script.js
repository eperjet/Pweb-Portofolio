document.addEventListener('DOMContentLoaded', () => {
    // === SCROLL REVEAL ANIMATION ===
    const reveals = document.querySelectorAll('.reveal');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }

    // Initial check and event listener
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // === FORM SUBMISSION ===
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get button to show loading state
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            const textSpan = btn.querySelector('.btn-text');
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            textSpan.innerHTML = '<i class="fa-solid fa-crystal-ball fa-spin"></i> Casting...';
            btn.disabled = true;
            
            try {
                // Send real API call to backend
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, subject, message }),
                });

                if (response.ok) {
                    textSpan.innerHTML = '<i class="fa-solid fa-check"></i> Spell Cast!';
                    btn.style.background = 'linear-gradient(to bottom, #1c4e40, #0a2e22)'; // Success emerald
                    contactForm.reset();
                } else {
                    throw new Error('Spell Fizzled');
                }
            } catch (error) {
                console.error('Error:', error);
                textSpan.innerHTML = '<i class="fa-solid fa-xmark"></i> Spell Failed';
                btn.style.background = 'linear-gradient(to bottom, #8a1c1c, #4a0909)'; // Error red
            } finally {
                // Reset button after 3 seconds
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }
        });
    }
});
