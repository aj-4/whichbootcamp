

export const sortByRating = (a,b) => {
    if (!a.ranking) {
        // on page load, will assign rankings
        return +a.avgReviewStats.metaScore < +b.avgReviewStats.metaScore;
    } else {
        // on subsequent sorts, will retain ranking order for metaScore ties
        return a.ranking > b.ranking;
    }
}

export const sortByWebDevCost = (a,b) => {
    const webDevA = a.Programs[0];
    const webDevB = b.Programs[0];
    return Number(webDevB.cost) > Number(webDevA.cost) 
  }

export const sortByReviewCount = (a,b) => {
    return +b.avgReviewStats.reviewCount > +a.avgReviewStats.reviewCount;
}