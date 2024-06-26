document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('financeForm');
    const tableBody = document.getElementById('historyTable').getElementsByTagName('tbody')[0];

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const amount = document.getElementById('amount').value;
        const type = document.getElementById('type').value;
        const details = document.getElementById('details').value || 'N/A';
        const date = document.getElementById('date').value;

        addRecord(amount, type, details, date);
        form.reset();
    });

    loadRecords();

    function addRecord(amount, type, details, date) {
        const records = JSON.parse(localStorage.getItem('financeRecords')) || [];
        const record = { amount, type, details, date };
        records.push(record);
        localStorage.setItem('financeRecords', JSON.stringify(records));
        renderTable();
    }

    function deleteRecord(index) {
        const records = JSON.parse(localStorage.getItem('financeRecords')) || [];
        records.splice(index, 1);
        localStorage.setItem('financeRecords', JSON.stringify(records));
        renderTable();
    }

    function editRecord(index) {
        const records = JSON.parse(localStorage.getItem('financeRecords')) || [];
        const record = records[index];
        document.getElementById('amount').value = record.amount;
        document.getElementById('type').value = record.type;
        document.getElementById('details').value = record.details;
        document.getElementById('date').value = record.date;
        deleteRecord(index);
    }

    function renderTable() {
        tableBody.innerHTML = '';
        const records = JSON.parse(localStorage.getItem('financeRecords')) || [];
        records.forEach((record, index) => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = record.amount;
            row.insertCell(1).textContent = record.type;
            row.insertCell(2).textContent = record.details;
            row.insertCell(3).textContent = record.date;

            const actionsCell = row.insertCell(4);
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => editRecord(index));
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteRecord(index));
            actionsCell.appendChild(deleteButton);
        });
    }

    function loadRecords() {
        renderTable();
    }
});


