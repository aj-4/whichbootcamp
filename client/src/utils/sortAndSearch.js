

export const sortByRating = (a,b) => {
    return +b.avgReviewStats.metaScore - +a.avgReviewStats.metaScore;
}

export const sortByWebDevCost = (a,b) => {
    const webDevA = a.Programs.filter(prog => prog.camel === 'webDevelopment');
    const webDevB = b.Programs.filter(prog => prog.camel === 'webDevelopment');
    if (!webDevA.length) return 1;
    if (!webDevB.length) return -1;
    return Number(webDevB.cost) - Number(webDevA.cost) 
  }

export const sortByReviewCount = (a,b) => {
    return +b.avgReviewStats.reviewCount - +a.avgReviewStats.reviewCount;
}