import  { useCart } from "../../hooks/useCart";

function Cart(){
    const { cart } = useCart();
    console.log(cart);
    return(
        <section>
            <h2>Cart SOON</h2>
            {!cart.length ?(
                  <p>Panier vide </p>
                ) :(
                 cart.map((item) => (
                    <article key={item.id}>
                        <p>identifiant : {item.id}</p>
                        <p>label : {item.title}</p>
                        <p>Quantité : {item.quantity}</p>
                    </article>
                 ))
                )
            }


        </section>
    );
}
export default Cart;