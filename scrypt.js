document.addEventListener('DOMContentLoaded', () => {
    fetchFilms();
    document.getElementById('search-title').addEventListener('input', () => filterFilms('title'));
    document.getElementById('search-director').addEventListener('input', () => filterFilms('director'));
    document.getElementById('search-country').addEventListener('input', () => filterFilms('country'));
    document.getElementById('search-release-year').addEventListener('input', () => filterFilms('release_year'));
    document.getElementById('search-revenue').addEventListener('input', () => filterFilms('box_office_revenue'));
});

let films = [];

async function fetchFilms() {
    try {
        const response = await fetch('films.json');
        films = await response.json();
        displayFilms(films);
    } catch (error) {
        console.error('Error fetching films:', error);
    }
}

function displayFilms(films) {
    const tableBody = document.getElementById('myTable');
    tableBody.innerHTML = '';
    if (films.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="6">No results found</td>`;
        tableBody.appendChild(row);
    } else {
        films.forEach(film => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${film.id}</td>
                <td>${film.title}</td>
                <td>${film.release_year}</td>
                <td>${film.director}</td>
                <td>${film.box_office_revenue}</td>
                <td>${film.country}</td>
            `;
            tableBody.appendChild(row);
        });
    }
}

function sortFilms(column) {
    const th = document.querySelector(`th[data-colname="${column}"]`);
    const order = th.getAttribute('data-order');
    films.sort((a, b) => {
        if (a[column] < b[column]) return order === 'asc' ? -1 : 1;
        if (a[column] > b[column]) return order === 'asc' ? 1 : -1;
        return 0;
    });
    th.setAttribute('data-order', order === 'asc' ? 'desc' : 'asc');
    th.innerHTML = th.innerHTML.replace(order === 'asc' ? '▼' : '▲', order === 'asc' ? '▲' : '▼');
    displayFilms(films);
}

function filterFilms(column) {
    const searchTerm = document.getElementById(`search-${column}`).value.toLowerCase();
    const filteredFilms = films.filter(film => film[column].toString().toLowerCase().includes(searchTerm));
    displayFilms(filteredFilms);
}

// Initial display
displayFilms(films);