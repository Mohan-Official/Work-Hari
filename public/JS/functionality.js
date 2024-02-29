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
    // var file_value = get_file_value();
    const response = await fetch(file_address);
    //// It Checks whether Response status code is not in the range of 200-299
    if (!response.ok) 
    {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // document.getElementById('sprintName').innerHTML = 'IMPLAN - Sprint ' + data.SprintName;
    const container = document.getElementById("generated_content");

    let serialNoCounter = 0;
    data.Project_Details.forEach(project => 
    {
        serialNoCounter += 1;
        container.innerHTML += generateHTML(project, serialNoCounter);
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
    switch(clicked_option) {
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
                default:
                    alert('Unknown option selected!');
            }
}
function get_file_value(value)
{
    fetchDataAndDisplay(value);
}