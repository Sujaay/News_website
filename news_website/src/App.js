
import React from 'react';
import './App.css';

const articles = [
  {
    title: "Breaking News",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dapibus fermentum metus, ut sollicitudin urna efficitur vel.",
    image: "https://via.placeholder.com/150",
    link: "#"
  },
  {
    title: "Latest Technology",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dapibus fermentum metus, ut sollicitudin urna efficitur vel.",
    image: "https://via.placeholder.com/150",
    link: "#"
  },
  {
    title: "Sports Update",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dapibus fermentum metus, ut sollicitudin urna efficitur vel.",
    image: "https://via.placeholder.com/150",
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
