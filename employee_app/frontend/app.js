const API_URL = "http://localhost:8080/employees";

async function loadEmployees() {

    const response = await fetch(API_URL);

    const employees = await response.json();

    const table = document.getElementById("employeeTable");

    table.innerHTML = "";

    employees.forEach(emp => {

        table.innerHTML += `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.department}</td>

                <td>
                    <button onclick="deleteEmployee(${emp.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

async function addEmployee() {

    const name =
        document.getElementById("name").value;

    const department =
        document.getElementById("department").value;

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            department
        })
    });

    loadEmployees();
}

async function deleteEmployee(id) {

    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    loadEmployees();
}

loadEmployees();
