document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".product-card");
    const noProjectsMsg = document.querySelector(".no-projects-msg");
    const productCountSpan = document.querySelector(".product-count");
    const sortToggle = document.querySelector(".sort-toggle");
    const sortMenu = document.querySelector(".sort-menu");
    const sortOptions = sortMenu.querySelectorAll("li");

    // Atualiza a contagem de produtos visíveis
    function updateProductCount() {
        const visible = Array.from(cards).filter(card => card.style.display !== "none");
        productCountSpan.textContent = `${visible.length} produto${visible.length !== 1 ? "s" : ""}`;
    }

    // Filtra os cards pela categoria
    function filtrarPorCategoria(categoria) {
        let visibleCount = 0;

        cards.forEach(card => {
            if (categoria === "todos" || card.dataset.category === categoria) {
                card.style.display = "block"; // ou "" (ambos funcionam)
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        if (visibleCount === 0) {
            noProjectsMsg.classList.remove("hidden");
        } else {
            noProjectsMsg.classList.add("hidden");
        }

        updateProductCount(); // <-- atualizar sempre após filtro
    }

    // Lógica para clique nos botões de filtro
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const category = btn.dataset.category;
            filtrarPorCategoria(category);
        });
    });

    // Verifica se a URL tem categoria selecionada (?categoria=xyz)
    const urlParams = new URLSearchParams(window.location.search);
    const categoriaSelecionada = urlParams.get("categoria");

    if (categoriaSelecionada) {
        const buttonToActivate = document.querySelector(`.filter-btn[data-category="${categoriaSelecionada}"]`);
        if (buttonToActivate) {
            buttonToActivate.click();
            window.scrollTo({ top: 0 });
        } else {
            cards.forEach(card => card.style.display = "none");
            noProjectsMsg.classList.remove("hidden");
            updateProductCount();
        }
    } else {
        filtrarPorCategoria("todos");
        const allButton = document.querySelector('.filter-btn[data-category="todos"]');
        if (allButton) allButton.classList.add("active");
    }

    // Lógica do dropdown de ordenação
    sortToggle.addEventListener("click", () => {
        sortMenu.classList.toggle("hidden");
    });

    sortOptions.forEach(option => {
        option.addEventListener("click", () => {
            sortToggle.innerHTML = `${option.textContent} <i class="fa-solid fa-angle-down"></i>`;
            sortMenu.classList.add("hidden");
            console.log(`Ordenar por: ${option.dataset.sort}`);
            // Lógica real de ordenação pode ser implementada depois
        });
    });

    const filterBtn = document.querySelector(".filter-btn-grid");
    const filterDropdown = document.querySelector(".filter-dropdown");
    const priceRange = document.getElementById("price-range");
    const priceValue = document.getElementById("price-value");

    // Toggle de dropdown de filtro
    filterBtn.addEventListener("click", () => {
        filterDropdown.classList.toggle("hidden");
    });

    function atualizarSlider() {
        const value = priceRange.value;
        const min = priceRange.min;
        const max = priceRange.max;
        const percent = ((value - min) / (max - min)) * 100;

        priceRange.style.background = `linear-gradient(to right, #48f0c8 ${percent}%, #333 ${percent}%)`;
        priceValue.textContent = `R$${value}`;
    }

    atualizarSlider();

    priceRange.addEventListener("input", atualizarSlider);

});
