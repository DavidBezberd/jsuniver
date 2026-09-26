// Створюємо поля для 5 відділів
const departmentsContainer = document.getElementById("departments");

for (let i = 1; i <= 5; i++) {
    departmentsContainer.innerHTML += `
        <div class="department">
            <h3>Відділ №${i}</h3>

            <label>
                Назва відділу:
                <input type="text" id="name${i}" required>
            </label>

            <label>
                Кількість співробітників:
                <input type="number" id="employees${i}" min="0" required>
            </label>

            <label>
                Кількість співробітників за штатним розписом:
                <input type="number" id="staff${i}" min="0" required>
            </label>

            <label>
                Фонд заробітної плати фактичний:
                <input type="number" id="actualSalary${i}" min="0" step="0.01" required>
            </label>

            <label>
                Фонд заробітної плати плановий:
                <input type="number" id="plannedSalary${i}" min="0" step="0.01" required>
            </label>
        </div>
    `;
}

const enterprise = {
    entName: "",
    activity: "",
    address: ""
};

function Department(
    name,
    employees,
    staff,
    actualSalary,
    plannedSalary
) {
    this.name = name;
    this.employees = employees;
    this.staff = staff;
    this.actualSalary = actualSalary;
    this.plannedSalary = plannedSalary;

    this.salarySaving = plannedSalary - actualSalary;
}

Department.prototype = enterprise;

Department.prototype.constructor = Department;

document.getElementById("companyForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const error = document.getElementById("error");
    const result = document.getElementById("result");

    error.innerHTML = "";
    result.innerHTML = "";

    const companyName = document.getElementById("companyName").value.trim();
    const companyActivity = document.getElementById("companyActivity").value.trim();
    const companyAddress = document.getElementById("companyAddress").value.trim();

    if (
        companyName === "" ||
        companyActivity === "" ||
        companyAddress === ""
    ) {
        error.textContent = "Заповніть усі поля підприємства.";
        return;
    }

    enterprise.name = companyName;
    enterprise.activity = companyActivity;
    enterprise.address = companyAddress;

    const departments = [];


    for (let i = 1; i <= 5; i++) {

        const name = document.getElementById(`name${i}`).value.trim();

        const employees = Number(
            document.getElementById(`employees${i}`).value
        );

        const staff = Number(
            document.getElementById(`staff${i}`).value
        );

        const actualSalary = Number(
            document.getElementById(`actualSalary${i}`).value
        );

        const plannedSalary = Number(
            document.getElementById(`plannedSalary${i}`).value
        );

        if (name === "") {
            error.textContent = `Введіть назву відділу №${i}.`;
            return;
        }

        if (
            isNaN(employees) ||
            isNaN(staff) ||
            isNaN(actualSalary) ||
            isNaN(plannedSalary)
        ) {
            error.textContent = `Перевірте числові поля відділу №${i}.`;
            return;
        }

        if (
            employees < 0 ||
            staff < 0 ||
            actualSalary < 0 ||
            plannedSalary < 0
        ) {
            error.textContent =
                `Числові значення відділу №${i} не можуть бути від'ємними.`;
            return;
        }

        const department = new Department(
            name,
            employees,
            staff,
            actualSalary,
            plannedSalary
        );


        departments.push(department);
    }


    let bestDepartment = departments[0];

    for (let i = 1; i < departments.length; i++) {

        if (
            departments[i].salarySaving >
            bestDepartment.salarySaving
        ) {
            bestDepartment = departments[i];
        }
    }

    let table = `
        <div class="result">
            <h2>Результати</h2>

            <table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Відділ</th>
                        <th>Співробітники</th>
                        <th>За штатним розписом</th>
                        <th>Фактичний фонд</th>
                        <th>Плановий фонд</th>
                        <th>Економія</th>
                    </tr>
                </thead>

                <tbody>
    `;


    for (let i = 0; i < departments.length; i++) {

        const department = departments[i];

        const isBest =
            department === bestDepartment
                ? "class='best'"
                : "";

        table += `
            <tr ${isBest}>
                <td>${i + 1}</td>
                <td>${department.name}</td>
                <td>${department.employees}</td>
                <td>${department.staff}</td>
                <td>${department.actualSalary.toFixed(2)}</td>
                <td>${department.plannedSalary.toFixed(2)}</td>
                <td>${department.salarySaving.toFixed(2)}</td>
            </tr>
        `;
    }


    table += `
                </tbody>
            </table>
        </div>
    `;

    const information = `
        <div class="info">

            <h2>Відділ з найбільшою економією</h2>

            <p>
                <strong>Назва:</strong>
                ${bestDepartment.name}
            </p>

            <p>
                <strong>Кількість співробітників:</strong>
                ${bestDepartment.employees}
            </p>

            <p>
                <strong>Кількість за штатним розписом:</strong>
                ${bestDepartment.staff}
            </p>

            <p>
                <strong>Фактичний фонд:</strong>
                ${bestDepartment.actualSalary.toFixed(2)}
            </p>

            <p>
                <strong>Плановий фонд:</strong>
                ${bestDepartment.plannedSalary.toFixed(2)}
            </p>

            <p>
                <strong>Економія:</strong>
                ${bestDepartment.salarySaving.toFixed(2)}
            </p>

            <hr>

            <h3>Успадковані властивості підприємства</h3>

            <p>
                <strong>Найменування підприємства:</strong>
                ${bestDepartment.nameOfEnterprise}
            </p>

            <p>
                <strong>Напрям діяльності:</strong>
                ${bestDepartment.activity}
            </p>

            <p>
                <strong>Адреса:</strong>
                ${bestDepartment.address}
            </p>

        </div>
    `;

    result.innerHTML = table + information;

    console.log("===== ПЕРЕВІРКА ВЛАСТИВОСТЕЙ =====");

    console.log(
        "Власна властивість name:",
        bestDepartment.hasOwnProperty("name")
    );

    console.log(
        "Власна властивість employees:",
        bestDepartment.hasOwnProperty("employees")
    );

    console.log(
        "Власна властивість salarySaving:",
        bestDepartment.hasOwnProperty("salarySaving")
    );

    console.log(
        "Успадкована властивість activity:",
        bestDepartment.hasOwnProperty("activity")
    );

    console.log(
        "Успадкована властивість address:",
        bestDepartment.hasOwnProperty("address")
    );


    // Ланцюжок прототипів
    console.log("===== ЛАНЦЮЖОК ПРОТОТИПІВ =====");

    let currentObject = bestDepartment;

    while (currentObject !== null) {
        console.log(currentObject);
        currentObject = Object.getPrototypeOf(currentObject);
    }


    console.log("===== ОБ'ЄКТ ЗНАЙДЕНО =====");
    console.log(bestDepartment);
});