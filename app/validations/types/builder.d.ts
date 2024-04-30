export interface Main {
  data: Data;
  message: string;
  status: boolean;
}

export interface Data {
  logo: string | null;
  companyName: string;
  builderAddress: string;
  mission: string;
  vision: string;
  ceoName: string;
  founderName: string;
  citiesName: string[];
  officecontact: string;
  companyStartDate: string;
  otherBuilder: OtherBuilder[];
  builderProjects: BuilderProject[];
  newProject: number;
  onGoingProject: number;
  completedProject: number;
  email: string;
  mobile: number;
  logoUrl: string | null;
}

export interface BuilderProject {
  projectName: string;
  projIdEnc: string;
  minPrice: number;
  maxPrice: number;
  startDate: string;
  endDate: string;
  localityName: string;
  cityName: string;
  pinCode: number;
  availableProperties: string[];
}

export interface OtherBuilder {
  name: string;
  logo: string;
}
