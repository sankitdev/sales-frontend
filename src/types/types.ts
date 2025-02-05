/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FormValues {
  email: string;
  password?: string;
  fullName?: string;
  image?: string;
}

export type ProductData = {
  _id?: string;
  name: string;
  image: string;
  description: string;
  quantity: number;
  price: number;
};

export type ProductInputProps = {
  isOpen: boolean;
  onClose: () => void;
  product?: ProductData;
};

export type SalesData = {
  _id?: number;
  name: string;
  image: string;
  email?: string;
  phone: string;
  selectedProducts: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  totalPrice?: number;
};

export type SalesInputProps = {
  isOpen: boolean;
  onClose: () => void;
  sales?: SalesData | null;
};

export type ChartType = "bar" | "pie" | "line";

export interface ChartConfig {
  color?: {
    theme?: {
      light?: string;
      dark?: string;
    };
  };
  [key: string]: any;
}

export interface ChartProps {
  type: ChartType;
  data: {
    name: string;
    score: number;
    grade: string;
    performanceLevel: string;
  }[];
  config: ChartConfig;
}

export interface ProductName {
  id: string;
  name: string;
}
