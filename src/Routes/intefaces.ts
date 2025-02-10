export interface GenPathProps {
  path: string;
  component: any;
  label: string;
  icon: any;
}
export interface GenSubSubPathProps extends GenPathProps {}

type SubSubOptsType = {
  [key: string]: GenPathProps;
};

export interface GenSubPathProps extends GenPathProps {
  subSubOpts?: SubSubOptsType;
}

type SubOptsType = {
  [key: string]: GenSubPathProps;
};

export interface GenOptPathProps extends GenPathProps {
  subOpts?: SubOptsType;
}
