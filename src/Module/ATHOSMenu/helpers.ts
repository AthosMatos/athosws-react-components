import { DefaultOptProps } from "./interfaces";

interface SubSubOptKeyed {
  [key: string]: DefaultOptProps;
}

interface SubOptionProps extends DefaultOptProps {
  subSubOpts?: SubSubOptKeyed;
}

interface SubOptKeyed {
  [key: string]: SubOptionProps;
}

interface OptionProps extends DefaultOptProps {
  subOpts?: SubOptKeyed;
}

export type OptKeyed = {
  [key: string]: OptionProps;
};
