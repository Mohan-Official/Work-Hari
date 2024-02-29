function toggleDropdown() {
    var dropdown = document.querySelector('.dropdown');
    dropdown.classList.toggle('active');
}
function call_function(option)
{
    var clicked_option = option.textContent;
    console.log(clicked_option);
    document.getElementById("dropdown-btn").textContent="Sprint "+clicked_option;
    switch(clicked_option) {
                case '24.1.1':
                    document.getElementById("generated_content").innerHTML='';
                    get_file_value('consolidatedSummary_NON_MRIO_Projects_24.1.1.json');
                // alert('Option 1 selected!');
                    break;
                case '24.1.2':
                    document.getElementById("generated_content").innerHTML='';
                    get_file_value('consolidatedSummary_NON_MRIO_Projects_24.1.2.json');
                    break;
                case '24.1.3':
                    document.getElementById("generated_content").innerHTML='';
                    get_file_value('consolidatedSummary_NON_MRIO_Projects_24.1.3.json');
                    break;
                default:
                    alert('Unknown option selected!');
            }
}
function get_file_value(value)
{
    fetchDataAndDisplay(value);
}