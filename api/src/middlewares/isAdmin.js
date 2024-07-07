const isAdmin = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.isAdmin) {
        // Si l'utilisateur est un admin, on peut continuer à la prochaine étape de la requête (le controller)
        next();
    } else {
            // Log the unauthorized access attempt (optional)
        console.warn(`Unauthorized access attempt by user: ${req.session?.user?.id || 'Unknown'}`);
        // 403 : Forbidden
        res.status(403).json({ message: "Vous n'êtes pas autorisé à effectuer cette action" });
    }
};

export default isAdmin;