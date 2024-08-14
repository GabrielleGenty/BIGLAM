import { useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import { useUser } from "../../hooks/UseUser";


function Login() {
    const{login}= useUser();
    const [error , setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate =useNavigate();

    async function submitHandler(e){

        e.preventDefault();
        const form = e.target;
        const formData =new FormData(form);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch(
              "http://localhost:9000/api/v1/users/login",
               {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
              credentials: 'include',
            });
      
            const responseParsed = await response.json();
            form.reset();
            if (response.status === 401 || response.status === 500) {
              setError(responseParsed.message);
            } else {
             login(responseParsed.user);
              navigate('/');
            }
          } catch (err) {
            setError('Une erreur est survenue. Veuillez réessayer.');
          } finally {
            setIsLoading(false);
          }
        }
    
    return (
    <main id="auth">
      <section>
      <h1>Connect a ton Compte</h1>
        {error && <p>{error}</p>}
        
        <form  onSubmit={submitHandler}>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              required 
            />

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
             />
            <button type="submit" disabled ={isLoading}>{isLoading ?'Chargement...': 'Login'}</button>
        </form>
        <p>
            Vous n&apos;avez pas de compte ?{" "}
				<Link to="/register">Inscrivez-vous</Link>
		</p>
    </section>
    </main>

    );
}

export default Login;