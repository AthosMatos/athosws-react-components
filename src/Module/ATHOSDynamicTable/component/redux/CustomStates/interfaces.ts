export type IcolumnsShort<T> = {
  [key in keyof T]: boolean;
};

export interface CustomStatesState {
  totalItems: number;
  columnsShort?: IcolumnsShort<any>;
}
