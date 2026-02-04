document.getElementById("submit").onclick = function () {
  const H1 = document.getElementById("H1").value
  const alpha = Number(document.getElementById("alpha").value)/100
  const delta = Number(document.getElementById("delta").value)

  const N1 = Number(document.getElementById("N1").value)
  const N2 = Number(document.getElementById("N2").value)
  const V1 = Number(document.getElementById("V1").value)
  const V2 = Number(document.getElementById("V2").value)
  const variance = V1/N1 + V2/N2

  const qtable = {
    "!=": () => 1 - alpha/2,
    ">": () => 1 - alpha,
    "<": () => alpha
  };

  
  const q = qtable[H1]();
  const zcritical = qnorm(q);
  const power = zpower(delta, variance, zcritical, H1);

  document.getElementById("output-threshold").innerText = "Rejection Threshold: " + zcritical;
  document.getElementById("output-power").innerText = "Statistical Power: " + power;
};