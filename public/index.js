const wsConnection = io();

wsConnection.on("productsUpdated", (products) => {
    renderProducts(products)
})


function renderProducts(products) {
    const container = document.getElementById("products-container");
    container.innerHTML = "";

    products.forEach(p => {
        container.innerHTML += `
            <li>
                <h3>${p.title}</h3>
                <p>ID ${p.id}</p>
                <p>${p.description}</p>
                <p>Precio: $${p.price}</p>
                <p>Categoría: ${p.category}</p>
            </li>
        `;
    });
}
