
var File_Object;
async function readJsonFile(fileAddress) 
{
    try 
    {
        const response = await fetch(fileAddress);
        if (!response.ok) 
        {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const container = document.getElementById("dropdown-content");
        container.innerHTML = ''; 

        data["Summary Data"].forEach(item => 
        {
            const li = document.createElement('li');
            li.className = "dropdown-item";
            li.textContent = item["SprintName"];

            li.onclick = function() 
            {
                File_Object = item["FilePath"];
                document.getElementById("dropdown-btn").textContent="SPRINT - "+item["SprintName"];
                fetchDataAndDisplay(item["FilePath"]);
            };
            container.appendChild(li);
        });
    } 
    catch (error) 
    {
        console.error('Error fetching data:', error);
    }
}
readJsonFile("JSON/Sample.json");

function toggleDropdown() {
    var dropdown = document.querySelector('.dropdown');
    dropdown.classList.toggle('active');
}

function toggleDateDropdown() {
    var dropdown = document.querySelector('.date-dropdown');
    dropdown.classList.toggle('active');
}

document.addEventListener('click', function (event) {
    if (!event.target.closest('.dropdown') && !event.target.closest('.date-dropdown')) {
        document.querySelector('.dropdown.active')?.classList.remove('active');
        document.querySelector('.date-dropdown.active')?.classList.remove('active');
    }
});

function generateHTML(project, index) {
    const statusColor = project["Project Status"] === "Fail" ? "red" : "green";
    const title = project["Project Status"] === "Fail" ? "failedTitle" : "passedTitle";
    const indexID = index;

    const projectSummary = project["Project Summary"] ? project["Project Summary"].replace(/\n|\\n/g, '<br>') : "";

    return `
    <input type="radio" name="accordion" id="cb${indexID}" />
    <section class="box">
        <label class="box-title ${title}" for="cb${indexID}">
            <table style='width:100%; padding-top:15px; padding-bottom:15px;'>
                <tr>
                    <th style='width:10%; color:${statusColor};'>${indexID}</th>
                    <th style='width:50%; color:${statusColor};text-align:left;'>${project["Project Name"]}</th>
                    <th style='width:20%; color:${statusColor};'>${project["Project Status"]}</th>
                    <th style='width:20%; color:${statusColor};'>${project["Project Date"]}</th>
                </tr>
            </table>
        </label>
        <label class="box-close" for="acc-close"></label>
        <div class="box-content">
            <table class='stepsTable'>
                <tbody>
                    <tr>
                        <a href="${project["ProjectSummaryLink"]}">Summary Page</a>
                        <p>${projectSummary}</p>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`;
}

const Generated_Total_Date_Set = new Set();
async function fetchDataAndDisplay(file_address) {
    try {
        const response = await fetch(file_address);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        const container = document.getElementById("generated_content");
        container.innerHTML = ''; // Clear previous content

        let serialNoCounter = 0;
        Generated_Total_Date_Set.clear();

        data["Entire Data"].forEach(item => {
            item.Project_Details.forEach(project => {
                serialNoCounter += 1;
                Generated_Total_Date_Set.add(project["Project Date"]);
                container.innerHTML += generateHTML(project, serialNoCounter);
            });
        });

        DisplayDate();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


function get_file_value(value) {
    File_Object = value;
    fetchDataAndDisplay(value);
}

async function fetchData(File_address, projectType) {
    try {
        const response = await fetch(File_address);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        Generated_Total_Date_Set.clear();
        const project_array = [];

        data["Entire Data"].forEach(item => {
            if (item.ProjectType === projectType) {
                item.Project_Details.forEach(project => {
                    Generated_Total_Date_Set.add(project["Project Date"]);
                    project_array.push(project);
                });
            }
        });
        console.log(project_array);
        displayProjects(project_array);
        DisplayDate();
        console.log(project_array);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayProjects(projects) {
    var projectDetailsDiv = document.getElementById("generated_content");
    projectDetailsDiv.innerHTML = "";
    console.log(projects);
    projects.forEach(function (project, index) {
        const projectHTML = generateHTML(project, index + 1);
        projectDetailsDiv.innerHTML += projectHTML;
    });
}

function filter_MRIO(value) {
    document.getElementById("generated_content").innerHTML = '';
    console.log(`clicked ${value}`);
    fetchData(File_Object, value);
}

function filter_NON_MRIO(value) {
    document.getElementById("generated_content").innerHTML = '';
    console.log(`clicked ${value}`);
    fetchData(File_Object, value);
}

function remove_filter() {
    document.getElementById("generated_content").innerHTML = '';
    console.log("remove filter");
    fetchDataAndDisplay(File_Object);
}

function DisplayDate() {
    const dateDropdownContent = document.querySelector('.date-dropdown-content');
    dateDropdownContent.innerHTML = ''; 

    const inp = document.createElement("input");
    inp.type='date';
    inp.style.cssText='display:block';
    inp.setAttribute('id','datePicker');
    inp.classList.add('iconStyle');
    dateDropdownContent.appendChild(inp);
    // under work
    // inp.addEventListener('click',()=>{confirm("hi")})
    /// under work
    inp.addEventListener('change', function () {
        var dateValue = inp.value;
        console.log(formatInputDate(dateValue));
        showSelectedDateItems(formatInputDate(dateValue))
    });

    for (const dateField of Generated_Total_Date_Set) {
        const li = document.createElement('li');
        li.textContent = dateField;
        li.classList.add("date-dropdown-item");
        dateDropdownContent.appendChild(li);

        li.addEventListener('click', function () {
            displayDataForDate(File_Object, dateField);
        });
    }
}

async function displayDataForDate(File_address, date_value) {
    try 
    {
        const response = await fetch(File_address);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const date_match_array = [];

        data["Entire Data"].forEach(item => {
            item.Project_Details.forEach(project => {
                if (project["Project Date"] == date_value) 
                {
                    date_match_array.push(project);
                    // console.log(date_match_array);
                }
            });
        });
        displayProjects(date_match_array);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function formatInputDate(inputDate) 
{
    const dateObj = new Date(inputDate);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}

function showSelectedDateItems(selectedDate) {
    let matchFound = false;

    Generated_Total_Date_Set.forEach(date => {
        if (selectedDate === date) {
            matchFound = true;
        }
        else
        {
            document.getElementById("generated_content").innerHTML='';
            const h1 = document.createElement("h1");
            h1.textContent="No Records Found!";
            h1.style.textAlign='center';
            document.getElementById("generated_content").appendChild(h1);
        }
    });

    if (matchFound) {
        console.log("Match Found!");
        displayDataForDate(File_Object, selectedDate);
    }
}

document.addEventListener('DOMContentLoaded', DisplayDate);