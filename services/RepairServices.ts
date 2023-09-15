import { IServices } from "@/app/page";
import requestServices from "./httpServices";

class RepairServices {
  getServices(): Promise<IServices[]> {
    return requestServices.get("/allServices");
  }
  postServices(body: object) {
    return requestServices.post("/addService", body);
  }
  updateServices(id: string, body: object) {
    return requestServices.update(`/updateServiceInfo/${id}`, body);
  }
  deleteServices(id: string) {
    return requestServices.delete(`/deleteService/${id}`);
  }
}

export default new RepairServices();
