document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('toDoForm');
    const toDoList = document.getElementById('toDoList');
    const verTabelaButton = document.getElementById('verTabela');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const titulo = document.getElementById('titulo').value;
        const descricao = document.getElementById('descricao').value;
        const status = document.getElementById('status').value;

        const response = await fetch('/to_do/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ titulo, descricao, status })
        });

        if (response.ok) {
            const newToDo = await response.json();
            addToList(newToDo);
            form.reset();
        } else {
            alert('Erro ao adicionar a tarefa.');
        }
    });

    verTabelaButton.addEventListener('click', loadToDos);

    async function loadToDos() {
        const response = await fetch('/to_do/');
        const toDos = await response.json();
        toDoList.innerHTML = ''; // Limpa a lista antes de recarregar
        toDos.forEach(addToList);
    }

    function addToList(toDo) {
        const li = document.createElement('li');
        li.innerHTML = `${toDo.titulo}: ${toDo.descricao} - <strong>${toDo.status}</strong>
            <button onclick="deleteToDo(${toDo.id})">Delete</button>
            <button onclick="updateStatus(${toDo.id}, 'concluido')">Concluir</button>
            <button onclick="updateStatus(${toDo.id}, 'pendente')">Reverter</button>`;
        li.setAttribute('data-id', toDo.id);
        toDoList.appendChild(li);
    }

    window.deleteToDo = async function(id) {
        const response = await fetch(`/to_do/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            document.querySelector(`li[data-id="${id}"]`).remove();
        } else {
            alert('Erro ao deletar a tarefa.');
        }
    };

    window.updateStatus = async function(id, status) {
        const response = await fetch(`/to_do/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        });

        if (response.ok) {
            document.querySelector(`li[data-id="${id}"] strong`).textContent = status;
        } else {
            alert('Erro ao atualizar o status da tarefa.');
        }
    };

    loadToDos();
});
