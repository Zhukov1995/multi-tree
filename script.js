const services = [
    {
        "id": 1,
        "head": null,
        "name": "Проф.осмотр",
        "node": 0,
        "price": 100.0,
        "sorthead": 20
    },
    {
        "id": 2,
        "head": null,
        "name": "Хирургия",
        "node": 1,
        "price": 0.0,
        "sorthead": 10
    },
    {
        "id": 3,
        "head": 2,
        "name": "Удаление зубов",
        "node": 1,
        "price": 0.0,
        "sorthead": 10
    },
    {
        "id": 4,
        "head": 3,
        "name": "Удаление зуба",
        "node": 0,
        "price": 800.0,
        "sorthead": 10
    },
    {
        "id": 5,
        "head": 3,
        "name": "Удаление 8ого зуба",
        "node": 0,
        "price": 1000.0,
        "sorthead": 30
    },
    {
        "id": 6,
        "head": 3,
        "name": "Удаление осколка зуба",
        "node": 0,
        "price": 2000.0,
        "sorthead": 20
    },
    {
        "id": 7,
        "head": 2,
        "name": "Хирургические вмешательство",
        "node": 0,
        "price": 200.0,
        "sorthead": 10
    },
    {
        "id": 8,
        "head": 2,
        "name": "Имплантация зубов",
        "node": 1,
        "price": 0.0,
        "sorthead": 20
    },
    {
        "id": 9,
        "head": 8,
        "name": "Коронка",
        "node": 0,
        "price": 3000.0,
        "sorthead": 10
    },
    {
        "id": 10,
        "head": 8,
        "name": "Слепок челюсти",
        "node": 0,
        "price": 500.0,
        "sorthead": 20
    }
]


function buildTree(items, parent) {
    parent = parent || null;
    let result = [];

    items.forEach((item) => {
        if (item.head === parent) {
            result.push(item);
            item.children = buildTree(items, item.id);
            item.children.sort((a, b) => a.sorthead - b.sorthead);

            if (!item.children.length) {
                delete item.children;
            }
        }
    });
    return result;
}


function createHtmlList(tree) {
    let ul = document.createElement('ul');
    ul.classList.add('list')
    tree.forEach((node) => {
        let li = document.createElement('li');
        li.textContent = node.name;
        if (node.children) {
            li.classList.add('parent')
            console.log(createHtmlList(node.children));
            li.appendChild(createHtmlList(node.children));
        } else {
            li.textContent = `${node.name}: ${node.price}`;
            li.classList.remove('parent')
        }
        ul.appendChild(li);

    });
    return ul;
}

let tree = buildTree(services);
let htmlTree = createHtmlList(tree);
const servicesTree = document.getElementById('servicesTree');
servicesTree.appendChild(htmlTree);

for (let li of servicesTree.querySelectorAll("li")) {
    let span = document.createElement("span");
    span.classList.add("show");
    li.prepend(span);
    span.append(span.nextSibling);
}

servicesTree.onclick = function (event) {
    if (event.target.tagName != "SPAN") return;

    let childrenList = event.target.parentNode.querySelector("ul");
    if (!childrenList) return;
    childrenList.hidden = !childrenList.hidden;

    if (childrenList.hidden) {
        event.target.classList.add("hide");
        event.target.classList.remove("show");
    } else {
        event.target.classList.add("show");
        event.target.classList.remove("hide");
    }
};
