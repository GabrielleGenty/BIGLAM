import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/UseUser";
const API_URL = import.meta.env.VITE_API_URL;

function Register() {
  const { login, setUser } = useUser();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Password length validation
    if (data.password.length < 8) {
      setError("Le mot de passe doit comporter au moins 8 caractères !!");
      return;
    }

    try {
      const response = await fetch(
        API_URL + "/api/v1/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const responseParsed = await response.json();
        console.log('Error status:', response.status);
        console.log('Error response:', responseParsed);
        setError(responseParsed.message || "An unexpected error occurred. Please try again later.");
        return;
      }

      const responseParsed = await response.json();
      form.reset();
      login(responseParsed.user);
      navigate("/");
    } catch (error) {
      console.log('Fetch error:', error);
      setError("An unexpected error occurred. Please try again later.");
    }
  }

  return (
    <main id="auth">
      <section>
        <h1>Create an Account</h1>
        {error && <p>{error}</p>}
        <form onSubmit={submitHandler}>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Your First Name"
            required
            aria-required="true"
            aria-describedby="firstNameHelp"
          />
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Your Last Name"
            required
            aria-required="true"
            aria-describedby="lasttNameHelp"
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            required
            aria-required="true"
            aria-describedby="emailHelp"
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
            placeholder="Your Password"
            required
            aria-required="true"
            aria-describedby="passwordHelp"
          />
          <button type="submit">Register</button>
        </form>
      </section>
    </main>
  );
}

export default Register;
