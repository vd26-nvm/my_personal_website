document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Add scroll animation to sections
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        observer.observe(section);
    });

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
        const sections = document.querySelectorAll('#about, #activities, #courses');
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
    const courseYears = document.querySelectorAll('.course-year');
    const prevButton = document.getElementById('prevCourse');
    const nextButton = document.getElementById('nextCourse');
    let currentYearIndex = 0;

    const updateCourseNavigation = () => {
        prevButton.disabled = currentYearIndex === 0;
        nextButton.disabled = currentYearIndex === courseYears.length - 1;
    };

    const showCourseYear = (index) => {
        courseYears.forEach((year, i) => {
            if (i === index) {
                year.classList.add('active');
                year.style.display = 'block';
                year.style.opacity = 1;
                year.style.transform = 'translateX(0)';
            } else {
                year.classList.remove('active');
                year.style.display = 'none';
                year.style.opacity = 0;
                year.style.transform = 'translateX(100%)';
            }
        });
        updateCourseNavigation();
    };

    prevButton.addEventListener('click', () => {
        if (currentYearIndex > 0) {
            currentYearIndex--;
            showCourseYear(currentYearIndex);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentYearIndex < courseYears.length - 1) {
            currentYearIndex++;
            showCourseYear(currentYearIndex);
        }
    });

    showCourseYear(currentYearIndex); // Show initial course year
    updateCourseNavigation(); // Initial setup

    // ... rest of the existing code ...
});
