alert("ill do this properly later")


async function getData(my_url) {
  alert("function is running!!!")
  try {
    const response = await fetch(my_url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.text();
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
  getData(char_name.value)
}


