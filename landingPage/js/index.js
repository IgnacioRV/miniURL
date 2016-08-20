function send(){
  var url = "https://minifyer.herokuapp.com/new/" + $("#input").val();
  console.log(url);
  location.href = url;
}