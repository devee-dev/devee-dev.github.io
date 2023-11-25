var SUPABASE_URL = "https://lnrgszljyaiztnraikly.supabase.co";
var SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxucmdzemxqeWFpenRucmFpa2x5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA5Mzc0OTAsImV4cCI6MjAxNjUxMzQ5MH0.0BENcIYUqy6ggPp142MJY_sLqC7rqp4OWpuOcVJ0Udk";

var supabase2 = supabase2.createClient(SUPABASE_URL, SUPABASE_KEY);
window.userToken = null;

document.addEventListener("DOMContentLoaded", function (event) {
  var logInForm = document.querySelector("#log-in");
  logInForm.onsubmit = logInSubmitted.bind(logInForm);

  var userDetailsButton = document.querySelector("#user-button");
  userDetailsButton.onclick = fetchUserDetails.bind(userDetailsButton);

  var logoutButton = document.querySelector("#logout-button");
  logoutButton.onclick = logoutSubmitted.bind(logoutButton);
});

const logInSubmitted = async (event) => {
  event.preventDefault();

  const { data, error } = await supabase2.auth.signInWithOAuth({
    provider: "figma",
  });
  if (error) {
    alert(error.message);
  } else {
    setToken(data);
  }
};

const fetchUserDetails = () => {
  alert(JSON.stringify(supabase2.auth.user()));
};

const logoutSubmitted = (event) => {
  event.preventDefault();

  supabase2.auth
    .signOut()
    .then((_response) => {
      document.querySelector("#access-token").value = "";
      document.querySelector("#refresh-token").value = "";
      alert("Logout successful");
    })
    .catch((err) => {
      alert(err.response.text);
    });
};

function setToken(response) {
  if (response.user.confirmation_sent_at && !response?.session?.access_token) {
    alert("Confirmation Email Sent");
  } else {
    document.querySelector("#access-token").value =
      response.session.access_token;
    document.querySelector("#refresh-token").value =
      response.session.refresh_token;
    alert("Logged in as " + response.user.email);
  }
}
