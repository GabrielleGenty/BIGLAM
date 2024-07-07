import { useEffect ,useState} from "react";
import Card from "./components/Card";
import Carousel from "../user/components/Carousel.jsx";


function Home() {
  const images = [
    '../../../public/images/new_collection_blue.jpg',
    '../../../public/images/new_collection_multi pierre.jpg',
    '../../../public/images/collier_violet.jpg',
  ];
  const [datas ,setDatas]= useState(null);
  useEffect(()=>{
    async function fetchData(){
      try{
        const datas = await fetch('http://localhost:9000/api/v1/products');
        const datasParsed = await datas.json();
        console.log(datasParsed);
        setDatas(datasParsed);

      }catch (error){
       console.log(error);
      }
    }
    fetchData();

  },[]);
  if(!datas){
    return (
      <div>Loading...</div>
    )
  }
  if(datas){
    return(
      <main id ="home">
      
          <div className="App">
            <h1>Nouv</h1>
            <Carousel images={images} />
         </div>

        <section>
          <h2>Nouvelle Collection</h2>
         {
          datas.response.map( (data) =>(
            <Card key={data.id} products={data} />

          ))}
          <hr/>

         <h2>Nouvelle Collection</h2>
          {
          datas.response.map( (data) =>(
            <Card key={data.id} products={data} />

          ))}
          <hr/>
        </section>
    </main>
    ) 
    
  }
  
}

export default Home;