/// creamos un array con eventos que tenemos
const productos = 
[ 
    {
        id: 1, 
        artista: "La Konga", 
        precio: 8000, 
        img:
        "https://pbs.twimg.com/media/FJvYZFEXoAEAgdg.jpg",
        cantidad: 1,
    },
    {
        id: 2, 
        artista: "Bad Bunny", 
        precio: 12000, 
        img:
        "https://cdn.stayhappening.com/events5/banners/2879a8bf04fd78b43a4fdc928af1d48ebc07cb7f378b5ae3926c99d829b92ba3-rimg-w1200-h1500-gmir.jpg?v=1654115286",
        cantidad: 1,
    },
    {
        id: 3, 
        artista: "Lali", 
        precio: 12000, 
        img:
        "http://agenciasanluis.com/wp-content/uploads/2022/06/PHOTO-2022-06-28-08-49-41.jpg",
        cantidad: 1,
    },
    {
        id: 4, 
        artista: "David Guetta", 
        precio: 15000, 
        img:
        "https://pbs.twimg.com/media/FFoI7qKXEAQ39zO.jpg",
        cantidad: 1,
    },
    {
        id: 5, 
        artista: "Tiesto", 
        precio: 15000, 
        img:
        "https://assets.adnradio.cl/2022/11/tiesto-flyer-1024x1024.jpg",
        cantidad: 1,
    },
    {
        id: 6, 
        artista: "Daddy Yankee", 
        precio: 20000, 
        img:
        "https://assets0.dostuffmedia.com/uploads/aws_asset/aws_asset/10183056/40f945f8-f911-4fdf-b963-c742a76ab851.jpg",
        cantidad: 1,
    },
    {
        id: 7, 
        artista: "Karol G", 
        precio: 16000, 
        img:
        "https://tuboleta.com/imagenes/6137e31f65562.jpg",
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
