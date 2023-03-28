// Global Variables
const myForm = document.querySelector('#myForm');
const singleData = document.querySelector('#singleData');
const userWrap = document.querySelector('#userWrap');
// localStorage Functions
const writeDataToLocalStorage = (data, key = 'tasks') => localStorage.setItem(key, JSON.stringify(data));
const readDataFromLocalStorage = (key = 'tasks') => JSON.parse(localStorage.getItem(key)) || [];

const heads = ['name', 'phone', 'age', 'status'];


//functions
const getUserObject = (myForm) => {
    const user = { id: Date.now() };
    heads.forEach(element => user[element] = myForm.elements[element].value);
    return user;
};
function getUserData(user) {
    const allUsers = readDataFromLocalStorage('users');
    allUsers.push(user);
    writeDataToLocalStorage(allUsers, 'users');
};
// Creating elements
function createUserElements(el, parent, txt = null, classes = null) {
    let element = document.createElement(el);
    parent.appendChild(element);
    if (txt) element.textContent = txt;
    if (classes) element.classList = classes;
    return element;
}
// events
if (myForm) {
    myForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const user = getUserObject(myForm);
        getUserData(user);
        window.location = 'index.html';
        console.log(user);

    })
}
drawData = () => {
    userWrap.innerHTML = ''
    const allUsers = readDataFromLocalStorage('users');
    allUsers.forEach((user, i) => {
        const tr = createUserElements('tr', userWrap);
        createUserElements('td', tr, user.id);
        createUserElements('td', tr, user.name);
        createUserElements('td', tr, user.phone);
        createUserElements('td', tr, user.age);
        createUserElements('td', tr, user.status);
        const td = createUserElements('td', tr);
        const showBtn = createUserElements('button', td, 'show', 'mx-3 btn btn-primary');
        const delBtn = createUserElements('button', td, 'delete', 'mx-3 btn btn-danger');
        const editBtn = createUserElements('button', td, 'edit', 'mx-3 btn btn-warning');

        delBtn.addEventListener('click', () => {
            const allUsers = readDataFromLocalStorage('users');
            allUsers.splice(i, 1);
            writeDataToLocalStorage(allUsers, 'users');
            drawData();
        });
        showBtn.addEventListener('click', () => {
            localStorage.setItem("index", i);
            window.location = "single.html";
        });
    })
}

if (userWrap) { drawData() }

if (singleData) {
    const index = localStorage.getItem("index");
    const allUsers = readDataFromLocalStorage("users");
    createUserElements("p", singleData, allUsers[index].name);
    createUserElements("p", singleData, allUsers[index].phone);
    createUserElements("p", singleData, allUsers[index].age);
    createUserElements("p", singleData, allUsers[index].status);
    createUserElements("p", singleData, allUsers[index].id);
};
