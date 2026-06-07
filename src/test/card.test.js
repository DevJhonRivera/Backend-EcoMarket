const addToCart = (cartItems, product, qty = 1) => {
  const existing = cartItems.find(item => item._id === product._id);

  if (existing) {
    return cartItems.map(item =>
      item._id === product._id
        ? { ...item, quantity: item.quantity + qty }
        : item
    );
  }

  return [...cartItems, { ...product, quantity: qty }];
};

test("agrega producto nuevo al carrito", () => {
  const cart = [];
  const product = { _id: "1", name: "Laptop" };

  const result = addToCart(cart, product);

  expect(result.length).toBe(1);
  expect(result[0].quantity).toBe(1);
});

test("incrementa cantidad si el producto ya existe", () => {
  const cart = [{ _id: "1", name: "Laptop", quantity: 1 }];
  const product = { _id: "1", name: "Laptop" };

  const result = addToCart(cart, product);

  expect(result[0].quantity).toBe(2);
});