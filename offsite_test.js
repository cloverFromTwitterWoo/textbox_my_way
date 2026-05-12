async function getData(my_url) {
  //alert("function is running!!!")
  alert(my_url)
  try {
    const response = await fetch(my_url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = response.text();
    console.log(result)
    console.log(response.text())

  } catch (error) {
    console.error(error.message);
  }
}
alert("okay just do the thing already for fucks")
const char_name = document.getElementById("char_name");

function destroy_all()
{
  getData(char_name.value)
}


