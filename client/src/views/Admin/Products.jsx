import React from "react";
import { useEffect,useState } from "react";

import { Link } from "react-router-dom";
import noPicture from "../../../../api/public/images/no-picture.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


function Products() {
  const [products, setProducts] = useState(null);
  const [refreshProductList, setProductList] = useState(false);

  useEffect(() => {
		document.title = "Back Office | Produits";
		async function fetchProducts() {
			const response = await fetch(
				"http://localhost:9000/api/v1/products",
				{
					credentials: "include",
				}
			);
			if (response.status === 401) {
				console.log("Unauthorized");
				return;
			}
			if (response.ok) {
				const data = await response.json();
				setProducts(data.response);
			}
		}
		fetchProducts();
	}, [refreshProductList]);
 
  if (!products) {
		return (
			<main id="admin">
				<h2>Loading...</h2>
			</main>
		);
	}

  
	return (
		<main id="admin">
			<section>
				<h1>Liste des Produits</h1>
				<div id="buttonSet">
				<button id="addButton"><Link to="/products/add">
					Ajouter un produit <FontAwesomeIcon icon={faPlus} />
				</Link></button>
				<button id="retourButton"><Link to="/">Retour To Home</Link></button>
				</div>
		
				<table>
					<thead>
						<tr>
						
							<th><h3>Id</h3></th>
							<th><h3>Image</h3></th>
							<th><h3>title</h3></th>
							<th><h3>Prix</h3></th>
							<th><h3>Quantity In Stock</h3></th>
							<th><h3>Actions</h3></th>
						
						</tr>
					</thead>
					<tbody>
						{products.map((product) => {
							return (
								<tr key={product.id}>
									<td>{product.id}</td>
									<td>
										<img
											
											src={`http://localhost:9000/images/new_collection/${product.picture}`}
													
										
										/>
									</td>
									<td>{product.title}</td>
									<td>{product.price} €</td>
									<td>{product.quantityInStock}</td>
									<td>
										<Link to={"details/" + product.id}>
											Détails
										</Link>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			
			</section>
		</main>
	);
}

export default Products;