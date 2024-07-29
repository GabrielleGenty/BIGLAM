import { useEffect, useState } from "react";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";




function Categories() {
    const [categories, setCategories] = useState(null);
    const [ refreshCategoriesList , setCategoriesList] = useState(false);

    useEffect(() => {
		document.title = "Back Office | Categories";
		async function fetchCategories() {
			const response = await fetch(
				"http://localhost:9000/api/v1/categories",
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
		fetchCategories();
	}, [refreshCategoriesList]);
    
	async function deleteHandler(e, id) {
		e.preventDefault();
		const response = await fetch(
			"http://localhost:9000/api/v1/categories/" + id,
			{
				method: "DELETE",
				credentials: "include",
			}
		);
		if (response.ok) {
			setCategoriesList(!refreshCategoriesList);
		}
	}
    async function updateHandler(e, id) {
		e.preventDefault();
		const response = await fetch(
			"http://localhost:9000/api/v1/categories/" + id,
			{
				method: "PATCH",
				credentials: "include",
			}
		);
		if (response.ok) {
			setCategoriesList(!refreshCategoriesList);
		}
	}
    async function addCategories(e, id) {
        try {
		e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
		const response = await fetch(
			"http://localhost:9000/api/v1/categories/" + id,
			{
				method: "POST",
				credentials: "include",
			}
		);
		if (response.ok) {
			setCategoriesList(!refreshCategoriesList);
		}
     } catch (error){
       console.log(error);
     }
	}
  return (
<main id="auth">
    {error && <p>{error}</p>}
	<section>
		<h2>Liste des Categories</h2>
		<div>
			<h3>Ajouter un categories</h3>
			<form onSubmit={addCategories}>
			<input
              type="text"
              id="categorie"
              name="Categorie"
              placeholder="Enter New Category"
              required 
            />
			<button type="submit">Send</button>
			</form>
		</div>
		
	</section>
</main>
  )
}

export default Categories;