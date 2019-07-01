// COMPONENTS
// ----------
// Main
//   UI
//     ButtonCategory
//     ProductItems
//       ProductItem

// Components in reverse order of above
const ProductItem = ({ category, name }) => (
  <div className="category__list-item boxy flex-spread">
    {name}
    <div className={`category--${category} circle`} />
  </div>
);

const ProductItems = ({ state: { products, displayCategory } }) => (
  <div>
    {products
      .filter(
        ({ category }) =>
          displayCategory === category || displayCategory === "Todos"
      )
      .map(({ category, name }) => (
        <ProductItem key={`ProductItems-name`} category={category} name={name} />
      ))}
  </div>
);

const ButtonCategory = ({ setCategory, category }) => (
  <button className={`btn-${category} button is-fullwidth`} onClick={() => setCategory(category)}>
    {category}
  </button>
);


const ButtonCategories = (productCategories, setCategory) => (
  productCategories.map((category, i) => (
    <ButtonCategory key={category} setCategory={setCategory} category={category} />
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

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCategory: "Todos",
      products: PRODUCTS,
      productCategories: PRODUCT_CATEGORIES
    };
    this.setCategory = this.setCategory.bind(this);
  }
  setCategory(category) {
    this.setState({
      displayCategory: category
    });
  }
  render() {
    return <UI setCategory={this.setCategory} state={this.state} />;
  }
}

// data
const PRODUCTS = [
  { category: "Entrada", name: "Causa rellena" },
  { category: "Entrada", name: "Ceviche" },
  { category: "Entrada", name: "Tamal" },
  { category: "Entrada", name: "Alitas Broster" },
  { category: "Entrada", name: "Tequenos" },
  { category: "Entrada", name: "Papa a la Huancaina" },
  { category: "Sopa", name: "Sopa a la minuta" },
  { category: "Sopa", name: "Menestron" },
  { category: "Sopa", name: "Shambar" },
  { category: "Sopa", name: "Sopa de letras" },
  { category: "Sopa", name: "Sopa de leche" },
  { category: "Sopa", name: "Caldo de gallina" },
  { category: "Sopa", name: "Caldo de cabeza" },
  { category: "Sopa", name: "Patasca" },
  { category: "Segundo", name: "Arroz con pollo" },
  { category: "Segundo", name: "Frejoles con seco de pollo" },
  { category: "Segundo", name: "Estofado de pollo" },
  { category: "Segundo", name: "Aji de gallina" },
  { category: "Segundo", name: "Arroz a la cubana" },
  { category: "Segundo", name: "Carapulcra" },
  { category: "Segundo", name: "Chicharron de pescado" },
  { category: "Segundo", name: "Cau-cau" },
  { category: "Postre", name: "Mazamorra" },
  { category: "Postre", name: "Arroz con Leche" },
  { category: "Postre", name: "Shampu" },
  { category: "Postre", name: "Picarones" },
  { category: "Postre", name: "Flan" },
  { category: "Postre", name: "Tres leches" },
  { category: "Postre", name: "Suspiro a la limena" },
  { category: "Bebida", name: "Agua" },
  { category: "Bebida", name: "Gaseosa" },
  { category: "Bebida", name: "Limonada" },
  { category: "Bebida", name: "Te" },
  { category: "Bebida", name: "Cafe" },
  { category: "Bebida", name: "Chicha morada" },
  { category: "Bebida", name: "Juego de Naranja" },
  { category: "Bebida", name: "Agua de coco" },
  { category: "Bebida", name: "Anis" },
  { category: "Bebida", name: "Chicha de jora" },
];

componentDidMount(){
fetch('http://pix.pe/servicioandroid/serviciocategorias').then(response => response.json())
.then(PRODUCTS => this.setState({PRODUCTS}))
.catch(e => console.log(e));
}

// get unique category items
const uniqueItems = (x, i, a) => a.indexOf(x) === i;
const PRODUCT_CATEGORIES = PRODUCTS.map(prod => prod.category).filter(
  uniqueItems
);

PRODUCT_CATEGORIES.push("Todos");
PRODUCT_CATEGORIES.sort();

ReactDOM.render(<Main products={PRODUCTS} />, document.getElementById("root"));
