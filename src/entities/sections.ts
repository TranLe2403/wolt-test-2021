type Section = {
  title: string;
  restaurants: Restaurant[];
};

export type Restaurant = {
  blurhash: string;
  launch_date: string;
  location: number[];
  name: string;
  online: boolean;
  popularity: number;
};

export default Section;
