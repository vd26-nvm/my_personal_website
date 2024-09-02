document.addEventListener('DOMContentLoaded', () => {
    // Add scroll event listener for navbar and progress bar
    const header = document.querySelector('header');
    const scrollProgress = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollPosition / windowHeight) * 100;

        scrollProgress.style.width = `${scrollPercentage}%`;

        if (scrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animate sections on scroll
    const animateSections = () => {
        const sections = document.querySelectorAll('#about, #activities, #courses, #drawings');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateSections);
    animateSections(); // Initial check on page load

    // Course navigation
    const courseButtons = document.querySelectorAll('.course-nav-button');
    const courseYears = document.querySelectorAll('.course-year');

    courseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const year = button.getAttribute('data-year');
            courseYears.forEach(courseYear => {
                if (courseYear.getAttribute('data-year') === year) {
                    courseYear.classList.add('active');
                } else {
                    courseYear.classList.remove('active');
                }
            });
        });
    });

    // Show the first year by default
    document.querySelector('.course-nav-button[data-year="freshman"]').click();
});
