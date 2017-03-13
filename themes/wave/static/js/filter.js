/* filter.js
 * 
 * Filter portfolio items
 * V1: Only one category can be selected at a time
 * categories: dance, design, code
 */

// Add Event Listeners to Filter Buttons
document.querySelector(".filters #all").addEventListener("click", filter);
document.querySelector(".filters #dance").addEventListener("click", filter);
document.querySelector(".filters #design").addEventListener("click", filter);
document.querySelector(".filters #code").addEventListener("click", filter);

// selected category
var selected = '';

function filter(e) {
    var categories = ['dance', 'design', 'code'];
    selected = e.target.id;

    // Show All
    if (selected == 'all') {
        document.querySelector('.portfolio').style.height = "";    
        var items = document.querySelectorAll(".portfolio_item");
        forEach(items, show);
    } else {

        // Show Selected Category
        var items = document.querySelectorAll(".portfolio_item." + selected);
        forEach(items, show);
        // Adjust height so items are distributed across available coloumns
        
        if (items.length <= 5){ //or column count;
            document.querySelector('.portfolio').style.height = "500px";    
        }
        
        // Hide Other Categories
        var toHide = categoriesToHide(selected, categories);
        var query = '';
        for (i in toHide) {
            query += '.portfolio_item.' + toHide[i];
            query += (i < toHide.length - 1 ? "," : "");
        }
        var items = document.querySelectorAll(query);
        forEach(items, hide);
    }
}

// Returns an array of elements to hide
function categoriesToHide(category, categories) {
    var items = [];
    for (i in categories) {
        if (selected != categories[i]) {
            items.push(categories[i]);
        }
    }
    return items;
}

function hide(item) {
    item.style.display = "none";
}

function show(item) {
    item.style.display = "inline-block";
}

// forEach
function forEach(array, action) {
    for (var i = 0; i < array.length; i++) {
        action(array[i])
    }
}