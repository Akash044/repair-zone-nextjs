import { IServices } from "@/app/page";

export const useFilter = (selectedCategories: string, data: IServices[]) => {
  if (selectedCategories != "All") {
    const filteredServices: IServices[] = data.filter(
      (ser) => ser.category === selectedCategories
    );
    return filteredServices;
  } else {
    return data;
  }
};
