// services/salesServices.ts
import api from "@/lib/api";

export interface CreateSalePayload {
  full_name: string;
  platform: string;
  username: string;
  phone_number: string;
  status: string;
  assistant_name: string;
  notes: string;
}

export interface UpdateSalePayload extends Partial<CreateSalePayload> {}

export const addSale = async (payload: CreateSalePayload) => {
  const res = await api.post("/ceo/sales", payload);
  return res.data;
};

export const updateSale = async (id: number | string, payload: UpdateSalePayload) => {
  const res = await api.put(`/ceo/sales/${id}`, payload);
  return res.data;
};

export const deleteSale = async (id: number | string) => {
  const res = await api.delete(`/ceo/sales/${id}`);
  return res.data;
};
