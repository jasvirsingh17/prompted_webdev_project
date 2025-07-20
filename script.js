document.addEventListener('DOMContentLoaded', () => {
  // Smooth Scrolling for Navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();

          // Close mobile nav if open
          const navLinks = document.querySelector('.nav-links');
          const burger = document.querySelector('.burger');
          if (navLinks.classList.contains('nav-active')) {
              navLinks.classList.remove('nav-active');
              burger.classList.remove('toggle');
          }

          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });

  // Mobile Navigation Toggle
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  const dropdown = document.querySelector('.dropdown'); // The li element for dropdown
  const dropbtn = document.querySelector('.dropbtn'); // The anchor tag inside dropdown

  burger.addEventListener('click', () => {
      navLinks.classList.toggle('nav-active');
      burger.classList.toggle('toggle');
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
          if (navLinks.classList.contains('nav-active') && !link.closest('.dropdown')) { // Don't close if it's a dropdown parent
              navLinks.classList.remove('nav-active');
              burger.classList.remove('toggle');
          }
      });
  });

  // Handle dropdown clicks for mobile responsiveness - important!
  if (window.innerWidth <= 900) { // Apply only on mobile/tablet sizes
      dropbtn.addEventListener('click', function(e) {
          e.preventDefault(); // Prevent default anchor behavior
          const dropdownContent = this.nextElementSibling;
          if (dropdownContent && dropdownContent.classList.contains('dropdown-content')) {
              dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
              // Toggle arrow animation
              this.querySelector('.arrow').style.transform = dropdownContent.style.display === 'block' ? 'rotate(180deg)' : 'rotate(0deg)';
          }
      });
  }

  // Course Category Filtering
  const categoryButtons = document.querySelectorAll('.category-btn');
  const courseLists = document.querySelectorAll('.course-list');
  const certCoursesSection = document.getElementById('courses-with-cert');
  const noCertCoursesSection = document.getElementById('courses-without-cert');

  // Function to filter courses based on category and certification type
  function filterCourses(category) {
      // Hide all course cards first
      document.querySelectorAll('.course-card').forEach(card => {
          card.style.display = 'none';
      });

      // Show courses with certification for the selected category
      certCoursesSection.querySelectorAll(`.course-card[data-category="${category}"]`).forEach(card => {
          card.style.display = 'flex'; // Use flex for vertical alignment in cards
      });

      // Show courses without certification for the selected category
      noCertCoursesSection.querySelectorAll(`.course-card[data-category="${category}"]`).forEach(card => {
          card.style.display = 'flex'; // Use flex for vertical alignment in cards
      });
  }


  categoryButtons.forEach(button => {
      button.addEventListener('click', function() {
          // Remove active class from all buttons
          categoryButtons.forEach(btn => btn.classList.remove('active'));
          // Add active class to the clicked button
          this.classList.add('active');

          // Get the category from data-category attribute
          const selectedCategory = this.dataset.category;

          // Show both certification types and then filter
          courseLists.forEach(list => list.classList.add('active-category')); // Show both cert/non-cert containers initially

          // Filter specific courses within the visible containers
          filterCourses(selectedCategory);
      });
  });

  // Initialize with the first category active on page load
  if (categoryButtons.length > 0) {
      categoryButtons[0].click(); // Simulate click on the first button
  }

  // Form Submission for Feedback (Client-side only)
  const feedbackForm = document.querySelector('.feedback-form');
  const formMessage = document.getElementById('form-message');

  feedbackForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent actual form submission

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const feedback = document.getElementById('feedback').value;

      if (feedback.trim() === '') {
          formMessage.textContent = 'Please enter your feedback.';
          formMessage.classList.remove('success', 'hidden');
          formMessage.classList.add('error');
          return;
      }

      // Simulate successful submission
      formMessage.textContent = 'Thank you for your feedback! We appreciate it.';
      formMessage.classList.remove('error', 'hidden');
      formMessage.classList.add('success');

      // Clear the form
      feedbackForm.reset();

      // Hide message after a few seconds
      setTimeout(() => {
          formMessage.classList.add('hidden');
      }, 5000);
  });

  // Intersection Observer for Section Animations
  const sections = document.querySelectorAll('section');

  const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1 // Trigger when 10% of the section is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('section-visible');
              entry.target.classList.remove('section-hidden');
          } else {
              // Optional: remove class when not visible if you want re-animation on scroll up
              entry.target.classList.remove('section-visible');
              entry.target.classList.add('section-hidden');
          }
      });
  }, observerOptions);

  sections.forEach(section => {
      section.classList.add('section-hidden'); // Add hidden class initially
      observer.observe(section);
  });
});