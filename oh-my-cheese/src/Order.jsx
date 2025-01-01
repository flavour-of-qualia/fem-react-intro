import Pizza from "./Pizza";
import { useState, useEffect } from "react";

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Order() {
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [loading, setLoading] = useState(true);

  let price, selectedPizza;

  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
    price = intl.format(selectedPizza.sizes[pizzaSize]);
  }

  async function fetchPizzaTypes() {
    const pizzaRes = await fetch("/api/pizzas");
    const pizzaJson = await pizzaRes.json();
    setPizzaTypes(pizzaJson);
    setLoading(false);
  }

  useEffect(() => {
    fetchPizzaTypes();
  }, []); // this tells to run once, since we don't depend on any variable change

  return (
    <div className="order">
      <h2>Create Order</h2>
      <form>
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type</label>
            <select
              name="pizza-type"
              value={pizzaType}
              onChange={(e) => setPizzaType(e.target.value)}
            >
              {pizzaTypes.map((pizza) => {
                return (
                  <option key={pizza.id} value={pizza.id}>
                    {pizza.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor="pizza-size">Pizza Size</label>
            <div>
              <span>
                <input
                  type="radio"
                  name="pizza-size"
                  onChange={(e) => setPizzaSize(e.target.value)}
                  value="S"
                  id="pizza-s"
                  checked={pizzaSize === "S"}
                />
                <label htmlFor="pizza-s">Small</label>
              </span>
              <span>
                <input
                  type="radio"
                  name="pizza-size"
                  onChange={(e) => setPizzaSize(e.target.value)}
                  value="M"
                  id="pizza-m"
                  checked={pizzaSize === "M"}
                />
                <label htmlFor="pizza-m">Medium</label>
              </span>
              <span>
                <input
                  type="radio"
                  name="pizza-size"
                  onChange={(e) => setPizzaSize(e.target.value)}
                  value="L"
                  id="pizza-l"
                  checked={pizzaSize === "L"}
                />
                <label htmlFor="pizza-l">Large</label>
              </span>
            </div>
            <button type="submit">Add to cart</button>
            <div className="order-pizza">
              {loading ? (
                <h1> omg wait a bit your pizza is loading </h1>
              ) : (
                <Pizza
                  name={selectedPizza.name}
                  description={selectedPizza.description}
                  image={selectedPizza.image}
                />
              )}
              <p>{price}</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
