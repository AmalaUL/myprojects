const heading = document.createElement('h1');
heading.textContent = 'Search Autocomplete Component'

const searchBox = document.createElement('input');
searchBox.placeholder = 'type anything...';
searchBox.style.marginRight = '10px';
searchBox.style.width = '200px';
searchBox.style.height = '50px';
searchBox.id = 'searchTextBox'

document.body.appendChild(heading);
document.body.appendChild(searchBox);

//debounce utility
function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}

//closure to keep history
function makeHistory() {
    let history = [];
    return function (searchValue) {
        history = [...history, searchValue]// immutably update history
        console.log(history);
    }

}
// Create a persistent history handler
const recordSearch = makeHistory();
// Wrap it with debounce
const debounceRecordSearch = debounce(recordSearch, 300);
// Attach to search box input
searchBox.addEventListener('input', function () {
    const searchValue = searchBox.value;//current value
    debounceRecordSearch(searchValue)
})


