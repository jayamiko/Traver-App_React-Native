import {ImageSourcePropType} from 'react-native';

export type CategoryProps = {
  category_id: number;
  category_name: string;
  icon_uri: ImageSourcePropType;
};

class Category {
  category_id: number;
  category_name: string;
  icon_uri: ImageSourcePropType;

  constructor(id: number, name: string, src: ImageSourcePropType) {
    this.category_id = id;
    this.category_name = name;
    this.icon_uri = src;
  }
}

const categories: any = [
  new Category(1, 'Beach', require('../assets/data/categories/beach.png')),
  new Category(
    2,
    'Mountain',
    require('../assets/data/categories/mountain.png'),
  ),
  new Category(3, 'Ocean', require('../assets/data/categories/ocean.png')),
  new Category(4, 'Camping', require('../assets/data/categories/camping.png')),
  new Category(5, 'Forest', require('../assets/data/categories/forest.png')),
  new Category(6, 'Fishing', require('../assets/data/categories/fishing.png')),
];

export default categories;
