function toggleDropdown() 
{
    var dropdown = document.querySelector('.dropdown');
    dropdown.classList.toggle('active');
}

function generateHTML(project, index) 
{
    const statusColor = project["Project Status"] === "Fail" ? "red" : "green";
    const title = project["Project Status"] === "Fail" ? "failedTitle" : "passedTitle";
    const indexID = index;

    return `
    <input type="radio" name="accordion" id="cb${indexID}" />
    <section class="box">
        <label class="box-title ${title}" for="cb${indexID}">
        <table style='width:100%; padding-top:15px; padding-bottom:15px;'>
            <tr>
            <th style='width:10%; color:${statusColor};'>${indexID}</th>
            <th style='width:50%; color:${statusColor};text-align:left;'>${project["Project Name"]}</th>
            <th style='width:20%; color:${statusColor};'>${project["Project Status"]}</th>
            <th style='width:20%; color:${statusColor};'>${new Date().toLocaleDateString()}</th>
            </tr>
        </table>
        </label>
        <label class="box-close" for="acc-close"></label>
        <div class="box-content">
        <table class='stepsTable'>
            <tbody>
            <tr>
                <a href="${project["ProjectSummaryLink"]}">Summary Page</a>
                <p>${project["Project Summary"].replace(/\n|\\n/g, '<br>')}</p>
            </tr>
            </tbody>
        </table>
        </div>
    </section>`;
}
        
// Function to fetch data from JSON file and display it
async function fetchDataAndDisplay(file_address) 
{
    try 
    {
    const response = await fetch(file_address);
    //// It Checks whether Response status code is not in the range of 200-299
    if (!response.ok) 
    {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const container = document.getElementById("generated_content");

    let serialNoCounter = 0;
    data["Entire Data"].forEach(item => {
        item.Project_Details.forEach(project => {
            serialNoCounter += 1;
            container.innerHTML += generateHTML(project, serialNoCounter);
        });
    });
    } 
    catch (error)
    {
    console.error('Error fetching data:', error);
    }
}

function call_function(option)
{
    var clicked_option = option.textContent;
    console.log(clicked_option);
    document.getElementById("dropdown-btn").textContent="Sprint "+clicked_option;
    switch(clicked_option) 
    {
        case '24.1.1':
            document.getElementById("generated_content").innerHTML='';
            get_file_value('JSON/consolidatedSummary_NON_MRIO_Projects_24.1.1.json');
        // alert('Option 1 selected!');
            break;
        case '24.1.2':
            document.getElementById("generated_content").innerHTML='';
            get_file_value('JSON/consolidatedSummary_NON_MRIO_Projects_24.1.2.json');
            break;
        case '24.1.3':
            document.getElementById("generated_content").innerHTML='';
            get_file_value('JSON/consolidatedSummary_NON_MRIO_Projects_24.1.3.json');
            break;
        case '24.1.4':
            document.getElementById("generated_content").innerHTML='';
            get_file_value('JSON/consolidatedSummary_NON_MRIO_Projects_24.1.4.json');
            break;
        default:
            alert('Unknown option selected!');
    }
}

var File_Object;
function get_file_value(value)
{
    File_Object = value;
    fetchDataAndDisplay(value);
}

function fetchData(projectType) {
    console.log(File_Object);
    var projectData = [
        {
            "Project_Details": [
                {
                    "Project Name": "Scenario 1_Sprint 5.15.1_19-Dec-19-2016 Copy 2",
                    "Project Summary": "Values Mis-Match in Direct - NIL, InDirect - Passing with 6 in few places, Induced - Passing with 6 in few places\nHere are the Failing events:\nEvent 1: Industry Output,\nEvent 2: Industry Employment",
                    "Project Status": "Fail",
                    "ProjectSummaryLink": "../../../output/Scenario_1_Sprint_5_15_1_19_Dec_19_2016_Copy_2/Event_report_20240221_125448/SummaryPage.html"
                },
                {
                  "Project Name": "Scenario 3_Sprint 5.15.4_17-Jan-20_2018",
                  "Project Summary": "Values Mis-Match in Direct - NIL, InDirect - Passing with 1 in most places, Induced - Passing with 4 in few places\\nHere are the Failing events:\\nEvent 2: Industry Employment,\\nEvent 3: Industry Employee Compensation,\\nEvent 4: Industry Proprietor Income,\\nEvent 7: Commodity Output,\\nEvent 8a: Industry Employment",
                  "Project Status": "Fail",
                  "ProjectSummaryLink": "../../../output/Scenario_3_Sprint_5_15_4_17_Jan_20_2018/Event_report_20240222_121153/SummaryPage.html"
                }
            ],
            "SprintName": "24.1.1",
            "ProjectType": "Non MRIO"
        },
        {
            "Project_Details": [
                {
                    "Project Name": "MRIO_Regression_Setup_2019",
                    "Project Summary": "Values are passing in Direct - 14 digit in all places; Indirect - 14 digit in all places; Induced - 14 digit in all places.",
                    "Project Status": "Pass",
                    "ProjectSummaryLink": "../../../output/MRIO_Regression_Setup_2019/Event_report_20240221_125448/SummaryPage.html"
                }
            ],
            "SprintName": "24.1.1",
            "ProjectType": "MRIO"
        }
    ];
    var filteredProjects = projectData.filter(function(project) {
        return project.ProjectType === projectType;
    });
 
    displayProjects(filteredProjects);
}

function displayProjects(projects) {
    var projectDetailsDiv = document.getElementById("generated_content");
    projectDetailsDiv.innerHTML = "";

    projects.forEach(function(sprint) {
        sprint.Project_Details.forEach(function(project, index) {
            const projectHTML = generateHTML(project, index);
            projectDetailsDiv.innerHTML += projectHTML;
        });
    });
}

function filter_MRIO(value)
{
    document.getElementById("generated_content").innerHTML='';
    console.log(`cliked ${value}`);
    fetchData(value);
}

function filter_NON_MRIO(value)
{
    console.log(`cliked ${value}`);
    fetchData(value);
}