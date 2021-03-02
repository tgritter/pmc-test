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
export const calcPTT = (price, firstTimeBuyer) => {
  if (firstTimeBuyer){
    if (price <= 500000){
      return 0
    }
    if (price <= 501000){
      return 320.80
    }
    if (price <= 502000){
      return 643.20
    }
    if (price <= 503000){
      return 967.20
    }
    if (price <= 504000){
      return 1292.80
    }
    if (price <= 505000){
      return 1620.00
    }
    if (price <= 506000){
      return 1948.80
    }
    if (price <= 507000){
      return 2279.20
    }
    if (price <= 508000){
      return 2611.20
    }
    if (price <= 509000){
      return 2944.80
    }
    if (price <= 510000){
      return 3280.00
    }
    if (price <= 511000){
      return 3616.80
    }
    if (price <= 512000){
      return 3955.20
    }
    if (price <= 513000){
      return 4295.20
    }
    if (price <= 514000){
      return 4636.80
    }
    if (price <= 515000){
      return 4980.00
    }
    if (price <= 516000){
      return 5324.80
    }
    if (price <= 517000){
      return 5671.20
    }
    if (price <= 518000){
      return 6019.20
    }
    if (price <= 519000){
      return 6368.80
    }
    if (price <= 520000){
      return 6720.00
    }
    if (price <=521000){
      return 7072.80
    }
    if (price <= 522000){
      return 7427.20
    }
    if (price <= 523000){
      return 7783.20
    }
    if (price <= 524000){
      return 8140.80
    }
    if (price <= 525000){
      return 8500
    }
  }

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

export const calcLegalFees = (price, purchasers, mortgage, strata) => {
  return (
    (legalBaseFee + calcComplexityUnit(price, purchasers, mortgage, strata)) * hst
  );
};

export const calcComplexityUnit = (price, purchasers, mortgage, strata) => {
  var complexityUnits = 0;
  if (purchasers === "3+") {
    complexityUnits += 100;
  }
  if (mortgage) {
    complexityUnits += 150;
  }
  if (strata) {
    complexityUnits += 50;
  }
  price = price - 1000000
  if (price > 0){
    complexityUnits += 50 + Math.round(price/2000)
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
  price,
  purchasers,
  municipality,
  mortgage,
  strata
) => {
  const total = [0, 0];

  total[0] += calcLegalFees(price, purchasers, mortgage, strata);
  total[1] += calcLegalFees(price, purchasers, mortgage, strata);

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
  strata,
  firstTimeBuyer,
) => {
  const total = [0, 0];

  total[0] += price;
  total[1] += price;

  total[0] += calcPTT(price, firstTimeBuyer);
  total[1] += calcPTT(price, firstTimeBuyer);

  total[0] += calcTotalClosingCosts(price, purchasers, municipality, mortgage, strata)[0];
  total[1] += calcTotalClosingCosts(price, purchasers, municipality, mortgage, strata)[1];

  return total;
};

// Formatter
export const rangeFormat = (range) => {
  return `${currencyFormat(range[0])} - ${currencyFormat(range[1])}`;
};

export const currencyFormat = (num) => {
  return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
