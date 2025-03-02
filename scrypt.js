// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    fetchFilms(); // Fetch the films data
    // Add event listeners for the search inputs
    document.getElementById('search_title').addEventListener('input', () => filterFilms('title'));
    document.getElementById('search_release_year').addEventListener('input', () => filterFilms('release_year'));
    document.getElementById('search_director').addEventListener('input', () => filterFilms('director'));
    document.getElementById('search_box_office_revenue').addEventListener('input', () => filterFilms('box_office_revenue'));
    document.getElementById('search_country').addEventListener('input', () => filterFilms('country'));
});

let films = []; // Array to store the films data

// Fetch the films data from the JSON file
async function fetchFilms() {
    try {
        const response = await fetch('films.json');
        films = await response.json();
        displayFilms(films); // Display the fetched films
    } catch (error) {
        console.error('Error fetching films:', error); // Log any errors
    }
}

// Display the films in the table
function displayFilms(films) {
    const tableBody = document.getElementById('myTable');
    tableBody.innerHTML = ''; // Clear the table body
    if (films.length === 0) {
        // If no films found, display a message
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="6">No results found</td>`;
        tableBody.appendChild(row);
    } else {
        // Create a row for each film and append to the table body
        films.forEach(film => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${film.id}</td>
                <td>${film.title}</td>
                <td>${film.release_year.toString()}</td>
                <td>${film.director}</td>
                <td>${film.box_office_revenue}</td>
                <td>${film.country}</td>
            `;
            tableBody.appendChild(row);
        });
    }
}

// Sort the films based on the specified column
function sortFilms(column) {
    const th = document.querySelector(`th[data-colname="${column}"]`);
    const order = th.getAttribute('data-order');
    films.sort((a, b) => {
        if (a[column] < b[column]) return order === 'asc' ? -1 : 1;
        if (a[column] > b[column]) return order === 'asc' ? 1 : -1;
        return 0;
    });
    // Toggle the sort order and update the column header
    th.setAttribute('data-order', order === 'asc' ? 'desc' : 'asc');
    th.innerHTML = th.innerHTML.replace(order === 'asc' ? '▼' : '▲', order === 'asc' ? '▲' : '▼');
    displayFilms(films); // Display the sorted films
}

// Filter the films based on the search input for the specified column
function filterFilms(column) {
    // Get the search term from the input field
    console.log(column);
    const searchTerm = document.getElementById(`search_${column}`).value.toLowerCase();
    // Filter the films based on the search term
    const filteredFilms = films.filter(film => film[column].toString().toLowerCase().includes(searchTerm));
    displayFilms(filteredFilms); // Display the filtered films
}

// Initial display of films
displayFilms(films);