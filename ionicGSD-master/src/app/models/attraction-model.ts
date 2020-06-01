export class AttractionModel {
  constructor(
    public title: string,
    public image: string,
    public description: string,
    public longDescription: string,
    public rating: string,
    public userRating: number,
    public comments: string[],
    public time: string,
    public price: string,
    public openingHours: string
  ) {}

  setupAttractions(data: string, category: string) {
    const jsonData = JSON.parse(data);
    let attractions: AttractionModel[] = [];
    Object.keys(jsonData[category]).map((x, index) => {
      const attraction = jsonData[category];
      console.log(attraction[index].title);
      const attractionTitle: string = attraction[index].title;
      const attractionDescription: string = attraction[index].description;
      const attractionLongDescription: string =
        attraction[index].longDescription;
      const attractionImage: string = attraction[index].image;
      const attractionRating: string = attraction[index].rating;
      const attractionComments: string[] = attraction[index].comments;
      const attractionUserRating: number = attraction[index].userRating;
      const attractionTime: string = attraction[index].time;
      const attractionPrice: string = attraction[index].price;
      const attractionOpeningHours: string = attraction[index].openingHours;

      attractions.push(
        new AttractionModel(
          attractionTitle,
          attractionImage,
          attractionDescription,
          attractionLongDescription,
          attractionRating,
          attractionUserRating,
          attractionComments,
          attractionTime,
          attractionPrice,
          attractionOpeningHours
        )
      );
    });
    console.log(attractions);
    return attractions;
  }

  setupAttractionsSchedule(data: string, names: string[]) {
    const jsonData = JSON.parse(data);
    let attractions: AttractionModel[] = [];
    let categories: string[] = ["Sightseeing", "Food", "Museums", "Excitement"];
    for (let i = 0; i < categories.length; i++) {
      Object.keys(jsonData[categories[i]]).map((x, index) => {
        const attraction = jsonData[categories[i]];
        console.log(attraction[index].title);
        const attractionTitle: string = attraction[index].title;
        if (names.some(x => x === attractionTitle)) {
          const attractionDescription: string = attraction[index].description;
          const attractionLongDescription: string =
            attraction[index].longDescription;
          const attractionImage: string = attraction[index].image;
          const attractionRating: string = attraction[index].rating;
          const attractionComments: string[] = attraction[index].comments;
          const attractionUserRating: number = attraction[index].userRating;
          const attractionTime: string = attraction[index].time;
          const attractionPrice: string = attraction[index].price;
          const attractionOpeningHours: string = attraction[index].openingHours;
          attractions.push(
            new AttractionModel(
              attractionTitle,
              attractionImage,
              attractionDescription,
              attractionLongDescription,
              attractionRating,
              attractionUserRating,
              attractionComments,
              attractionTime,
              attractionPrice,
              attractionOpeningHours
            )
          );
        }
      });
    }
    console.log(attractions);
    return attractions;
  }
}
