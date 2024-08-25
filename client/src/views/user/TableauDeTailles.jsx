import React from 'react';
const API_URL = import.meta.env.VITE_API_URL

function TableauDeTailles() {
  return (
    
      <article >
        <div>
        <h2>Tableau Des Tailles</h2>
        <hr />
        <p>
          Cher visiteur, trouvez facilement la taille parfaite avec notre tableau de conversion des bagues. Mesurez le diamètre intérieur en mm, et comparez-le avec les tailles françaises, UK/US, italiennes et allemandes. Assurez-vous d'un ajustement parfait pour votre achat ! Bon shopping !
        </p>
        </div>
        <div className='container'>
        <img 
          src={API_URL + `/images/guide-des-tailles.png`}
          alt="guide de taille de bague"
        />
     </div>
      </article>
      
  );
}

export default TableauDeTailles;
