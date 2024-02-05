
import React from 'react';
import './App.css';

const articles = [
  {
    title: "Breaking News",
    content: "CM Champai Soren wins trust vote with 47 MLAs in support",
    image: "bumrah.webp",
    link: "#"
  },
  {
    title: "Latest Technology",
    content: "Google may soon rebrand its AI chatbot Bard as Gemini",
    image: "Champai-Soren-1.jpg",
    link: "#"
  },
  {
    title: "Sports Update",
    content: "Bumrah, Ashwin Help India Level Series With Win Over England In 2nd Test",
    image: "googlelogo.jpg",
    link: "#"
  }
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>News Web App</h1>
      </header>
      <nav>
        <a href="#">Home</a>
        <a href="#">World</a>
        <a href="#">Technology</a>
        <a href="#">Science</a>
        <a href="#">Sports</a>
      </nav>
      <section className="Articles">
        {articles.map((article, index) => (
          <Article key={index} title={article.title} content={article.content} image={article.image} link={article.link} />
        ))}
      </section>
    </div>
  );
}

function Article({ title, content, image, link }) {
  return (
    <div className="Article">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{content}</p>
      <a href={link} className="ReadMore">Read More</a>
    </div>
  );
}

export default App;
