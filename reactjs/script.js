        // COMPONENTS
// ----------
// Main
//   UI
//     ButtonCategory
//     ProductItems
//       ProductItem

// Components in reverse order of above
const ProductItem = ({ categoria, nombre }) => (
  <div className="categoria__list-item boxy flex-spread">
    {nombre}
    <div className={`categoria--${categoria} circle`} />
  </div>
);

const ProductItems = ({ state: { products, displayCategory } }) => (
  <div>
    {products
      .filter(
        ({ categoria }) =>
          displayCategory === categoria || displayCategory === "Todos"
      )
      .map(({ categoria, nombre }) => (
        <ProductItem key={`ProductItems-nombre`} categoria={categoria} nombre={nombre} />
      ))}
  </div>
);

const ButtonCategory = ({ setCategory, categoria }) => (
  <button className={`btn-${categoria} button is-fullwidth`} onClick={() => setCategory(categoria)}>
    {categoria}
  </button>
);


const ButtonCategories = (productCategories, setCategory) => (
  productCategories.map((categoria, i) => (
    <ButtonCategory key={categoria} setCategory={setCategory} categoria={categoria} />
  ))
);

const UI = ({
  state,
  state: { productCategories },
  setCategory,
  allProducts
}) => (
    <div className="columns">
      <div className="column is-3">
        <h3 class="subtitle is-5">Categorias</h3>
        {ButtonCategories(productCategories, setCategory)}
      </div>
      <div className="column is-9">
        <h3 class="subtitle is-5">Productos</h3>
        <ProductItems state={state} />
      </div>
    </div>
  );
  const PRODUCTS = [];
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCategory: "Todos",
      PRODUCTS: [],
      products: PRODUCTS,
      productCategories: PRODUCT_CATEGORIES,
      
    };
    this.setCategory = this.setCategory.bind(this);
  };
  setCategory(categoria) {
    this.setState({
      displayCategory: categoria
    });
  }
  

  render() {
    return <UI setCategory={this.setCategory} state={this.state} />;
  }

}

// data

  fetch('http://pix.pe/servicioandroid/serviciocategorias.php').then(response => response.json())
  .then(PRODUCTS => PRODUCTS)
  .catch(e => console.log(e));
  



// get unique categoria items
const uniqueItems = (x, i, a) => a.indexOf(x) === i;
const PRODUCT_CATEGORIES = PRODUCTS.map(prod => prod.categoria).filter(
  uniqueItems
);


PRODUCT_CATEGORIES.push("Todos");
PRODUCT_CATEGORIES.sort();

ReactDOM.render(<Main products={PRODUCTS} />, document.getElementById("root"));
       

       
