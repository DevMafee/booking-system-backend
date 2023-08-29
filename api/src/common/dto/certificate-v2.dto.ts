type Products = {
	productCategory: string;
	productDetails: string;
	materialComposition: string;
	labelGrade: string;
	facilityNumber: string;
}

type SiteAppendix = {
	facilityNameAndNumber: string;
	onlyFacilityNumber?: string;
	operationAddress: string;
	processCategories: string;
	standards: string;
	farmCapacity: string;
}
type AssociatedSubcontractorAppendix = {
	subcontractorNameAndFacilityNameNumber: string;
	facilityNumberForSubContractor?:string;
	operationAddress: string;
	processCategories: string;
	standards: string;
}
type IndependentlyCertifiedSubcontractorAppendix = {
	subcontractorNameNumberLicense: string;
	facilityNumberForSubContractor?: string;
	licenseNumber?: string;
	certificationBody: string;
	expiryDate: string;
	operationAddress: string;
	processCategories: string;
	standards: string;
}
type StdLogo = {
	width: number,
	source: string
}
type CertificateStandardInfo = {
	title: string;
	version: string;
	logo: string;
	titleShortCode: string
}
export class CertificateV2PdfDownloadDto{
	companyName: string;
	companyLicenseNumber: string;
	companyAddresses: string[];
	certificateNumber: string;
	productCategories: string[];
	processingSteps: string[];
	certificateValidDate: string;
	auditCriteria: string;
	inspectionBody: string;
	auditors: string;
	footerStandard: string;
	certificateVerifyUrl: string;
	stdLogos: StdLogo[];
	certificateStandardsInfo: CertificateStandardInfo[];
	authorizedPerson:{
		name: string;
		signature: string;
	};
	placeAndDateIssue: {
		place: string;
		date: string;
	}
	products: Products[];
	siteAppendix: SiteAppendix[];
	associatedSubcontractorAppendix: AssociatedSubcontractorAppendix[];
	independentlyCertifiedSubcontractorAppendix: IndependentlyCertifiedSubcontractorAppendix[];
	last_updated?: string;
	constructor(partial: Partial<CertificateV2PdfDownloadDto>) {
		Object.assign(this, partial)
	}
}
