document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('toDoForm');
    const toDoList = document.getElementById('toDoList');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const titulo = document.getElementById('titulo').value;
        const descricao = document.getElementById('descricao').value;

        const response = await fetch('/to_do/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ titulo, descricao })
        });

        if (response.ok) {
            const newToDo = await response.json();
            addToList(newToDo);
            form.reset();
        } else {
            alert('Erro ao adicionar a tarefa.');
        }
    });

    async function loadToDos() {
        const response = await fetch('/to_do/');
        const toDos = await response.json();
        toDos.forEach(addToList);
    }

    function addToList(toDo) {
        const li = document.createElement('li');
        li.textContent = `${toDo.titulo}: ${toDo.descricao}`;
        toDoList.appendChild(li);
    }

    loadToDos();
});
