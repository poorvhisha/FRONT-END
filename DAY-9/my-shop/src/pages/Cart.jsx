const Cart = ({ cart }) => {
  return (
    <div className="container">
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cart.map((item, index) => (
          <div key={index}>
            {item.name} - ₹{item.price}
          </div>
        ))
      )}
    </div>
  );
};
export default Cart;