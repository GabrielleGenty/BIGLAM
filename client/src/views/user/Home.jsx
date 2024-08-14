import { useEffect, useState } from "react";
import Card from "./components/Card";
import Carousel from "../user/components/Carousel.jsx";

function Home() {
  const images = [
    '/images/new_collection_blue.jpg',
    '/images/new_collection_multi_pierre.jpg',
    '/images/collier_violet.jpg',
  ];

  const [datas, setDatas] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:9000/api/v1/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDatas(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!datas || !datas.response || !Array.isArray(datas.response)) {
    return <div>Data format is incorrect.</div>;
  }

  return (
    <main id="home">
      <div className="App">
        <h1>Nouv</h1>
        <Carousel images={images} />
      </div>

      <section>
        <h2>Nouvelle Collection</h2>
        {datas.response.map((data) => (
          <Card key={data.id} products={data} />
        ))}
      </section>
      <hr />
      <section>
        <h2>Autre Collection</h2>
        {datas.response.map((data) => (
          <Card key={data.id} products={data} />
        ))}
      </section>
      <hr />
    </main>
  );
}

export default Home;
