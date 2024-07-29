import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function Details() {
    const [product, setProduct] = useState(null);
    const [refreshProductList, setProductList] = useState(false); 
    const { id } = useParams();

    useEffect(()=> {

        async function fetchProduct() {
            if (!id) {
                console.log("Invalid product ID");
                return;
            }
            const response = await fetch(`http://localhost:9000/api/v1/products/${id}`, {
                credentials: "include",
            });
            if (response.status === 401) {
                console.log("Unauthorized");
                return;
            }
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setProduct(data)
            }
        }
        fetchProduct();
    }, [id]);

    async function deleteHandler(e, id) {
		e.preventDefault();
		const response = await fetch(
			"http://localhost:9000/api/v1/products/" + id,
			{
				method: "DELETE",
				credentials: "include",
			}
		);
		if (response.ok) {
			setProductList(!refreshProductList);
		}
	}

    if(!product) {
        return (
            <main>
                <h1>Loading...</h1>
            </main>
        )
    }
    return (
        <main>
            <section className="productDetails">
            <h1>Product Details</h1>
                <article>
						{product.map((product) => {
							return (
								<div key={product.id}>
                                    <h2>Product ID : {product.id}</h2>
                                    <h3>Product Title : {product.title}</h3>
								    <p>Product Subtitle :{product.subTitle}</p>
                                    <p>Product Description : {product.description} </p>
									<p>Product Prix : {product.price} €</p>
                                    <p>Product Référence :{product.ref}</p>
									<p>Quantité En stock : {product.quantityInStock}</p>
                                    <p>Categories ID : {product.categories_id}</p>
                                    <img src={"../../../images/new_collection/"+ product.picture } alt={product.title} />
								</div>
							);
						})}
				
				</article>
                <button><Link to={"edit/" + product.id}>
											Modifier
										</Link></button>
                <button
					onClick={(e) =>
					deleteHandler(e, product.id)}> Supprimer</button>
                <button><Link to="/products">Retour</Link></button>
            </section>
        </main>
    )
}

export default Details;