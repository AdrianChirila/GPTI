import {Patient} from "../domain/patient";
export function parseResource(resourceType: string, resource: any) {
  return new Patient(resource);
}
