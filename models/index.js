const Product = require('./Product'); //Imports models
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

Product.belongsTo(Category, { //Products belongsTo Category
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

Category.hasMany(Product, { //Categories have many Products
  foreignKey: "category_id",
});

Product.belongsToMany(Tag, { //Products belongToMany Tags (through ProductTag)
  through: ProductTag,
  foreignKey: "product_id",
});

Tag.belongsToMany(Product, { //Tags belongToMany Products (through ProductTag)
  through: ProductTag,
  foreignKey: "tag_id",
});

module.exports = { //Exporting models
  Product,
  Category,
  Tag,
  ProductTag,
};
