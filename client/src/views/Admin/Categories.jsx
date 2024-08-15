import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "./ConfirmationModal"; // Import the modal

function Categories() {
  const [categories, setCategories] = useState(null);
  const [refreshCategoriesList, setCategoriesList] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editLabel, setEditLabel] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  useEffect(() => {
    document.title = "Back Office | Categories";
    async function fetchCategories() {
      try {
        const response = await fetch("http://localhost:9000/api/v1/categories", {
          credentials: "include",
        });
        if (response.status === 401) {
          console.log("Unauthorized");
          return;
        }
        if (response.ok) {
          const data = await response.json();
          setCategories(data.response);
        } else {
          console.error("Failed to fetch categories:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, [refreshCategoriesList]);

  async function deleteHandler() {
    try {
      const response = await fetch(`http://localhost:9000/api/v1/categories/${categoryToDelete}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        setCategoriesList(!refreshCategoriesList);
        setShowModal(false);
      } else {
        console.error("Failed to delete category:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  }

  async function updateCategoryHandler(e) {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:9000/api/v1/categories/${editingCategory.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ label: editLabel }),
      });
      if (response.ok) {
        setCategoriesList(!refreshCategoriesList);
        setEditingCategory(null);
        setEditLabel("");
      } else {
        console.error("Failed to update category:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  }

  function openModal(id, label) {
    setCategoryToDelete(id);
    setDeleteMessage(`Are you sure you want to delete the category "${label}"?`);
    setShowModal(true);
  }

  function startEditing(category) {
    setEditingCategory(category);
    setEditLabel(category.label);
  }

  if (!categories) {
    return (
      <main>
        <h2>Loading...</h2>
      </main>
    );
  }

  return (
    <main id="admin">
      <section>
        <h1>Liste de Categories</h1>
        <div id="buttonSet">
          <button id="addButton">
            <Link to="/category/add">
              <strong>Ajouter un Category</strong> <FontAwesomeIcon icon={faPlus} />
            </Link>
          </button>
          <button id="retourButton">
            <Link to="/">
              <strong>Retour To Home</strong>
            </Link>
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th><h3>Id</h3></th>
              <th><h3>Label</h3></th>
              <th><h3>Actions</h3></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>
                  {editingCategory && editingCategory.id === category.id ? (
                    <form onSubmit={updateCategoryHandler}>
                      <input
                        type="text"
                        value={editLabel}
                        onChange={(e) => setEditLabel(e.target.value)}
                      />
                      <button type="submit">Save</button>
                      <button type="button" onClick={() => setEditingCategory(null)}>Cancel</button>
                    </form>
                  ) : (
                    category.label
                  )}
                </td>
                <td>
                  {editingCategory && editingCategory.id === category.id ? (
                    <></>
                  ) : (
                    <>
                      <button onClick={() => startEditing(category)}>Modifier</button>
                      <button onClick={() => openModal(category.id, category.label)}>Supprimer</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <ConfirmationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={deleteHandler}
        message={deleteMessage}
      />
    </main>
  );
}

export default Categories;