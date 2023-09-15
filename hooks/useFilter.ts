import { IServices } from "@/app/page";

export const useFilter = (
  selectedCategories: string,
  data: IServices[] | null
) => {
  if (selectedCategories != "All") {
    const filteredServices: IServices[] | null = data.filter(
      (ser) => ser.category === selectedCategories
    );
    return filteredServices;
  } else {
    return data;
  }
};
