export class CategoryModel {
  constructor(
    public title: string,
    public description: string,
    public image: string
  ) {}

  setupCategories(data: string) {
    const jsonData = JSON.parse(data);
    let categories: CategoryModel[] = [];
    Object.keys(jsonData).map(title => {
      const categoryTitle: string = jsonData[title].title;
      const categoryDescription: string = jsonData[title].description;
      const categoryImage: string = jsonData[title].image;
      categories.push(
        new CategoryModel(categoryTitle, categoryDescription, categoryImage)
      );
    });
    return categories;
  }
}
