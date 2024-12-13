// Form handling - only run if form exists
const appointmentForm = document.getElementById('appointmentForm');
if (appointmentForm) {
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        document.getElementById('successPopup').style.display = 'block';
    });
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        document.getElementById('successPopup').style.display = 'block';
    });
}

function closePopup() {
    document.getElementById('successPopup').style.display = 'none';
    document.getElementById('appointmentForm').reset();
    const inputs = document.querySelectorAll('#appointmentForm input, #appointmentForm select');
    inputs.forEach(input => {
        input.classList.remove('error');
        input.classList.remove('success');
    });
}

// Hamburger Menu Logic - runs on all pages
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (!hamburger || !navLinks) {
        console.error('Navigation elements not found');
        return;
    }

    const navLinksItems = document.querySelectorAll('.nav-links li');

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        navLinksItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    }

    // Use event delegation for better performance
    document.addEventListener('click', function(e) {
        // If clicking hamburger
        if (e.target.closest('.hamburger')) {
            e.stopPropagation();
            toggleMenu();
        }
        // If clicking outside when menu is active
        else if (navLinks.classList.contains('active') && 
                 !e.target.closest('.nav-links')) {
            toggleMenu();
        }
    });

    // Handle nav link clicks
    navLinks.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Add animation keyframes
if (!document.querySelector('#nav-animations')) {
    const style = document.createElement('style');
    style.id = 'nav-animations';
    style.textContent = `
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Gallery Filter
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}); 