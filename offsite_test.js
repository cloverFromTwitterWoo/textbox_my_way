async function getData(my_url) {
  //alert("function is running!!!")
  alert(my_url)
  try {
    const response = await fetch(my_url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = response.json();
    console.log(response)

  } catch (error) {
    console.error(error.message);
  }
}
alert("IS WORKS?")
const char_name = document.getElementById("char_name");

function destroy_all()
{
  getData(char_name.value)
}


