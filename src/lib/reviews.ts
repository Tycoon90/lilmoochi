/**
 * Review / AggregateRating schema — BUILT BUT DELIBERATELY NOT WIRED UP.
 *
 * The previous site claimed "+289 Happy Clients" and "5 Star Reviews" with
 * nothing behind them. Marking up unverifiable reviews as structured data is
 * a Google manual-action risk, so nothing here is called from any page.
 *
 * TO ENABLE: the client must supply real reviews with the reviewer's
 * permission — name, date, rating and text, ideally exportable from Google
 * Business Profile. Populate `reviews` below, then add
 * `...reviewSchema(reviews)` to the graph on the home page only.
 */
export type Review = {
  author: string;
  rating: number;
  datePublished: string; // ISO 8601
  body: string;
};

/** Intentionally empty. Do not fill with examples or placeholders. */
export const reviews: Review[] = [];

export function reviewSchema(list: Review[], businessId: string) {
  if (list.length === 0) return [];
  const total = list.reduce((sum, r) => sum + r.rating, 0);
  return [
    {
      '@id': businessId,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: (total / list.length).toFixed(1),
        reviewCount: list.length,
      },
      review: list.map((r) => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: r.author },
        datePublished: r.datePublished,
        reviewBody: r.body,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: r.rating,
          bestRating: 5,
        },
      })),
    },
  ];
}
