const password = '123'; // Senha pré-definida

function login() {
    const username = document.getElementById('username').value;
    const inputPassword = document.getElementById('password').value;

    if (inputPassword === password) {
        document.getElementById('login-section').style.display = 'block';
    } else {
        alert('Senha incorreta!');
    }
}

function searchEquipments() {
    const query = document.getElementById('search').value;
    fetch(`/equipamentos?query=${query}`)
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('equipments-list');
            list.innerHTML = '';
            data.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `
                    ${item.numero_patrimonio} - ${item.modelo} - ${item.categoria}
                    <button onclick="editEquipment(${item.id})">Editar</button>
                    <button onclick="deleteEquipment(${item.id})">Deletar</button>
                `;
                list.appendChild(li);
            });
        });
}

function addEquipment() {
    const numero_patrimonio = document.getElementById('numero_patrimonio').value;
    const modelo = document.getElementById('modelo').value;
    const categoria = document.getElementById('categoria').value;
    const data_insercao = document.getElementById('data_insercao').value;

    fetch('/equipamentos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            numero_patrimonio,
            modelo,
            categoria,
            data_insercao,
        }),
    })
        .then(response => response.text())
        .then(message => {
            alert(message);
            searchEquipments();
        });
}

function deleteEquipment(id) {
    fetch(`/equipamentos/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.text())
        .then(message => {
            alert(message);
            searchEquipments();
        });
}

function editEquipment(id) {
    fetch(`/equipamentos?query=${id}`)
        .then(response => response.json())
        .then(data => {
            const item = data[0];
            document.getElementById('edit-id').value = item.id;
            document.getElementById('edit-numero_patrimonio').value = item.numero_patrimonio;
            document.getElementById('edit-modelo').value = item.modelo;
            document.getElementById('edit-categoria').value = item.categoria;
            document.getElementById('edit-data_insercao').value = item.data_insercao;

            document.getElementById('edit-section').style.display = 'block';
            document.getElementById('login-section').style.display = 'none';
        });
}

function updateEquipment() {
    const id = document.getElementById('edit-id').value;
    const numero_patrimonio = document.getElementById('edit-numero_patrimonio').value;
    const modelo = document.getElementById('edit-modelo').value;
    const categoria = document.getElementById('edit-categoria').value;
    const data_insercao = document.getElementById('edit-data_insercao').value;

    fetch(`/equipamentos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            numero_patrimonio,
            modelo,
            categoria,
            data_insercao,
        }),
    })
        .then(response => response.text())
        .then(message => {
            alert(message);
            cancelEdit();
            searchEquipments();
        });
}

function cancelEdit() {
    document.getElementById('edit-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
}
