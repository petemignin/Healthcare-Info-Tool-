document.addEventListener("DOMContentLoaded", function() {
    const affordExempt = document.getElementById("affordExempt");
    affordExempt.addEventListener("click", handleAffordExempt);
  
    function handleAffordExempt() {
      fetch("https://www.healthcare.gov/glossary/affordability-exemption.json")
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          console.log(response);
        })
    }
  });
  