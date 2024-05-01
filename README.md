# Microservices Simple Blog

This repository contains a simple blog application built using a microservices architecture. The backend services are implemented using Node.js, while the frontend is developed using Next.js.

## Features

- **Microservices Architecture**: Utilizes a distributed architecture where different components of the application are developed as independent services.
- **Node.js Backend Services**: Backend services are built using Node.js, providing scalability and flexibility.
- **Next.js Frontend**: The frontend is developed using Next.js, a React framework for server-side rendering and static site generation.
- **Simple Blog Functionality**: Allows users to create posts and comments.

## Services

1. **Post Service**: Manages blog posts, including creation, retrieval, updating, and deletion.
2. **User Service**: Handles user authentication and authorization.
3. **Comment Service**: Manages comments on blog posts.

## Getting Started

To get a local copy of this project up and running, follow these steps:

1. Clone this repository to your local machine:

   ```
   git clone https://github.com/seu-usuario/microservices-simple-blog.git
   ```

2. Install dependencies for both backend and frontend services:

   ```bash
   # Navigate to the backend service folder
   cd backend
   # Install dependencies
   npm install

   # Navigate to the frontend service folder
   cd ../frontend
   # Install dependencies
   npm install
   ```

3. Start the backend services:

   ```bash
   # Navigate to the backend service folder
   cd backend
   # Start the services
   npm start
   ```

4. Start the frontend:

   ```bash
   # Navigate to the frontend service folder
   cd ../frontend
   # Start the frontend
   npm run dev
   ```

5. Open your browser and visit [http://localhost:3000](http://localhost:3000) to view the application.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use and modify this code for your own purposes.
