import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const PORT = process.env.PORT || process.env.LOCAL_PORT;
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true, // permets d'accéder au "serveur" front de n'importe où. Configuration à faire dans un environnement "Cloud9"
        port: PORT, //nouveau port à utiliser plutôt que le 5173 par défaut
        proxy: { // c'est une "passerelle"
            '/api': { // toutes les requêtes commençant par /api seront redirigées vers le serveur API (url définit dans le fichier .env de vite)
                target: process.env.VITE_API_URL,
            }
        }
    }
})
