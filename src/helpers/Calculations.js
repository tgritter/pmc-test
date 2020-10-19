import { municipalities } from "./Municipalities.js";

// Constants
const gst = 0.05;
const pst = 0.07;
const titleInsurance = [50, 200];
const insuranceBinder = [30, 50];
const strataFees = [50, 100];
export const serviceCharge = 1.65;
export const numServiceCharge = 6;
export const titleSearchFee = 9.88;
export const numTitleSearchFee = 3;
export const lawyerBaseFee = 800;

// Calculations
export const calcTitleInsurance = () => {
  return titleInsurance;
};

export const calcServiceCharge = () => {
  return serviceCharge * numServiceCharge;
};

export const calcInsuranceBinder = () => {
  return insuranceBinder;
};

export const calcTitleSearchFee = () => {
  return titleSearchFee * numTitleSearchFee;
};

export const calcTaxCertificate = (municipality) => {
  const found = municipalities.find((city) => city.name === municipality);
  return typeof found === "undefined" ? 0 : found.fees;
};

export const calcStrataFees = (strata) => {
  if (!strata) {
    return [0, 0];
  }
  return strataFees;
};

export const calcGST = (purchasers, mortgage, strata) => {
  return (
    (calcServiceCharge() +
      lawyerBaseFee +
      calcComplexityUnit(purchasers, mortgage, strata)) *
    gst
  );
};

export const calcPST = () => {
  return 0 * pst;
};

export const calcPPT = (price) => {
  if (!price) {
    return 0;
  } else if (price < 200000) {
    return price * 0.01;
  } else if (price < 2000000) {
    return 2000 + (price - 200000) * 0.02;
  } else if (price < 3000000) {
    return 38000 + (price - 2000000) * 0.03;
  } else {
    return 68000 + (price - 3000000) * 0.05;
  }
};

export const calcComplexityUnit = (purchasers, mortgage, strata) => {
  var complexityUnits = 0;
  if (purchasers === "2") {
    complexityUnits += 50;
  }
  if (purchasers === "3") {
    complexityUnits += 100;
  }
  if (mortgage) {
    complexityUnits += 100;
  }
  if (strata) {
    complexityUnits += 100;
  }
  return complexityUnits;
};

export const calcTotal = (
  price,
  purchasers,
  municipality,
  mortgage,
  strata
) => {
  const range = [0, 0];

  range[0] += titleInsurance[0];
  range[1] += titleInsurance[1];

  range[0] += insuranceBinder[0];
  range[1] += insuranceBinder[1];

  range[0] += calcServiceCharge();
  range[1] += calcServiceCharge();

  range[0] += calcTitleSearchFee();
  range[1] += calcTitleSearchFee();

  range[0] += calcTaxCertificate(municipality);
  range[1] += calcTaxCertificate(municipality);

  range[0] += calcStrataFees(strata)[0];
  range[1] += calcStrataFees(strata)[1];

  range[0] += calcGST(purchasers, mortgage, strata);
  range[1] += calcGST(purchasers, mortgage, strata);

  range[0] += calcPST();
  range[1] += calcPST();

  range[0] += calcPPT(price);
  range[1] += calcPPT(price);

  range[0] += lawyerBaseFee;
  range[1] += lawyerBaseFee;

  range[0] += calcComplexityUnit(purchasers, mortgage, strata);
  range[1] += calcComplexityUnit(purchasers, mortgage, strata);

  return range;
};

// Formatter
export const rangeFormat = (range) => {
  return `${currencyFormat(range[0])} - ${currencyFormat(range[1])}`;
};

export const currencyFormat = (num) => {
  return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
