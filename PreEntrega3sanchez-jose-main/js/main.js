/// creamos un array con eventos que tenemos
const productos = 
[ 
    {
        id: 1, 
        artista: "la konga", 
        precio: 8000, 
        img:
        "https://diariohoynet.nyc3.cdn.digitaloceanspaces.com/adjuntos/galerias/000/516/0000516714.jpg",
        cantidad: 1,
    },
    {
        id: 2, 
        artista: "bad bunny", 
        precio: 12000, 
        img:
        "https://cdns-images.dzcdn.net/images/artist/f21443a563e5d03ddf83ed1e6a12d581/500x500.jpg",
        cantidad: 1,
    },
    {
        id: 3, 
        artista: "lali", 
        precio: 12000, 
        img:
        "https://mirror1.cdn.net.ar/mirror1/2022/08/mirror1/images/05/35/53553_a94b08927bbf56728648af3623b0bfb142e7f95897396990e2357eb040e666db/lg.webp",
        cantidad: 1,
    },
    {
        id: 4, 
        artista: "david guetta", 
        precio: 15000, 
        img:
        "https://pbs.twimg.com/media/FFoI7qKXEAQ39zO.jpg",
        cantidad: 1,
    },

];
//llamamos div padres
const shopcontent = document.getElementById("shopcontent");
const vercarrito = document.getElementById("vercarrito");
const modalcontainer = document.getElementById("modalheader");
const cantidadCarrito = document.getElementById("cantidadCarrito");

 let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

 productos.forEach((product) => {
    let content = document.createElement("div");

    content.className = "card";

    content.innerHTML = `
    <img src="${product.img}" class="imag">
    <h3>${product.artista}</h3>
    <p class="price">$ ${product.precio}</p> 
    `;

    shopcontent.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "comprar";
    content.className = "comprar";

    content.append(comprar);

    comprar.addEventListener("click", () => {

    const repeat = carrito.some((repeatproduct) => repeatproduct.id === product.id);
        if(repeat) {
            carrito.map((prod) => {
                if (prod.id === product.id) {
                    prod.cantidad++;
                }
            });
        } else{

        carrito.push({
            id: product.id,
            artista: product.artista,
            precio: product.precio,
            img: product.img,
            cantidad: product.cantidad
        });
        }
        console.log(carrito);
        carritoCounter();
        saveLocal();
    });
 });
const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

 const pintarcarrito = () => {
    modalcontainer.innerHTML = "";
    modalcontainer.style.display ="flex";
    const modalheader = document.createElement("div");
    modalheader.className = "modal-header"
    modalheader.innerHTML = `
    <h1 class="modal-header-title">carrito:</h1>
    `;
    modalcontainer.append(modalheader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "X";
    modalbutton.className = "modal-header-button"
    modalbutton.addEventListener("click", () => {
        modalcontainer.style.display = "none";
    });

    modalheader.append(modalbutton);

    carrito.forEach((product) => {
        let carritocontent = document.createElement("div");
        carritocontent.className = "modal-content"
        carritocontent.innerHTML = `
        <img src="${product.img}" class="imag">
        <h3>${product.artista}</h3>
        <p>$ ${product.precio}</p>
        <p>cantidad: ${product.cantidad}</p>
        

        `;
        modalcontainer.append(carritocontent); 

        console.log(carrito.length); 
        let eliminar = document.createElement("span");
        eliminar.innerText = "❌";
        eliminar.className = "delet-product";
        carritocontent.append(eliminar);  
        eliminar.addEventListener("click", eliminarproducto);      
    });
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalbuying = document.createElement("div");
    totalbuying.className = "total-content";
    totalbuying.innerHTML =`total a pagar: ${total}$`;
    modalcontainer.append(totalbuying);
};

vercarrito.addEventListener("click", pintarcarrito);

const eliminarproducto = () => {

    const foundid = carrito.find((element) => element.id);
    carrito = carrito.filter ((carritoid) => {
        return carritoid !== foundid;
    });
    carritoCounter();
    saveLocal();
    pintarcarrito();
};

const carritoCounter = () => {
    cantidadCarrito.style.display = "block";

    const carritolength = carrito.length;

    localStorage.setItem("carritolength", JSON.stringify(carritolength));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritolength"));
};

carritoCounter();
