    const params = new URLSearchParams(window.location.search);
    const categoria = params.get('categoria');
    const busqueda = params.get('q');
    const catalogo = document.querySelector('.Catalogo');
    const verMas = document.getElementById('verMas');
    let currentPage = 1;
    let Buscado=false;
    const paginasMaxima = 20;
    

    window.addEventListener('DOMContentLoaded', () => {
        if (busqueda) {
            document.getElementById("buscar").value = busqueda; 
            buscarMangas();  
        } else {
            cargarmangas(); 
        }
    });
    async function cargarmangas()
    {
        catalogo.innerHTML='';
        switch(categoria)
        {
            case 'populares':
                

            await fetch(`https://api.jikan.moe/v4/top/manga?page=${currentPage}&limit=25&sfw=true`)
                    .then(response => response.json())
                    .then(data=> {
                        data.data.forEach(manga=> {
                            const Popular = document.createElement('div')
                            Popular.classList.add('Popular')
                            Popular.innerHTML = `
                                <a href="Detalles.html?id=${manga.mal_id}">
                                    <img src="${manga.images.jpg.image_url}" alt="${manga.title}" />
                                    <p title="${manga.title}">
                                    ${manga.title.length > 100 ? manga.title.slice(0, 100) + '...' : manga.title}
                                    </p>
                                </a>
                                `;
                                catalogo.appendChild(Popular);
                        });
                        crearPaginacion(data.pagination.last_visible_page);
                    });
                    
            break;

            case 'Publishing':
            case 'Complete':
                await fetch(`https://api.jikan.moe/v4/manga?status=${categoria}&limit=25&page=${currentPage}&sfw=true`)
                    .then(response => response.json())
                    .then(data => 
                        {
                        data.data.forEach(manga => 
                            {
                            const Popular = document.createElement('div')
                            Popular.classList.add('Popular')
                            Popular.innerHTML = `
                                <a href="Detalles.html?id=${manga.mal_id}">
                                    <img src="${manga.images.jpg.image_url}" alt="${manga.title}" />
                                    <p title="${manga.title}">
                                    ${manga.title.length > 100 ? manga.title.slice(0, 100) + '...' : manga.title}
                                    </p>
                                </a>
                            `;
                            catalogo.appendChild(Popular);
                            });
                            crearPaginacion(data.pagination.last_visible_page);
                        });
            break;
            
            default:
                await fetch(`https://api.jikan.moe/v4/manga?genres=${categoria}&limit=25&page=${currentPage}&sfw=true`)
                    .then(response => response.json())
                    .then(data => 
                        {
                        data.data.forEach(manga => 
                            {
                            const Popular = document.createElement('div')
                            Popular.classList.add('Popular')
                            Popular.innerHTML = `
                                <a href="Detalles.html?id=${manga.mal_id}">
                                    <img src="${manga.images.jpg.image_url}" alt="${manga.title}" />
                                    <p title="${manga.title}">
                                    ${manga.title.length > 100 ? manga.title.slice(0, 100) + '...' : manga.title}
                                    </p>
                                </a>
                            `;
                            catalogo.appendChild(Popular);
                            });
                            crearPaginacion(data.pagination.last_visible_page);
                        });
            break;
        }
    }
    async function buscarMangas(resetPage=true)
    {
        Buscado=true;
        if(resetPage)currentPage=1;
        catalogo.innerHTML = "";
        const busqueda = document.getElementById("buscar").value.trim().toLowerCase();
        if(busqueda == "")
            {
                Buscado=false;
                window.location.href = window.location.pathname;
            } 
            const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('q', busqueda); // Actualiza el parámetro 'q'
    window.history.pushState({}, '', '?' + urlParams.toString()); // Cambia la URL sin recargar

        if (busqueda.includes("skibidi")) 
        {
            const Popular = document.createElement('div')
            Popular.classList.add('Popular')
            Popular.innerHTML = `
                <a href="https://www.youtube.com/watch?v=uO1NPnoU2kQ" target="_blank">
                <img src="https://i.pinimg.com/1200x/23/62/2e/23622e721a31b1bf7d58661f91856d7b.jpg">
                <p>Que se mejore</p>
                <p>Antonio porfa matese</p>
                </a>
            `;
            catalogo.appendChild(Popular);
            crearPaginacion(1);
            return;
        }
        if (busqueda.includes("homero")) {
            const Popular = document.createElement("div");
            Popular.classList.add("Popular");
            Popular.innerHTML = `
                            <a href="https://www.youtube.com/watch?v=LOeL7WHFuiA" target="_blank">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDBp0Dwp-GL1_Xy197a47ZMIfSIuRYGS2B_A&s" >
                            <p>HOMERO HOMERO HOMERO 🗣️🗣️🗣️</p>
                            <p>CERVEZA 🗣️🗣️</p>
                            </a>
                        `;
            catalogo.appendChild(Popular);
            crearPaginacion(1);
            return;
          }
          if (busqueda.includes("de guiken")) {
            const Popular = document.createElement("div");
            Popular.classList.add("Popular");
            Popular.innerHTML = `
                                <a href="https://www.youtube.com/watch?v=ll6sBa3Dafs" target="_blank">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppH9apT6gq-lpLNd7IG0mBMMvE8qCweNlZw&s" />
                                <p>de guiken</p>
                                <p>fin de semana</p>
                                </a>
                            `;
            catalogo.appendChild(Popular);
            crearPaginacion(1);
            return;
          }
        else
        {
            await fetch(`https://api.jikan.moe/v4/manga?q=${busqueda}&sfw=true&limit=25&page=${currentPage}`)
                    .then(response => response.json())
                    .then(data => 
                        {
                            if (data.data.length === 0) {
                                catalogo.innerHTML = '<p>No hay mangas con ese nombre UnU</p>';
                                return;
                            }
                        data.data.forEach(manga => 
                            {
                            const Popular = document.createElement('div')
                            Popular.classList.add('Popular')
                            Popular.innerHTML = `
                                <a href="Detalles.html?id=${manga.mal_id}">
                                    <img src="${manga.images.jpg.image_url}" alt="${manga.title}" />
                                    <p title="${manga.title}">
                                    ${manga.title.length > 100 ? manga.title.slice(0, 100) + '...' : manga.title}
                                    </p>
                                </a>
                            `;
                            catalogo.appendChild(Popular);
                            
                            });
                            crearPaginacion(data.pagination.last_visible_page);
                        });
                        
        }
        
                       
    }
    function crearPaginacion(totalPaginas)
    {
        const container = document.querySelector('.Paginacion');
        container.innerHTML='';

        const tolerancia = 5;
        if (currentPage - tolerancia > 0) // Mostrar flecha de mierda
        {
            const span = document.createElement('span');
            span.textContent = "←";
            span.classList.add('numeroPagina');
            span.addEventListener('click', () => cambiarPagina(1));
            container.appendChild(span);
        }
        for (let i = currentPage - tolerancia; i <= currentPage + tolerancia; i++) // Añadir siguientes páginas
        {
            if(i <= 0 || i > totalPaginas) continue;
            const span = document.createElement('span');
            span.textContent = i;
            span.classList.add('numeroPagina');

            if (i === currentPage)
            {
                span.classList.add('activo');
            }

            span.addEventListener('click', () => cambiarPagina(i));
            container.appendChild(span);
            
        }
    
        if (totalPaginas > currentPage + tolerancia) // Mostrar flecha de mierda
        {
            const span = document.createElement('span');
            span.textContent = "→";
            span.classList.add('numeroPagina');
            span.addEventListener('click', () => cambiarPagina(totalPaginas));
            container.appendChild(span);
        }
        
    }
    function cambiarPagina(nuevaPagina)
    {
        currentPage = nuevaPagina;
        if (Buscado) 
        {
            buscarMangas(false); 
        } 
        else 
        {
            cargarmangas();
        }
    }
    if (!params.has("categoria") && !params.has("q")) { 
        window.location.href = window.location.pathname + "?categoria=populares";
    }
