export type Boundary = {
  type: number;
  id: number;
  name: string;
  prefix: string;
  full_name: string;
};

export type GeocodeItemResponse = {
  ref_id: string;
  distance: number;
  address: string;
  name: string;
  display: string;
  boundaries: Boundary[];
  categories: any[]; // Adjust the type if you have a specific structure for categories
  entry_points: any[]; // Adjust the type if you have a specific structure for entry points
};

export interface GeocodeDataType {
  geocodes: GeocodeItemResponse[];
}
