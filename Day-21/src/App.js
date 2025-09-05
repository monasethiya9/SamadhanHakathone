import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function App() {
  return (
    <div>
      <header>
        <h1>My Portfolio</h1>
        <nav>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section id="about">
        <h2>About Me</h2>
        <p>Hello! I'm a passionate developer who loves building modern web applications.</p>
        <p>Connect with me on <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a> or <a href="https://linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>.</p>
        <div style={{fontSize: "24px"}}>
          <FaGithub /> <FaLinkedin />
        </div>
      </section>

      <section id="projects">
        <h2>Projects</h2>
        <div className="projects">
          <div className="card">
            <h3>Weather App</h3>
            <p>A React + Node.js weather app with maps and geolocation.</p>
          </div>
          <div className="card">
            <h3>Portfolio Website</h3>
            <p>A personal portfolio to showcase my work and skills.</p>
          </div>
        </div>
      </section>

      <section id="contact">
        <h2>Contact Me</h2>
        <form onSubmit={(e)=>{e.preventDefault(); alert('Message sent!')}}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send</button>
        </form>
      </section>
    </div>
  );
}

export default App;
