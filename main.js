function pnorm(z) {
  return 0.5 * (1 + math.erf(z / math.sqrt(2)));
}

function qnorm(q) {
  const tol = 1e-5;

  let zmax = 20;
  let zmin = -20;

  let zmid = (zmin + zmax) / 2;
  let qmid = pnorm(zmid);

  while (math.abs(q - qmid) > tol) {
    if (qmid > q) {
      zmax = zmid;
    } else {
      zmin = zmid;
    }
    zmid = (zmax + zmin) / 2;
    qmid = pnorm(zmid);
  }

  return math.round(zmid, 3);
}

function zpower(delta, variance, zcritical, hypothesis) {

  const sign = {
    "!=": () => 1,
    ">": () => 1,
    "<": () => -1
  }; 

  const d = sign[hypothesis]() * delta/math.sqrt(variance);
  const lower = -d - math.abs(zcritical);
  const upper = zcritical - d;

  const power = {
    "!=": () => math.round(1 + pnorm(lower) - pnorm(upper), 3),
    ">": () => math.round(1 - pnorm(upper), 3),
    "<": () => math.round(pnorm(lower), 3)
  };

  return power[hypothesis]();
}