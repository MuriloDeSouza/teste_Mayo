document.addEventListener('DOMContentLoaded', function () {
    fetchTodos();

    const form = document.getElementById('todo-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const titulo = document.getElementById('titulo').value;
        const descricao = document.getElementById('descricao').value;

        const response = await fetch('/to_do/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ titulo, descricao, status: 'pendente' }),
        });

        if (response.ok) {
            fetchTodos();
            form.reset();
        }
    });
});

async function fetchTodos() {
    const response = await fetch('/to_do/');
    const data = await response.json();

    const itemsList = document.getElementById('items');
    itemsList.innerHTML = '';

    if (data && data.data) {
        data.data.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${item.titulo} - ${item.descricao}</span>
                <select onchange="updateStatus(${item.id}, this.value)">
                    <option value="pendente" ${item.status === 'pendente' ? 'selected' : ''}>Pendente</option>
                    <option value="concluido" ${item.status === 'concluido' ? 'selected' : ''}>Concluído</option>
                </select>
                <button onclick="deleteTodo(${item.id})">Deletar</button>
            `;
            itemsList.appendChild(listItem);
        });
    }
}

async function updateStatus(id, status) {
    await fetch(`/to_do/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: status }),
    });
    fetchTodos();
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const status = document.getElementById('status').value;

    const response = await fetch('/to_do/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titulo, descricao, status }),
    });

    if (response.ok) {
        fetchTodos();
        form.reset();
    }
});

async function deleteTodo(id) {
    await fetch(`/to_do/${id}`, {
        method: 'DELETE',
    });
    fetchTodos();
}
