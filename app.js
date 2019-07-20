//Book constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
//UI constructor

function UI(){}

//Add book to list
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    //create tr element
    const row = document.createElement('tr');
    //Insert cols
    row.innerHTML = `<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>`;
    list.appendChild(row);
}

//Show alert
UI.prototype.showAlert = function(message, className){
    //Create div
    const div = document.createElement('div');
    //Add classes
    div.className = `alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(message));
    //Get parent
    const container = document.querySelector('.container');
    //Get form
    const form = document.querySelector('#book-form');
    //Insert Alert
    container.insertBefore(div, form);

    //Time out after 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
}

//Delete Book
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

//clear fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

//Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function(e){
    //Form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    //Instantiate Book
    const book = new Book(title, author, isbn);

    //Instantiate UI
    const ui = new UI();

    //Validation
    if(title === '' || author === '' || isbn === ''){
        //Error alert
        ui.showAlert('Please fill out all fields', 'error');
    }else{
        //Add book to list
        ui.addBookToList(book);

        //Show success alert
        ui.showAlert('Book has been added!','success');

        //clear fields
        ui.clearFields();
    }


    e.preventDefault();
});

//Event listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
    //Instantiate UI
    const ui = new UI();

    ui.deleteBook(e.target);

    //Show message
    ui.showAlert('Book removed!', 'success');


    e.preventDefault();
})