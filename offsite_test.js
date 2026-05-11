async function getData(my_url) {
  alert("function is running!!!")
  alert(my_url)
  try {
    const response = await fetch(my_url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    alert(result);
    alert(result.body); //mayve?
  } catch (error) {
    console.error(error.message);
  }
}
alert("man i wish i could console log")
const char_name = document.getElementById("char_name");

function destroy_all()
{
alert(char_name.value)
  getData(char_name.value)
}


