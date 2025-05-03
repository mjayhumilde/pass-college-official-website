# Official School Website (Development Prototype)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

This repository contains the development prototype for the official website of Pass College. This project aims to create a modern and user-friendly online presence for the school, serving as a central hub for marketing, announcements, document requests, customizable informational pages, **user authentication with role-based access control, and a course recommendation quiz for prospective students.** This prototype is built using a modern JavaScript-based tech stack and focuses on demonstrating the core functionalities and potential of the final website.

## Functionality (Prototype)

This prototype currently implements the following key features:

- **School Marketing:**
  - Visually appealing homepage showcasing the school's key highlights, mission, and values.
  - Dedicated sections for showcasing school programs, facilities, and achievements.
  - Image galleries and embedded videos to engage visitors.
- **Announcements:**
  - A dedicated section to display important school announcements, news, and events in a clear and timely manner.
- **Document Request:**
  - A streamlined system for current and prospective students (and potentially alumni) to request common school documents (e.g., transcripts, enrollment certificates).
  - Includes forms for submitting requests and potentially information on the process and required details.
- **Customizable Pages (for Marketing):**
  - The architecture allows for the creation and management of flexible content pages. This can be used to highlight specific programs, introduce faculty, or provide detailed information on various aspects of the school.
  - Demonstrates the ability to easily add and edit content through a (potentially simplified for the prototype) content management approach.
- **Authentication with Roles:**
  - Implements a user authentication system allowing different user roles with varying levels of access and permissions:
    - **Admin:** Full control over the website and its content.
    - **Teacher:** Ability to manage course-related information, post announcements relevant to their students, etc.
    - **User:** General access to public content, the ability to request documents, and potentially access personalized information.
- **Course Recommendation Quiz:**
  - A feature for prospective students to take a quiz based on their interests and academic inclinations.
  - Provides recommendations for suitable courses offered by the school based on their quiz responses.

## Tech Stack

This prototype is built using the following technologies:

- **React:** A JavaScript library for building user interfaces, providing a component-based and efficient development experience.
- **Tailwind CSS:** A utility-first CSS framework for rapid styling and creating visually consistent designs.
- **HTML:** The standard markup language for creating web pages.
- **CSS:** Cascading Style Sheets for styling and layout.
- **JavaScript (ES6+):** The dynamic programming language that powers the interactivity of the website.

## Development Status

This project is currently in the **development prototype** phase. It serves as a proof of concept and demonstrates the core functionalities and design direction for the final school website. Not all features may be fully implemented or production-ready at this stage. The authentication and course recommendation quiz features are key additions showcasing the potential for user interaction and personalized experiences.

## Getting Started (for Developers)

If you wish to contribute to or explore this prototype, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/your-github-username/your-repo-name.git](https://github.com/your-github-username/your-repo-name.git)
    ```

    _(Replace `your-github-username/your-repo-name` with the actual URL of your repository)_

2.  **Navigate to the project directory:**

    ```bash
    cd your-repo-name
    ```

3.  **Install dependencies:**

    ```bash
    npm install  # or yarn install
    ```

4.  **Start the development server:**
    ```bash
    npm start  # or yarn start
    ```
    This command will typically start a local development server, and you can view the prototype in your browser (usually at `http://localhost:3000`).

## Future Enhancements (Potential for Thesis)

This prototype lays the foundation for a comprehensive school website. Future development could include:

- **Database Integration:** Connecting the frontend to a backend database to store and manage dynamic content (announcements, documents, user data, quiz questions/results, user roles and permissions).
- **Backend Development:** Building a robust backend API (e.g., using Node.js with Express, Python with Django/Flask) to handle data management, authentication logic, and quiz processing.
- **Advanced Document Request Features:** Tracking request status, automated notifications, and potentially digital document delivery.
- **Content Management System (CMS) Integration:** Implementing a user-friendly CMS (either custom-built or using existing solutions) for easy content updates by school administrators.
- **Search Functionality:** Allowing users to easily search for information across the website.
- **Accessibility Improvements:** Ensuring the website is accessible to users with disabilities (following WCAG guidelines).
- **Performance Optimization:** Optimizing the website for faster loading times and better user experience.
- **Testing:** Implementing unit, integration, and end-to-end tests to ensure the reliability of the website, including the authentication and quiz functionalities.
- **More Sophisticated Course Recommendation Algorithm:** Enhancing the logic of the quiz to provide more personalized and accurate course suggestions.
- **User Profile Management:** Allowing authenticated users to manage their profiles and preferences.

## License

This project is licensed under the [MIT License](LICENSE). See the `LICENSE` file for more information.

## Contact

Mark John Humilde - humildemarkjohn00@gmail.com
2101630
Pass College
