import { municipalities } from "./Municipalities.js";

// Constants
const hst = 1.12;
const legalBaseFee = 500;
const titleInsurance = [50, 200];
const insuranceBinder = [25, 75];
const strataFormsFee = [50, 100];
const specialitySoftwareFee = 84;
const postage = [15, 40];
const wireTransfer = [15, 30];
const landTitleFormA = 74.87;
const landTitleFormB = 74.87;
const landTitleSearchFees = 50;
const trustAdministrationFee = 15.75;
const stateOfTitleCertificate = 16.7;

// Calculations
export const calcPTT = (price) => {
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

export const calcLegalFees = (purchasers, mortgage, strata) => {
  return (
    (legalBaseFee + calcComplexityUnit(purchasers, mortgage, strata)) * hst
  );
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
    complexityUnits += 300;
  }
  if (strata) {
    complexityUnits += 100;
  }
  return complexityUnits;
};

export const calcTitleInsurance = () => {
  return titleInsurance;
};

export const calcInsuranceBinder = () => {
  return insuranceBinder;
};

export const calcStrataFormsFee = (strata) => {
  if (strata) {
    return strataFormsFee;
  }
  return [0, 0];
};

export const calcSpecialitySoftwareFee = () => {
  return specialitySoftwareFee;
};

export const calcPostage = () => {
  return postage;
};

export const calcWireTransfer = () => {
  return wireTransfer;
};

export const calcLandTitleFormA = () => {
  return landTitleFormA;
};

export const calcLandTitleFormB = (mortgage) => {
  if (mortgage) {
    return landTitleFormB;
  }
  return 0;
};

export const calcLandTitleSearchFees = () => {
  return landTitleSearchFees;
};

export const calcTaxCertificate = (municipality) => {
  const found = municipalities.find((city) => city.name === municipality);
  return typeof found === "undefined" ? 0 : found.fees;
};

export const calcTrustAdministrationFee = () => {
  return trustAdministrationFee;
};

export const calcStateOfTitleCertificate = () => {
  return stateOfTitleCertificate;
};

export const calcTotalClosingCosts = (
  purchasers,
  municipality,
  mortgage,
  strata
) => {
  const total = [0, 0];

  total[0] += calcLegalFees(purchasers, mortgage, strata);
  total[1] += calcLegalFees(purchasers, mortgage, strata);

  total[0] += calcTitleInsurance()[0];
  total[1] += calcTitleInsurance()[1];

  total[0] += calcInsuranceBinder()[0];
  total[1] += calcInsuranceBinder()[1];

  total[0] += calcStrataFormsFee(strata)[0];
  total[1] += calcStrataFormsFee(strata)[1];

  total[0] += calcSpecialitySoftwareFee();
  total[1] += calcSpecialitySoftwareFee();

  total[0] += calcPostage()[0];
  total[1] += calcPostage()[1];

  total[0] += calcWireTransfer()[0];
  total[1] += calcWireTransfer()[1];

  total[0] += calcLandTitleFormA();
  total[1] += calcLandTitleFormA();

  total[0] += calcLandTitleFormB();
  total[1] += calcLandTitleFormB();

  total[0] += calcLandTitleSearchFees();
  total[1] += calcLandTitleSearchFees();

  total[0] += calcTaxCertificate(municipality);
  total[1] += calcTaxCertificate(municipality);

  total[0] += calcTrustAdministrationFee();
  total[1] += calcTrustAdministrationFee();

  total[0] += calcStateOfTitleCertificate();
  total[1] += calcStateOfTitleCertificate();

  return total;
};

export const calcPriceOfConveyance = (
  price,
  purchasers,
  municipality,
  mortgage,
  strata
) => {
  const total = [0, 0];

  total[0] += price;
  total[1] += price;

  total[0] += calcPTT(price);
  total[1] += calcPTT(price);

  total[0] += calcTotalClosingCosts(purchasers, mortgage, strata)[0];
  total[1] += calcTotalClosingCosts(purchasers, mortgage, strata)[1];

  return total;
};

// Formatter
export const rangeFormat = (range) => {
  return `${currencyFormat(range[0])} - ${currencyFormat(range[1])}`;
};

export const currencyFormat = (num) => {
  return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
