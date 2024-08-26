import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "./ConfirmationModal";
const API_URL = import.meta.env.VITE_API_URL;

function Categories() {
  const [categories, setCategories] = useState(null);
  const [refreshCategoriesList, setCategoriesList] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editLabel, setEditLabel] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessMessageOnly, setShowSuccessMessageOnly] = useState(false);

  useEffect(() => {
    document.title = "Back Office | Categories";
    async function fetchCategories() {
      try {
        const response = await fetch(API_URL + "/api/v1/categories", {
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
      const response = await fetch(API_URL + `/api/v1/categories/${categoryToDelete}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        setSuccessMessage(`Category with ID "${categoryToDelete}" deleted successfully!`);
        setShowSuccessMessageOnly(true);
        setCategoriesList(!refreshCategoriesList);
        setShowModal(false);
        hideSuccessMessage();
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
      const response = await fetch(API_URL + `/api/v1/categories/${editingCategory.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ label: editLabel }),
      });
      if (response.ok) {
        setSuccessMessage(`Category "${editLabel}" updated successfully!`);
        setShowSuccessMessageOnly(true);
        setCategoriesList(!refreshCategoriesList);
        setEditingCategory(null);
        setEditLabel("");
        hideSuccessMessage();
      } else {
        console.error("Failed to update category:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  }

  function hideSuccessMessage() {
    setTimeout(() => {
      setShowSuccessMessageOnly(false);
      setSuccessMessage("");
    }, 3000); // Hide success message after 3 seconds
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
        {showSuccessMessageOnly && <div className="success-message">{successMessage}</div>}
        <div id="buttonSet">
          <button id="addButton">
            <Link to="/category/add">
              Ajouter un Category <FontAwesomeIcon icon={faPlus} />
            </Link>
          </button>
          <button id="retourButton">
            <Link to="/">
              Retour To Home
            </Link>
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th><h2>Id</h2></th>
              <th><h2>Label</h2></th>
              <th><h2>Actions</h2></th>
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
                      <div className="buttongroup">
                        <button className="categorybutton" type="submit">Save</button>
                        <button className="categorybutton" type="button" onClick={() => setEditingCategory(null)}>Cancel</button>
                      </div>
                    </form>
                  ) : (
                    category.label
                  )}
                </td>
                <td className="tdbutton">
                  {editingCategory && editingCategory.id === category.id ? (
                    <></>
                  ) : (
                    <>
                      <button className="categorybutton" onClick={() => startEditing(category)}>Modifier</button>
                      <button className="categorybutton" onClick={() => openModal(category.id, category.label)}>Supprimer</button>
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
