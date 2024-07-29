import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/UseUser";

function Register() {
  const { setUser } = useUser();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log(data);
    
    try {
      const response = await fetch(
        "http://localhost:9000/api/v1/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        });
        
      if (!response.ok) {
        const responseParsed = await response.json();
        setError(responseParsed.message);
        console.log('Error response:', responseParsed); // Log the error response
        return;
      }

      const responseParsed = await response.json();
      console.log('Success response:', responseParsed); // Log the success response
      form.reset();
      setUser(responseParsed.user);
      navigate("/");
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
      console.log('Fetch error:', error); // Log the fetch error
    }
  }

  return (
    <main id="auth">
      <section>
        <h1>Créate Un Compte</h1>
      {error && <p>{error}</p>}
      <form onSubmit={submitHandler}>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="Votre prénom d'utilisateur"
          required
        />
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Votre nom d'utilisateur"
          required
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="votre E-mail"
          required
        />
        <input 
          type="hidden"
          id="isAdmin"
          name="isAdmin"
          value="0"
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Votre mot de passe"
          required
        />
        
        <button type="submit">Register</button>
      </form>
      </section>
    </main>
  );
}

export default Register;