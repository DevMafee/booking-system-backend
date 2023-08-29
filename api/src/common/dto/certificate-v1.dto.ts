type Products = {
  productCategory: string;
  productDetails: string;
  materialComposition: string;
  labelGrade: string;
}

type Facilities = {
  facilityName: string;
  operationAddress: string;
  processingSteps: string;
  relationType: string;
}
type NonCertifiedSubcontractors = {
  facilityName: string;
  operationAddress: string;
  processingSteps: string;
}
type CertifiedSubcontractors = {
  licenseNumber: string;
  expiryDate: string;
  facilityName: string;
  operationAddress: string;
  processingSteps: string;
  relationType: string;
}
type StdLogo = {
  type: string,
  source: string
}
export class CertificateV1PdfDownloadDto{
  companyName: string;
  companyLicenseNumber: string;
  companyAddress: string;
  certificateNumber: string;
  productCategories: string[];
  processingSteps: string[];
  certificateValidDate: string;
  certificateVerifyUrl: string;
  stdLogos: StdLogo[];
  certificateStandardInfo:{
    title: string;
    version: string;
    logo: string;
    titleShortCode: string
  };
  authorizedPerson:{
    name: string;
    signature: string;
  };
  placeAndDateIssue: {
    place: string;
    date: string;
  }
  products: Products[];
  facilities: Facilities[];
  ioas?: string;
  nonCertifiedSubcontractors: NonCertifiedSubcontractors[];
  last_updated?: string;
  certifiedSubcontractors: CertifiedSubcontractors[];
  constructor(partial: Partial<CertificateV1PdfDownloadDto>) {
    Object.assign(this, partial)
  }
}
